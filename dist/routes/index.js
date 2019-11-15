"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _validator = _interopRequireDefault(require("../middlewares/validator"));

var _authenticator = _interopRequireDefault(require("../middlewares/authenticator"));

var _users = _interopRequireDefault(require("../controllers/users"));

var _gifs = _interopRequireDefault(require("../controllers/gifs"));

var _articles = _interopRequireDefault(require("../controllers/articles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // user auth


router.post('/auth/create-user', _validator["default"].auth, _users["default"].signup);
router.post('/auth/signin', _validator["default"].auth, _users["default"].login); // Create gifs

router.post('/gifs', _gifs["default"].create); // Delete a gif

router["delete"]('/gifs/:gifID', _gifs["default"]["delete"]); // Delete a gif comment

router["delete"]('/gifs/:gifID', _gifs["default"].deleteComment); // Create article

router.post('/articles', _articles["default"].create); // Edit an article

router.patch('/articles/:articleID', _articles["default"].edit); // Delete an article

router["delete"]('/articles/:articleID', _articles["default"]["delete"]); // Delete an article comment

router["delete"]('/articles/:articleID', _articles["default"].deleteComment); // Comment on an article

router.post('/articles/<:articleId>/comment', _articles["default"].createComment); // Comment on a gif

router.post('/gifs/<:gifId>/comment', _gifs["default"].createComment); // View all article or gif with recent first

router.get('/feed', _articles["default"].findAllArticleOrGif); // View  a specific article

router.get('/article/:articleId', _articles["default"].getOne); // View  a specific gif

router.get('/gifs/:gifId', _gifs["default"].getOne);
var _default = router;
exports["default"] = _default;