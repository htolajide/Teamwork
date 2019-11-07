import express from 'express';

import validator from '../middlewares/validator';
import authenticator from '../middlewares/authenticator';
import users from '../controllers/users';
import gif from '../controllers/gifs';
import article from '../controllers/articles';

const router = express.Router();

// user auth
router.post('/auth/create-user',  users.signup);
router.post('auth/signin', users.login);

// Create gifs
router.post('/gifs', gif.create);

// Delete a gif
router.delete('/gifs/:gifID', gif.delete);

// Delete a gif comment
router.delete('/gifs/:gifID', gif.deleteComment);

// Create article
router.post('/articles', article.create);

// Edit an article
router.patch('/articles/:articleID', article.edit);

// Delete an article
router.delete('/articles/:articleID', article.delete);

// Delete an article comment
router.delete('/articles/:articleID', article.deleteComment);

// Comment on an article
router.post('/articles/<:articleId>/comment', article.createComment);

// Comment on a gif
router.post('/gifs/<:gifId>/comment', gif.createComment);

// View all article or gif with recent first
router.get('/feed', article.findAllArticleOrGif);

// View  a specific article
router.get( '/article/:articleId', article.getOne,);

// View  a specific gif
router.get( '/gifs/:gifId', gif.getOne,);

export default router;
