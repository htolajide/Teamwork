"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _dbconnect = _interopRequireDefault(require("../database/dbconnect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// get debug module for debugging mode
// get postgres connection pool for database query
var tables = {
  // create user tables if not exist
  createEmployeeTable: function createEmployeeTable() {
    var employee = "CREATE TABLE IF NOT EXISTS\n       employee( \n          id SERIAL PRIMARY KEY, \n          firstName VARCHAR NOT NULL,\n          lastName VARCHAR NOT NULL,\n          email VARCHAR NOT NULL,\n          password VARCHAR NOT NULL,\n          gender VARCHAR NOT NULL,\n          jobRole VARCHAR NOT NULL,\n          isAdmin BOOLEAN DEFAULT FALSE,\n          department VARCHAR NOT NULL,\n          regDate TIMESTAMP DEFAULT NOW()\n        )";

    _dbconnect["default"].query(employee).then(function (res) {
      (0, _debug["default"])('app:*')("table employee is available ".concat(res));
    })["catch"](function (err) {
      (0, _debug["default"])('app:*')(err);
    });
  },
  createGifTable: function createGifTable() {
    var gif = "CREATE TABLE IF NOT EXISTS\n      gif(\n        id SERIAL PRIMARY KEY,\n        employee_id INT NOT NULL,\n        imageUrl VARCHAR NOT NULL,\n        title VARCHAR NOT NULL,\n        gifDate TIMESTAMP DEFAULT NOW()\n      )";

    _dbconnect["default"].query(gif).then(function (res) {
      (0, _debug["default"])('app:*')("table gif is available ".concat(res));
    })["catch"](function (err) {
      (0, _debug["default"])('app:*')(err);
    });
  },
  createArticlesTable: function createArticlesTable() {
    var articles = "CREATE TABLE IF NOT EXISTS\n      articles(\n        id SERIAL PRIMARY KEY,\n        employee_id INT NOT NULL,\n        title VARCHAR NOT NULL,\n        article VARCHAR NOT NULL,\n        articleDate TIMESTAMP DEFAULT NOW()\n      )";

    _dbconnect["default"].query(articles).then(function (res) {
      (0, _debug["default"])('app:*')("table articles is available ".concat(res));
    })["catch"](function (err) {
      (0, _debug["default"])('app:*')(err);
    });
  },
  createCommentTable: function createCommentTable() {
    var comment = "CREATE TABLE IF NOT EXISTS\n      comment(\n        id SERIAL PRIMARY KEY,\n        article_id INT NOT NULL,\n        employee_id INT NOT NULL,\n        comment VARCHAR NOT NULL,\n        comment_date TIMESTAMP DEFAULT NOW()\n      )";

    _dbconnect["default"].query(comment).then(function (res) {
      (0, _debug["default"])('app:*')("table comment is available ".concat(res));
    })["catch"](function (err) {
      (0, _debug["default"])('app:*')(err);
    });
  },
  disconnect: function disconnect() {
    // disconnect client
    _dbconnect["default"].on('remove', function () {
      (0, _debug["default"])('app:database')('Tables created successfully, conection removed');
    });
  }
}; // export utilities to be accessible  from any where within the application

var _default = tables;
exports["default"] = _default;