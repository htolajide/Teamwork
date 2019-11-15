import debug from 'debug';
import pool from '../database/dbconnect';

export default {
  create: async (req, res) => {
    const { token, userid } = req.cookies;
    const { title, article} = req.body;
    // token = req.header();
    try {
        // employee post new article
        pool.query('INSERT INTO articles (employee_id, title, article) VALUES ($1, $2, $3) RETURNING id, title, articledate', [userid, title, article], (err, result) => {
          if (!err) {
            return res.jsend.success({
              message: 'Article Succesfully posted',
              articleId: result.rows[0].id,
              createdOn: result.rows[0].articledate,
              title: result.rows[0].title,
            });
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
    // token = req.header();
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

  // delete article logic
  delete: async (req, res) => {
    const { token, userid } = req.cookies;
    const { params: { articleId } } = req;
    // token = req.header();
    try {
        pool.query('DELETE FROM  articles  WHERE id = $1 AND employee_id = $2 RETURNING id, title', [articleId, userid], (err, result) => {
          if(result.rows[0] === undefined){ return res.jsend.error("Delete article failed");}
          if (!err) {
            return res.jsend.success({
              message: 'Article succesfully deleted ',
              title: result.rows[0].title
            });
          } 
          return res.jsend.error(err);
        });
    } catch (error) { debug('app:*')('Error Occured: Something wrong @deleteArticle'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @deleteArticle');
    }); 
  },

  // user get a specific article
  getOne: async (req, res) => {
    const { params: { articleId } } = req;
    try {
      pool.query('SELECT id, title, article, articledate FROM articles WHERE id = $1', [articleId], (error, result) => {
        pool.query('SELECT id as commentId, comment, employee_id as authorId from article_comment WHERE article_id = $1 ', [articleId], (err, commentResult) => {
          if(!error){
            if (!err) {
              return res.jsend.success({
                id: result.rows[0].id,
                createdOn: result.rows[0].articledate,
                title: result.rows[0].title,
                article: result.rows[0].article,
                comment: commentResult.rows,
              });
            }
            return res.jsend.error(error);
          }
        });
      });
    } catch (error) { debug('app:*')('Error Occured: Something wrong getting article'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @gettingArticle');
    });
  },
  // user comment on article
  createComment: async (req, res) => {
    const { token, userid } = req.cookies;
    const { params: { articleId } } = req;
    const {comment} = req.body;
    // token = req.header();
    try {
        pool.query('SELECT title, article FROM  articles  WHERE id = $1', [articleId], (err, result) => {
          if(result.rows[0] === undefined){ return res.jsend.error("No article to comment on");}
          if (!err) {
            pool.query('INSERT INTO article_comment (comment, employee_id, article_id) VALUES ($1, $2, $3) RETURNING comment, comment_date', [comment, userid, articleId], (error, commentResult) => {
              if(!error){
                return res.jsend.success({
                message: 'Comment succesfully created',
                createdOn: commentResult.rows[0].comment_date,
                articleTitle: result.rows[0].title,
                article: result.rows[0].article,
                comment: commentResult.rows[0].comment,
              });
            }
            return res.jsend.error(error);
            }); 
          } 
        });
    } catch (error) { debug('app:*')('Error Occured: Something wrong commentArticle'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @commentArticle');
    });
  },
  // delete comment
  deleteComment: async (req, res) => {
    const { userid } = req.cookies;
    const id = parseInt(req.params.commentId, 10);
      try {
        pool.query('SELECT isadmin FROM employee WHERE id = $1', [userid], (error, results) => {
          if(results.rows[0] === undefined){ return res.jsend.error("You are not an admin");}
            if (!error) {
              if (results.rows[0].isadmin === false) return res.jsend.error('Only admin can can delete a comment');
            }
          pool.query('DELETE FROM article_comment WHERE  id = $1', [id], (error, result) => {
          if (result) {
          res.jsend.success({ message: 'Comment deleted successfully' });
        }
      });
    });
    } catch (error) { debug('app:*')(error); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client removed @deleteComment');
    });
   
  },
  // user login logic
  getFeed: async (req, res) => {
    const { token } = req.cookies;
    req.Header = token;
    // token = req.header();
    try {
      pool.query('SELECT id, employee_id as authorId, title, article, articledate as createdOn FROM  articles'
      + ' UNION ALL '
      + 'SELECT id, employee_id as authorId, title, imageurl as url, gifdate as createdOn FROM  gif  ORDER BY createdON DESC', (err, result) => {
        if (!err) {
              return res.jsend.success(result.rows);
          }
          return res.jsend.error('Unable to get feed '+ err); 
      });
  } catch (error) { debug('app:*')('Error Occured: Something wrong gettingFeed ' + error); }
  // disconnect client
  pool.on('remove', () => {
    debug('app:*')('Client Removed @getFeed');
  });
  }
};
