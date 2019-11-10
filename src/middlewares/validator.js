import validationHelpers from '../utilities/validationHelpers';
import { emailRegex, passwordRegex, descriptionRegex } from '../utilities/regexen';

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
  checkIDParams: (req, res, next) => {
    const { params: { IDParameter } } = req;
    const parsedNumber = parseInt(IDPrameter, 10);
    const isInter = Number.isInteger(parsedNumber);
    const isGreaterThanZero = parsedNumber > 0;

    if (isInter && isGreaterThanZero) return next();
    return res.jsend.error('ID must be an integer greater than zero');
  },
};
