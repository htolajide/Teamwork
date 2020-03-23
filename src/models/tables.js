// get debug module for debugging mode
import debug from 'debug';
// get postgres connection pool for database query
import pool from '../database/dbconnect';

const tables = {
  // create user tables if not exist
  createTraderTable: () => {
    const trader = `CREATE TABLE IF NOT EXISTS
       trader( 
          id SERIAL PRIMARY KEY, 
          name VARCHAR NOT NULL,
          bus_name VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          phone VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          address VARCHAR NOT NULL,
          bus_description VARCHAR NOT NULL,
          isAdmin BOOLEAN DEFAULT FALSE,
          photoUrl VARCHAR NOT NULL,
          regDate TIMESTAMP DEFAULT NOW()
        )`;
    pool.query(trader)
      .then((res) => {
        debug('app:*')(`table trader is available ${res}`);
      })
      .catch((err) => {
        debug('app:*')(err);
      });
  },
  createProductTable: () => {
    const product = `CREATE TABLE IF NOT EXISTS
      product(
        id SERIAL PRIMARY KEY,
        product_name VARCHAR NOT NULL,
        trader_id INT NOT NULL REFERENCES trader(id),
        imageUrl VARCHAR NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )`;
    pool.query(product)
      .then((res) => {
        debug('app:*')(`table product is available ${res}`);
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
