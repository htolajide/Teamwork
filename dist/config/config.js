"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require('dotenv').config();

var config = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },
  development: {
    user: 'postgres',
    // this is the db user credential
    database: 'teamwork',
    password: 'olajide4me',
    port: 5433,
    max: 100,
    // max number of clients in the pool
    idleTimeoutMillis: 30000
  },
  test: {
    user: 'postgres',
    // this is the db user credential
    database: 'teamwork_test',
    password: 'olajide4me',
    port: 5433,
    max: 100,
    // max number of clients in the pool
    idleTimeoutMillis: 30000
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
var _default = config;
exports["default"] = _default;