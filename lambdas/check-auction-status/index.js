const mysql = require('serverless-mysql');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const ssm = new AWS.SSM();

const getSecrets = async (secretNames) => {
  const params = {
    Names: secretNames, 
    WithDecryption: true
  };

  const results = await ssm.getParameters(params).promise();
  return results;
};

async function query(db, q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

function mapSsmResultFromArray(ssmName, array) {
  let ssmObj =  array.find(x => x.Name === ssmName);
  return ssmObj.Value;
}

function createDatabaseConfig(secrets) {
  let config = {
    host: mapSsmResultFromArray(process.env.MYSQL_HOST_SSM, secrets),
    database: mapSsmResultFromArray(process.env.MYSQL_DATABASE_SSM, secrets),
    user: mapSsmResultFromArray(process.env.MYSQL_USERNAME_SSM, secrets),
    password: mapSsmResultFromArray(process.env.MYSQL_PASSWORD_SSM, secrets),
    port: mapSsmResultFromArray(process.env.MYSQL_PORT_SSM, secrets),
  };

  return config;
}

exports.handler = async function(event, context) {
  try {
    const secrets = await getSecrets([
      process.env.MYSQL_HOST_SSM,
      process.env.MYSQL_USERNAME_SSM,
      process.env.MYSQL_PASSWORD_SSM,
      process.env.MYSQL_PORT_SSM,
      process.env.MYSQL_DATABASE_SSM,
    ]);
    
    const db = mysql({
      config: createDatabaseConfig(secrets.Parameters)
    });
    
    const updateCompletedAuctions = await query(db, `
      UPDATE user_league_players SET is_over = 1 WHERE is_over = 0 AND expires_at <= NOW();
    `);
    
    return updateCompletedAuctions;
  } catch (err) {
    console.log(err);
    return err;
  }
};