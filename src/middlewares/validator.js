import validationHelpers from '../utilities/validationHelpers';
import { emailRegex, passwordRegex, articleRegex } from '../utilities/regexen';

const { checkForEmptyFields, checkPatternedFields } = validationHelpers;

export default {
  auth: (req, res, next) => {
    const errors = [];
    const {
      firstName, lastName, email, password,
    } = req.body;

    if (req.path.includes('create-user')) {
      errors.push(...checkForEmptyFields('First name', firstName));
      errors.push(...checkForEmptyFields('Last name', lastName));
    }
    errors.push(...checkPatternedFields('Email address', email, emailRegex));
    errors.push(...checkPatternedFields('Password', password, passwordRegex));

    if (errors.length) {
      return res.jsend.error({
        message: 'Your request contain errors',
        data: errors,
      });
    }
    return next();
  },
  article: (req, res, next) => {
    const errors = [];
    const { title, article } = req.body;

    errors.push(...checkForEmptyFields('Title', title));
    errors.push(...checkForEmptyFields('Article', article));
    errors.push(...checkPatternedFields('Article', article, articleRegex));

    if (errors.length) {
      return res.jsend.error({
        message: 'Your request contain errors',
        data: errors,
      });
    }
    return next();
  },
  checkArticleIdParams: (req, res, next) => {
    const { params: { articleId } } = req;
    const parsedNumber = parseInt(articleId, 10);
    const isInteger = Number.isInteger(parsedNumber);
    const isGreaterThanZero = parsedNumber > 0;

    if (isInteger && isGreaterThanZero) return next();
    return res.jsend.error('ID must be an integer greater than zero');
  },

  checkGifIdParams: (req, res, next) => {
    const { params: { gifId } } = req;
    const parsedNumber = parseInt(gifId, 10);
    const isInteger = Number.isInteger(parsedNumber);
    const isGreaterThanZero = parsedNumber > 0;

    if (isInteger && isGreaterThanZero) return next();
    return res.jsend.error('ID must be an integer greater than zero');
  },
  
  checkCommentIdParams: (req, res, next) => {
    const { params: { commentId } } = req;
    const parsedNumber = parseInt(commentId, 10);
    const isInteger = Number.isInteger(parsedNumber);
    const isGreaterThanZero = parsedNumber > 0;

    if (isInteger && isGreaterThanZero) return next();
    return res.jsend.error('ID must be an integer greater than zero');
  },
};
