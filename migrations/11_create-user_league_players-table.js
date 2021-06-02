const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS user_league_players
    (
      league_id   INT NOT NULL,
      player_id   INT NOT NULL,
      user_id   INT NOT NULL,
      league_bid_id   INT NOT NULL,
      current_winning_bid DECIMAL(15,2) NOT NULL,
      winning_bid_amount DECIMAL(15,2) NOT NULL,
      is_over BOOLEAN NOT NULL DEFAULT 0,
      expires_at TIMESTAMP(6) NOT NULL,
      created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (league_id, player_id)
    );
  `),
  down: () => db.query(`DROP TABLE user_league_players`)
};