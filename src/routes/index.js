import express from 'express';

import validator from '../middlewares/validator';
import authenticator from '../middlewares/authenticator';
import users from '../controllers/users';
import gif from '../controllers/gifs';
import article from '../controllers/articles';

const router = express.Router();

// user auth
router.post('/auth/create-user', validator.auth,  users.signup);
router.post('/auth/signin', validator.auth, users.login);

// Create gifs
router.post('/gifs', authenticator, gif.create);

// Delete a gif
router.delete('/gifs/:gifId', authenticator, validator.checkGifIdParams, gif.delete);

// Delete a gif comment
router.delete('/gifs/:gifID/comment/:commentId', authenticator, validator.checkCommentIdParams,  gif.deleteComment);

// Create article
router.post('/articles', authenticator, validator.article, article.create);

// Edit an article
router.patch('/articles/:articleId', authenticator, validator.checkArticleIdParams, article.edit);

// Delete an article
router.delete('/articles/:articleId', authenticator, validator.checkArticleIdParams, article.delete);

// Delete an article comment
router.delete('/articles/:articleId/comment/:commentId', authenticator, validator.checkCommentIdParams, article.deleteComment);

// Comment on an article
router.post('/articles/:articleId/comment', authenticator, validator.checkArticleIdParams, article.createComment);

// Comment on a gif
router.post('/gifs/:gifId/comment/',authenticator, validator.checkGifIdParams, gif.createComment);

// View all article or gif with recent first
router.get('/feed', article.getFeed); 

// View  a specific article
router.get( '/articles/:articleId', authenticator, validator.checkArticleIdParams, article.getOne,);

// View  a specific gif
router.get( '/gifs/:gifId', authenticator, validator.checkGifIdParams, gif.getOne,);

export default router;
