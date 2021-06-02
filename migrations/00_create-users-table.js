const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS users
    (
      id             INT NOT NULL AUTO_INCREMENT,
      name           VARCHAR(255),
      email          VARCHAR(255),
      email_verified TIMESTAMP(6),
      image          VARCHAR(255),
      created_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at     TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    );
  `),
  down: () => db.query(`DROP TABLE users`)
};