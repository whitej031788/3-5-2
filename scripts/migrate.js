const fs = require('fs')
const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')
require('dotenv').config({ path: envPath })
const db = require(path.resolve(process.cwd(), 'scripts/db.js'))

async function run() {
  const Umzug = require('umzug');
  const migrationStorePath = '/tmp/migrations.json';
  const umzug = new Umzug({
    storage: 'json',
    storageOptions: {
      path: migrationStorePath
    },
    migrations: {
      path: 'migrations'
    }
  });

  const migrationTableQuery = `
    CREATE TABLE IF NOT EXISTS migration 
    (
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, 
      name VARCHAR(255) NOT NULL
    );
  `;

  await db.query(migrationTableQuery);

  const migrations = await db.query('SELECT * FROM migration ORDER BY createdAt');

  // transform migrations into an umzug accepted format
  const umzugMigrations = migrations.map(migration => migration.name);
  // write into umzug migration store
  fs.writeFileSync(migrationStorePath, JSON.stringify(umzugMigrations), { flag: 'w' });

  // When a migration file is executed, add it to our migration table
  function addMigration() {
    return async (name) => {
      console.log(`${name} migrated`);
      try {
        await db.query(`INSERT INTO migration (name) VALUES("${name}.js")`);
        console.log(`${name} inserted into migration table`);
      } catch (error) {
        console.error(`${name} could not be inserted to migration table`);
      }
      await db.end();
    };
  }

  // When umzug finished to execute a migration file, call addMigration
  umzug.on('migrated', addMigration());

  return umzug.up()
}

run()
  .then((result) => {
    console.log(`Migration completed: ${JSON.stringify(result)}`);
  })
  .catch(error => {throw error})
  .finally(() => process.exit(1))