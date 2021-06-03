const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => {
    return Promise.all([
      db.query(`
        CREATE UNIQUE INDEX compound_id
          ON accounts(compound_id);
      `),
      db.query(`
        CREATE INDEX provider_account_id
          ON accounts(provider_account_id);
      `),
      db.query(`
        CREATE INDEX provider_id
          ON accounts(provider_id);
      `),
      db.query(`
        CREATE INDEX user_id
          ON accounts(user_id);
      `),
      db.query(`
        CREATE UNIQUE INDEX session_token
          ON sessions(session_token);
      `),
      db.query(`
        CREATE UNIQUE INDEX email
          ON users(email);
      `),
      db.query(`
        CREATE UNIQUE INDEX token
          ON verification_requests(token);
      `),
      db.query(`
        CREATE INDEX position
          ON players(position);
      `),
      db.query(`ALTER TABLE teams ADD CONSTRAINT fk_competition_id FOREIGN KEY (competition_id) REFERENCES competitions(id);`),
      db.query(`ALTER TABLE player_teams ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES players(id);`),
      db.query(`ALTER TABLE player_teams ADD CONSTRAINT fk_team_id FOREIGN KEY (team_id) REFERENCES teams(id);`),
      db.query(`ALTER TABLE leagues ADD CONSTRAINT fk_leagues_competition_id FOREIGN KEY (competition_id) REFERENCES competitions(id);`),
      db.query(`ALTER TABLE leagues ADD CONSTRAINT fk_leagues_user_id FOREIGN KEY (user_id) REFERENCES users(id);`),
      db.query(`ALTER TABLE user_leagues ADD CONSTRAINT fk_league_id FOREIGN KEY (league_id) REFERENCES leagues(id);`),
      db.query(`ALTER TABLE user_leagues ADD CONSTRAINT fk_user_leagues_user_id FOREIGN KEY (user_id) REFERENCES users(id);`),
      db.query(`ALTER TABLE league_bids ADD CONSTRAINT fk_league_bids_league_id FOREIGN KEY (league_id) REFERENCES leagues(id);`),
      db.query(`ALTER TABLE league_bids ADD CONSTRAINT fk_league_bids_user_id FOREIGN KEY (user_id) REFERENCES users(id);`),
      db.query(`ALTER TABLE league_bids ADD CONSTRAINT fk_league_bids_player_id FOREIGN KEY (player_id) REFERENCES players(id);`),
      db.query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_league_id FOREIGN KEY (league_id) REFERENCES leagues(id);`),
      db.query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_user_id FOREIGN KEY (user_id) REFERENCES users(id);`),
      db.query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_player_id FOREIGN KEY (player_id) REFERENCES players(id);`),
      db.query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_league_bid_id FOREIGN KEY (league_bid_id) REFERENCES league_bids(id);`)
    ]);
  },
  down: () => console.log('need to add drop here')
};