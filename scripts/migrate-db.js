const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await createDatabaseScheme();
    console.log('migration ran successfully')
  } catch (e) {
    console.log(e)
    console.error('could not run migration, double check your credentials.')
    process.exit(1)
  }
}

async function createDatabaseScheme() {
  try {
    await query(`
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
    `);

    await query(`
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
    `);

    await query(`
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
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS verification_requests
      (
        id         INT NOT NULL AUTO_INCREMENT,
        identifier VARCHAR(255) NOT NULL,
        token      VARCHAR(255) NOT NULL,
        expires    TIMESTAMP(6) NOT NULL,
        created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      );
    `);

    await query(`
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
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS teams
      (
        id              INT NOT NULL,
        competition_id   INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        crest_url  VARCHAR(255) NOT NULL,
        created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS players
      (
        id              INT NOT NULL,
        name       VARCHAR(255) NOT NULL,
        position  VARCHAR(255) NOT NULL,
        created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id)
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS player_teams
      (
        player_id   INT NOT NULL,
        team_id       INT NOT NULL,
        created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (player_id, team_id)
      );
    `);

    await query(`
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
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS user_leagues
      (
        user_id   INT NOT NULL,
        league_id   INT NOT NULL,
        created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (user_id, league_id)
      );
    `);

    await query(`
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
    `);

    await query(`
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
    `);

    await query(`
      CREATE UNIQUE INDEX compound_id
        ON accounts(compound_id);
    `);

    await query(`
      CREATE INDEX provider_account_id
        ON accounts(provider_account_id);
  `);

    await query(`
      CREATE INDEX provider_id
        ON accounts(provider_id);
    `);

    await query(`
      CREATE INDEX user_id
        ON accounts(user_id);
    `);

    await query(`
      CREATE UNIQUE INDEX session_token
        ON sessions(session_token);
    `);

    await query(`
      CREATE UNIQUE INDEX email
        ON users(email);
    `);

    await query(`
      CREATE UNIQUE INDEX token
        ON verification_requests(token);
    `);

    await query(`
      CREATE INDEX position
        ON players(position);
    `);

    await query(`ALTER TABLE teams ADD CONSTRAINT fk_competition_id FOREIGN KEY (competition_id) REFERENCES competitions(id);`);
    await query(`ALTER TABLE player_teams ADD CONSTRAINT fk_player_id FOREIGN KEY (player_id) REFERENCES players(id);`);
    await query(`ALTER TABLE player_teams ADD CONSTRAINT fk_team_id FOREIGN KEY (team_id) REFERENCES teams(id);`);

    await query(`ALTER TABLE leagues ADD CONSTRAINT fk_leagues_competition_id FOREIGN KEY (competition_id) REFERENCES competitions(id);`);
    await query(`ALTER TABLE leagues ADD CONSTRAINT fk_leagues_user_id FOREIGN KEY (user_id) REFERENCES users(id);`);
    await query(`ALTER TABLE user_leagues ADD CONSTRAINT fk_league_id FOREIGN KEY (league_id) REFERENCES leagues(id);`);
    await query(`ALTER TABLE user_leagues ADD CONSTRAINT fk_user_leagues_user_id FOREIGN KEY (user_id) REFERENCES users(id);`);

    await query(`ALTER TABLE league_bids ADD CONSTRAINT fk_league_bids_league_id FOREIGN KEY (league_id) REFERENCES leagues(id);`);
    await query(`ALTER TABLE league_bids ADD CONSTRAINT fk_league_bids_user_id FOREIGN KEY (user_id) REFERENCES users(id);`);
    await query(`ALTER TABLE league_bids ADD CONSTRAINT fk_league_bids_player_id FOREIGN KEY (player_id) REFERENCES players(id);`);

    await query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_league_id FOREIGN KEY (league_id) REFERENCES leagues(id);`);
    await query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_user_id FOREIGN KEY (user_id) REFERENCES users(id);`);
    await query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_player_id FOREIGN KEY (player_id) REFERENCES players(id);`);
    await query(`ALTER TABLE user_league_players ADD CONSTRAINT fk_user_league_players_league_bid_id FOREIGN KEY (league_bid_id) REFERENCES league_bids(id);`);

  } catch (e) {
    console.log(e)
    console.error('could not run authentication migration, double check your credentials.')
    process.exit(1)
  }
}

migrate().then(() => process.exit())
