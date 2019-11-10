import jwt from 'jsonwebtoken';
import debug from 'debug';
import bcrypt from 'bcrypt';
import pool from '../database/dbconnect';

export default {
  create: async (req, res) => {
    // check if user is admin
    const { token, userid } = req.cookies;
    const { url, title} = req.body;
    try {

        // create trip if user is admin
        pool.query('INSERT INTO gif (employee_id, imageurl, title) VALUES ($1, $2, $3) RETURNING id, imageurl, title, gifdate ', [userid, url, title], (err, result) => {
          if (!err) {
            return res.jsend.success({
              gifID: result.rows[0].id,
              message: 'Gif image successfully posted',
              CreatedOn: origin,
              Destination: result.rows[0].gifdate,
              title: result.rows[0].tilte,
              imageUrl: result.rows[0].imageurl
            });
          }
          return res.jsend.error(error);
        });
        return null;
    } catch (error) { debug('app:*')('Error Occured: Something wrong @createGif'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @ createGif');
    });

  },
  // user login logic
  delete: async (req, res) => {
    
   
  },
  // user login logic
  getOne: async (req, res) => {
    
  },
  // user login logic
  createComment: async (req, res) => {

  },

  // user login logic
  deleteComment: async (req, res) => {
    
  },
};
