const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS competitions
    (
      id         INT NOT NULL,
      name       VARCHAR(255) NOT NULL,
      code       VARCHAR(255) NOT NULL,
      start_date TIMESTAMP(6) NOT NULL,
      end_date TIMESTAMP(6) NOT NULL,
      current_match_day INT NOT NULL,
      created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    );
  `),
  down: () => db.query(`DROP TABLE competitions`)
};