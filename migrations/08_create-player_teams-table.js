const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS player_teams
    (
      player_id   INT NOT NULL,
      team_id       INT NOT NULL,
      created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (player_id, team_id)
    );
  `),
  down: () => db.query(`DROP TABLE player_teams`)
};