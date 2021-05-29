const https = require('https');
const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
})

async function query(q, values) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    console.log(e)
    throw Error(e.message)
  }
}

async function init() {
  // EC is the European Championship ID
  var leagueId = "EC";
  var options = {
    host: 'api.football-data.org',
    port: 443,
    path: '/v2/competitions/' + leagueId + '/teams',
    method: 'GET',
    headers: { 'X-Auth-Token': '222dfc200d42443cbce5ca5e32704a82' }
  };

  // First, get the current season and the current matchDay
  var req = https.request(options, function(res) {
    let response = "";

    res.on('data', function(chunk) {
      response += chunk;
    });

    res.on('end', function() {
      let myEnd = JSON.parse(response);
      var compId = myEnd.competition.id;

      upsertCompetitionData([
        myEnd.competition.id,
        myEnd.competition.name,
        myEnd.competition.code,
        myEnd.season.startDate,
        myEnd.season.endDate,
        myEnd.season.currentMatchday,
      ]).then((res) => {
        var arrLength = myEnd.teams.length - 1;
        myEnd.teams.forEach((team, index) => {
          setTimeout(() => {
            console.log("Fetching team: " + team.name)
            options.path = '/v2/teams/' + team.id;
            createRequest(options).then((response) => {
              let myEnd = JSON.parse(response.data);
              upsertTeamAndPlayerData(
                [myEnd.id, compId, myEnd.name, myEnd.crestUrl],
                parsePlayerData(myEnd.squad),
                parsePlayerTeamData(myEnd.squad, myEnd.id)
              ).then((res) => {
                if (index == arrLength) {db.quit()};
              })
            });
          }, index * 6200);
        });
      });
      console.log('end received!')
    });
  });

  req.end();
}

init();

function createRequest(requestOptions) {
  return new Promise((resolve, reject) => {
    const result = {};
   // *** http.request function is a Callback ***
    const request = https.request(requestOptions, response => {
      let rawData = '';
      response.on('data', chunk => rawData += chunk);
      // resolve the promise when response ends
      response.on('end', () => {
        result.status = response.status || 200;
        result.data = rawData;
        resolve(result);
      });
    });
    // or reject on error
    request.on('error', e => {
      result.status = 500;
      result.data = {
        message: 'ERROR: API response',
        exception: e
      };
      reject(result);
    });
    request.end();
  });
};

async function upsertCompetitionData(data) {
  const results = await query(
    `
    INSERT INTO competitions (id, name, code, start_date, end_date, current_match_day) 
    VALUES (?)
    ON DUPLICATE KEY UPDATE name=VALUES(name), code=VALUES(code), start_date=VALUES(start_date), end_date=VALUES(end_date), current_match_day=VALUES(current_match_day) 
    `,
    [data]
  );

  return results;
}

async function upsertTeamAndPlayerData(teamData, playerData, playerTeamData) {
  let results = await query(
    `
    INSERT INTO teams (id, competition_id, name, crest_url) 
    VALUES (?)
    ON DUPLICATE KEY UPDATE competition_id=VALUES(competition_id), name=VALUES(name), crest_url=VALUES(crest_url)
    `,
    [teamData]
  );

  results = await query(
    `
    INSERT INTO players (id, name, position) 
    VALUES ?
    ON DUPLICATE KEY UPDATE name=VALUES(name), position=VALUES(position)
    `,
    [playerData]
  );

  results = await query(
    `
    INSERT IGNORE INTO player_teams (team_id, player_id) 
    VALUES ?
    `,
    [playerTeamData]
  );

  return results;
}

function parsePlayerTeamData(squad, teamId) {
  let retArr = [];
  squad.forEach((player) => {
    if (player.role == "PLAYER")
      retArr.push([teamId, player.id]);
  })
  return retArr;
}


function parsePlayerData(squad) {
  let retArr = [];
  squad.forEach((player) => {
    if (player.role == "PLAYER")
      retArr.push([player.id, player.name, player.position]);
  })
  return retArr;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}