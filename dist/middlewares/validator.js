"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validationHelpers = _interopRequireDefault(require("../utilities/validationHelpers"));

var _regexen = require("../utilities/regexen");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var checkForEmptyFields = _validationHelpers["default"].checkForEmptyFields,
    checkPatternedFields = _validationHelpers["default"].checkPatternedFields;
var _default = {
  auth: function auth(req, res, next) {
    var errors = [];
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        email = _req$body.email,
        password = _req$body.password;

    if (req.path.includes('create-user')) {
      errors.push.apply(errors, _toConsumableArray(checkForEmptyFields('First name', firstName)));
      errors.push.apply(errors, _toConsumableArray(checkForEmptyFields('Last name', lastName)));
    }

    errors.push.apply(errors, _toConsumableArray(checkPatternedFields('Email address', email, _regexen.emailRegex)));
    errors.push.apply(errors, _toConsumableArray(checkPatternedFields('Password', password, _regexen.passwordRegex)));

    if (errors.length) {
      return res.jsend.error({
        message: 'Your request contain errors',
        data: errors
      });
    }

    return next();
  },
  article: function article(req, res, next) {
    var errors = [];
    var _req$body2 = req.body,
        title = _req$body2.title,
        article = _req$body2.article;
    errors.push.apply(errors, _toConsumableArray(checkForEmptyFields('Title', title)));
    errors.push.apply(errors, _toConsumableArray(checkForEmptyFields('Article', article)));
    errors.push.apply(errors, _toConsumableArray(checkPatternedFields('Article', article, articleRegex)));

    if (errors.length) {
      return res.jsend.error({
        message: 'Your request contain errors',
        data: errors
      });
    }

    return next();
  },
  checkIDParams: function checkIDParams(req, res, next) {
    var IDParameter = req.params.IDParameter;
    var parsedNumber = parseInt(IDPrameter, 10);
    var isInter = Number.isInteger(parsedNumber);
    var isGreaterThanZero = parsedNumber > 0;
    if (isInter && isGreaterThanZero) return next();
    return res.jsend.error('ID must be an integer greater than zero');
  }
};
exports["default"] = _default;