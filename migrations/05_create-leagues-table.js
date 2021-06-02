const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS leagues
    (
      id              INT NOT NULL AUTO_INCREMENT,
      user_id   INT NOT NULL,
      competition_id   INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      start_date TIMESTAMP(6) NOT NULL,
      join_code VARCHAR(255) NOT NULL,
      max_players INT,
      join_fee DECIMAL(15,2),
      created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    );
  `),
  down: () => db.query(`DROP TABLE leagues`)
};