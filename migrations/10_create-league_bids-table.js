const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS league_bids
    (
      id              INT NOT NULL AUTO_INCREMENT,
      user_id   INT NOT NULL,
      league_id   INT NOT NULL,
      player_id   INT NOT NULL,
      bid_amount DECIMAL(15,2) NOT NULL,
      is_success BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    );
  `),
  down: () => db.query(`DROP TABLE league_bids`)
};