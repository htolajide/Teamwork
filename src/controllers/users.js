import jwt from 'jsonwebtoken';
import debug from 'debug';
import bcrypt from 'bcrypt';
import pool from '../database/dbconnect';

export default {
  signup: async (req, res) => {
    // check if user is admin
    const { token, userid } = req.cookies;
    const {
      firstName, lastName, email,  password, gender, jobRole, isAdmin, department, regDate
    } = req.body;
    try {
      pool.query('SELECT isadmin FROM employee WHERE id = $1', [userid], (error, results) => {
        if(results.rows[0] === undefined){ return res.jsend.error("You are not an admin");}
          if (!error) {
            if (results.rows[0].isadmin === false) return res.jsend.error('Only admin can can create an employee user account');
          }
        pool.query('SELECT email FROM employee WHERE email = $1', [email], async (error, results) => {
          // user does not exist
          if (results.rows[0] === undefined) {
            pool.query('INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, isAdmin, department)'+
              ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, isAdmin', [ firstName, lastName, email,  await bcrypt.hash(password, 10), gender, jobRole, isAdmin, department],  (err, result) => {
              // signin jwt and wrap in a cookie
              const token = jwt.sign({ userId: result.rows[0].id }, process.env.SECRET);
              res.cookie('userid', result.rows[0].id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
              res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
              return res.jsend.success({
                message: 'User account successfully created',
                user_id: result.rows[0].id,
                Token: token,
                is_admin: result.rows[0].isadmin,
              });
            });
          }
        if (results.rows[0] !== undefined) return res.jsend.error('Email already exists'); // email exists
          return null;
      });
    });
    } catch (error) { debug('app:*')(error); }
    // disconnect client after operation
    pool.on('remove', () => {
      debug('app:login')('client removed @signup');
    });
  },
  // user login logic
  login: async (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT id, email, password FROM employee WHERE email = $1 ', [email], async (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows[0] === undefined) return res.jsend.error('Login failed, check your inputs');
      const match = await bcrypt.compare(password, results.rows[0].password);
      if (!match) {
        return res.jsend.error({ message: 'Login failed, check your password' });
      }
      // sign jwt and wrap in a cookie
      const token = jwt.sign({ userId: results.rows[0].id }, process.env.SECRET);
      res.cookie('userid', results.rows[0].id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
      res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
      return res.jsend.success({
        Token: token, user_id: results.rows[0].id
      });
    });
    // disconnect client after operation
    pool.on('remove', () => {
      debug('app:login')('client removed @signin');
    });
  },
};
