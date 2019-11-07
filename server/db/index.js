/* eslint-disable no-console */
/**
 * ************************************
 *
 * @module  server.js
 * @author Benjamin Morrison/Timothy Mai
 * @date 11/5/19
 * @description creates pool instance that connects to PostGreSQL database
 *
 * ************************************
 */

const { Pool } = require('pg');

// create a config to configure both pooling behavior and client options
// note: values here should be derived from environment variables
//       in a production environment

const config = {
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

if (process.env.NODE_ENV === 'development') {
  config.user = 'panwhale';
  config.database = 'relief';
  config.password = 'ilovetesting';
  config.host = 'postgres-db';
  config.port = 5432;
} else if (process.env.NODE_ENV === 'production') {
  config.user = process.env.RDS_USERNAME;
  config.database = process.env.RDS_DB_NAME;
  config.password = process.env.RDS_PASSWORD;
  config.host = process.env.RDS_HOSTNAME;
  config.port = process.env.RDS_PORT;
}

console.log(`Connecting to database ${config.database} on host ${config.host}`);

const connectionString = process.env.NODE_ENV ? 'postgres://thdlprys:yXB-PdWjfDPjw4EEKMfEy12ZaprlvcMp@salt.db.elephantsql.com:5432/thdlprys' : '';

const externalDB = new Pool({
  connectionString,
});

const pool = new Pool(config);

// if an error is encountered by a client while it sits idle in the pool
// the pool itself will emit an error event with both the error and
// the client which emitted the original error
// this is a rare occurrence but can happen if there is a network partition
// between your application and the database, the database restarts, etc.
// and so you might want to handle it and at least log it out
pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

pool.on('connect', (err, client) => {
  if (err) console.error(err);
  console.log('connected to db');
});

// export the query method for passing queries to the pool
module.exports.query = (text, values) => externalDB.query(text, values);

// the pool also supports checking out a client for
// multiple operations, such as a transaction
module.exports.connect = (callback) => externalDB.connect(callback);

// database has three tables:
// user (columns: username, password, id, email)
// charity (columns: a bunch of stuff)
// donation (columns: id, user_id, charity_id)
module.exports.pool = externalDB;
