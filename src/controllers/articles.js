import jwt from 'jsonwebtoken';
import debug from 'debug';
import bcrypt from 'bcrypt';
import pool from '../database/dbconnect';

export default {
  create: async (req, res) => {
    const { token, userid } = req.cookies;
    const { title, article} = req.body;
    req.header = token;
    try {
        // create user account if user is admin
        pool.query('INSERT INTO articles (employee_id, title, article) VALUES ($1, $2, $3) RETURNING id, title, articledate ', [userid, title, article], (err, result) => {
          if (!err) {
            return res.jsend.success({
              message: 'Article Succesfully posted',
              articleId: result.rows[0].id,
              createdOn: result.rows[0].articledate,
              title: result.rows[0].title,
            });
            return;
          }
          return res.jsend.error(err);
        });
    } catch (error) { debug('app:*')('Error Occured: Something wrong @postArticle'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @ postAricle');
    });
   
  },
  // edit article logic
  edit: async (req, res) => {
    const { token, userid } = req.cookies;
    const { title, article} = req.body;
    const { params: { articleId } } = req;
    req.header = token;
    try {
        pool.query('UPDATE  articles SET  title = $1, article = $2  WHERE id = $3 AND employee_id = $4 RETURNING title, article, articledate', [title, article, articleId, userid], (err, result) => {
          if(result.rows[0] === undefined){ return res.jsend.error("Article update failed");}
          if (!err) {
            return res.jsend.success({
              message: 'Article succesfully updated',
              title: result.rows[0].title,
              article: result.rows[0].article,
              createdOn: result.rows[0].articledate,
            });
          } 
          return res.jsend.error(err);
        });
    } catch (error) { debug('app:*')('Error Occured: Something wrong @editArticle'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @ editAricle');
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
  // user login logic
  findAllArticleOrGif: async (req, res) => {
  }
};
