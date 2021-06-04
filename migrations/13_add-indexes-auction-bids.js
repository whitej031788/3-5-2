const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => {
    return Promise.all([
      db.query(`
        CREATE INDEX user_league_players_expires_at
          ON user_league_players(expires_at);
      `),
      db.query(`
        CREATE INDEX user_league_players_is_over
          ON user_league_players(is_over);
      `),
    ]);
  },
  down: () => console.log('need to add drop here')
};