// get debug module for debugging mode
import debug from 'debug';
// get postgres connection pool for database query
import pool from '../database/dbconnect';

const tables = {
  // create user tables if not exist
  createEmployeeTable: () => {
    const employee = `CREATE TABLE IF NOT EXISTS
       employee( 
          id SERIAL PRIMARY KEY, 
          firstName VARCHAR NOT NULL,
          lastName VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          gender VARCHAR NOT NULL,
          jobRoll VARCHAR NOT NULL,
          department VARCHAR NOT NULL,
          is_admin BOOLEAN DEFAULT FALSE,
          regDate TIMESTAMP DEFAULT NOW()
        )`;
    pool.query(employee)
      .then((res) => {
        debug('app:*')(`table employee is available ${res}`);
      })
      .catch((err) => {
        debug('app:*')(err);
      });
  },
  createGifTable: () => {
    const gif = `CREATE TABLE IF NOT EXISTS
      gif(
        id SERIAL PRIMARY KEY,
        employee_id INT NOT NULL,
        image VARCHAR NOT NULL,
        title VARCHAR NOT NULL,
        gifDate TIMESTAMP DEFAULT NOW()
      )`;
    pool.query(gif)
      .then((res) => {
        debug('app:*')(`table gif is available ${res}`);
      })
      .catch((err) => {
        debug('app:*')(err);
      });
  },
  createArticlesTable: () => {
    const articles = `CREATE TABLE IF NOT EXISTS
      articles(
        id SERIAL PRIMARY KEY,
        employee_id INT NOT NULL,
        title VARCHAR NOT NULL,
        article VARCHAR NOT NULL,
        articleDate TIMESTAMP DEFAULT NOW()
      )`;
    pool.query(articles)
      .then((res) => {
        debug('app:*')(`table articles is available ${res}`);
      })
      .catch((err) => {
        debug('app:*')(err);
      });
  },
  createCommentTable: () => {
    const comment = `CREATE TABLE IF NOT EXISTS
      comment(
        id SERIAL PRIMARY KEY,
        article_id INT NOT NULL,
        employee_id INT NOT NULL,
        comment VARCHAR NOT NULL,
        comment_date TIMESTAMP DEFAULT NOW()
      )`;
    pool.query(comment)
      .then((res) => {
        debug('app:*')(`table comment is available ${res}`);
      })
      .catch((err) => {
        debug('app:*')(err);
      });
  },
   disconnect: () => {
    // disconnect client
    pool.on('remove', () => {
      debug('app:database')('Tables created successfully, conection removed');
    });
  },
};
// export utilities to be accessible  from any where within the application
export default tables;
