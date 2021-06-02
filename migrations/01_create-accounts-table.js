const path = require('path')
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

module.exports = {
  up: () => db.query(`
    CREATE TABLE IF NOT EXISTS accounts
    (
      id                   INT NOT NULL AUTO_INCREMENT,
      compound_id          VARCHAR(255) NOT NULL,
      user_id              INTEGER NOT NULL,
      provider_type        VARCHAR(255) NOT NULL,
      provider_id          VARCHAR(255) NOT NULL,
      provider_account_id  VARCHAR(255) NOT NULL,
      refresh_token        TEXT,
      access_token         TEXT,
      access_token_expires TIMESTAMP(6),
      created_at           TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at           TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id)
    );
  `),
  down: () => db.query(`DROP TABLE accounts`)
};