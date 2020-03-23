require('dotenv').config(); 


const config = {

  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    user: 'postgres', // this is the db user credential
    database: 'abia_project',
    password: 'olajide4me',
    port: 5432,
    max: 100, // max number of clients in the pool
    idleTimeoutMillis: 30000,
  },

  test: {
    user: 'postgres', // this is the db user credential
    database: 'abia_project_test',
    password: 'olajide4me',
    port: 5432,
    max: 100, // max number of clients in the pool
    idleTimeoutMillis: 30000,
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};

export default config;