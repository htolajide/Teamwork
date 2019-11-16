
let cloudinary = require('cloudinary').v2;
import debug from 'debug';
import pool from '../database/dbconnect';
// configure cloudinary
cloudinary.config({
  cloud_name: 'ds5hogj9b',
  api_key: '657785678132187',
  api_secret: 'EcvkztYhPW8egTvRTo10OdiJpwU'
});


export default {
  create: async (req, res) => {
    // check if user is admin
    const { token, userid } = req.cookies;
    const {url, title} = req.body;
    // token = req.header();
    try {
      // Upload gif to cloudinary
      await cloudinary.uploader.upload(url, { tags: 'basic_sample', "width": 200, "height": 150,  })
      .then(function (image) {
      console.log();
      console.log("** File Upload (Promise)");
      console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
      console.log("* " + image.public_id);
      console.log("* " + image.url);
      // create trip if user is admin
      pool.query('INSERT INTO gif (employee_id, imageurl, title) VALUES ($1, $2, $3) RETURNING id, imageurl, title, gifdate ', [userid, image.url, title], (err, result) => {
        if (!err) {
          return res.jsend.success({
            gifID: result.rows[0].id,
            message: 'Gif image successfully posted',
            CreatedOn: result.rows[0].gifdate,
            title: result.rows[0].title,
            imageUrl: result.rows[0].imageurl
          });
        }
          return res.jsend.error(error);
      });
    // disconnect client
    pool.on('remove', () => {
        debug('app:*')('Client Removed @ postGif');
      });
    })
    .catch(function (err) {
      console.log();
      console.log("** File Upload (Promise)");
      if (err) { debug('app:*')('Error Occured: Something wrong @createGif' + err); }
    });
  }catch (error) { debug('app:*')('Error Occured: Something wrong @createGif'); }   
},
  // user delete gif logic
  delete: async (req, res) => {
    const { token, userid } = req.cookies;
    const { params: { gifId } } = req;
    // token = req.header();
    try {
        pool.query('DELETE FROM  gif  WHERE id = $1 AND employee_id = $2 RETURNING id, title', [gifId, userid], (err, result) => {
          if(result.rows[0] === undefined){ return res.jsend.error("Delete gif failed");}
          if (!err) {
            return res.jsend.success({
              message: 'Gif succesfully deleted ',
              title: result.rows[0].title
            });
          } 
          return res.jsend.error(err);
        });
    } catch (error) { debug('app:*')('Error Occured: Something wrong @deleteGif ' + error); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @deleteGif');
    }); 
  },
  // Get specific gif
  getOne: async (req, res) => {
    const { params: { gifId } } = req;
    try {
      pool.query('SELECT id, title, imageurl as imageurl, gifdate FROM gif WHERE id = $1', [gifId], (error, result) => {
        pool.query('SELECT id as commentId, comment, employee_id as authorId from gif_comment WHERE gif_id = $1 ', [gifId], (err, commentResult) => {
          if(!error){
            if (!err) {
              return res.jsend.success({
                id: result.rows[0].id,
                createdOn: result.rows[0].gifdate,
                title: result.rows[0].title,
                url: result.rows[0].imageurl,
                comment: commentResult.rows,
              });
            }
            return res.jsend.error(error);
          }
        });
      });
    } catch (error) { debug('app:*')('Error Occured: Something wrong getting gif'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @gettingGif');
    });
  },
  // user login logic
  createComment: async (req, res) => {
    const { token, userid } = req.cookies;
    const { params: { gifId } } = req;
    const {comment} = req.body;
    // token = req.header();
    try {
        pool.query('SELECT title FROM  gif  WHERE id = $1', [gifId], (err, result) => {
          if(result.rows[0] === undefined){ return res.jsend.error("No gif to comment on");}
          if (!err) {
            pool.query('INSERT INTO gif_comment (comment, employee_id, gif_id) VALUES ($1, $2, $3) RETURNING comment, comment_date', [comment, userid, gifId], (error, commentResult) => {
              if(!error){
                return res.jsend.success({
                message: 'Comment succesfully created',
                createdOn: commentResult.rows[0].comment_date,
                gifTitle: result.rows[0].title,
                comment: commentResult.rows[0].comment,
              });
            }
            return res.jsend.error(error);
            }); 
          } 
        });
    } catch (error) { debug('app:*')('Error Occured: Something wrong getting article'); }
    // disconnect client
    pool.on('remove', () => {
      debug('app:*')('Client Removed @commentGif');
    }); 
  },
  // admin delete comment
  deleteComment: async (req, res) => {
    const { userid } = req.cookies;
    const { params: { gifId, commentId } } = req;
      try {
        pool.query('SELECT isadmin FROM employee WHERE id = $1', [userid], (error, results) => {
          if(results.rows[0] === undefined){ return res.jsend.error("You are not an admin");}
            if (!error) {
              if (results.rows[0].isadmin === false) return res.jsend.error('Only admin can can delete a comment');
            }
          pool.query('DELETE FROM gif_comment WHERE  id = $1 AND gif_id = $2', [commentId, gifId], (error, result) => {
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
};
