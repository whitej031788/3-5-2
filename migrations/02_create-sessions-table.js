const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS sessions
    (
      id            INT NOT NULL AUTO_INCREMENT,
      user_id       INTEGER NOT NULL,
      expires       TIMESTAMP(6) NOT NULL,
      session_token VARCHAR(255) NOT NULL,
      access_token  VARCHAR(255) NOT NULL,
      created_at    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at    TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    );
  `),
  down: () => db.query(`DROP TABLE sessions`)
};