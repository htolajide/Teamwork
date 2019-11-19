// get node postgres connector
import pg from 'pg';
import debug from 'debug';
import configuration from '../config/config'

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

//const config = configuration[env];

console.log('this is the environment: ', env );

if (env === 'production') {
  const { Pool, Client } = require('pg')
  const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
  const pool = new Pool({connectionString: process.env.DATABASE_URL,});
  module.exports = pool;
} else if (env === 'test') {
  const pool = pg.Pool(configuration.test);
  pool.on('connect', () => {
    debug('app:database')('connected to the Database');
  });
  module.exports = pool;
} else {
  const pool = pg.Pool(configuration.development);
  pool.on('connect', () => {
    debug('app:database')('connected to the Database');
  });
  module.exports = pool;
}

