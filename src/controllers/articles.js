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
  // user login logic
  deleteComment: async (req, res) => {
   
  },
  // user login logic
  findAllArticleOrGif: async (req, res) => {
    const { token } = req.cookies;
    req.Header = token;
    // token = req.header();
    try {
      pool.query('SELECT id, employee_id as authorId, title, article, articledate as createdOn FROM  articles  ORDER BY articledate DESC ', (err, result) => {
        if(result.rows[0] === undefined){ return res.jsend.error("Article not available");}
        if (!err) {
              return res.jsend.success(result.rows);
          }
          return res.jsend.error('Unable to get articles'); 
      });
      pool.query('SELECT id, employee_id as authorId, title, imageurl as url, gifdate as createdOn FROM  gif  ORDER BY gifdate DESC', (err, result) => {
        if(result.rows[0] === undefined){ return res.jsend.error("Gif not available");}
        if (!err) {
              return res.jsend.success(result.rows);
          }
          return res.jsend.error('Unable to get gifs'); 
      });
  } catch (error) { debug('app:*')('Error Occured: Something wrong gettingArticleOrGif'); }
  // disconnect client
  pool.on('remove', () => {
    debug('app:*')('Client Removed @getArticleOrGif');
  });
  }
};
