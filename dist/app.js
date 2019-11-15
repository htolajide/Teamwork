"use strict";

require("@babel/polyfill");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _jsend = _interopRequireDefault(require("jsend"));

var _morgan = _interopRequireDefault(require("morgan"));

var _debug = _interopRequireDefault(require("debug"));

var _tables = _interopRequireDefault(require("./models/tables"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])(); // to resolve cross origin resource shearing (CORS) error add folowing to te response header 

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use((0, _cookieParser["default"])());
app.use((0, _morgan["default"])('combined'));
app.use(_jsend["default"].middleware);

_tables["default"].createEmployeeTable();

_tables["default"].createGifTable();

_tables["default"].createArticlesTable();

_tables["default"].createCommentTable();

_tables["default"].disconnect();

app.use('/api/v1', _routes["default"]);
app.get('*', function (req, res) {
  return res.jsend.success('Teamwork!!!');
});
var port = parseInt(process.env.PORT, 10) || 4000;
app.listen(port, function () {
  return (0, _debug["default"])('app:*')("Live at ".concat(port));
});
module.exports = app;