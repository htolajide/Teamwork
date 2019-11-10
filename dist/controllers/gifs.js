"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _debug = _interopRequireDefault(require("debug"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dbconnect = _interopRequireDefault(require("../database/dbconnect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  create: function () {
    var _create = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var _req$cookies, token, userid, _req$body, url, title;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // check if user is admin
              _req$cookies = req.cookies, token = _req$cookies.token, userid = _req$cookies.userid;
              _req$body = req.body, url = _req$body.url, title = _req$body.title;
              _context.prev = 2;

              // create trip if user is admin
              _dbconnect["default"].query('INSERT INTO gif (employee_id, imageurl, title) VALUES ($1, $2, $3) RETURNING id, imageurl, title, gifdate ', [userid, url, title], function (err, result) {
                if (!err) {
                  return res.jsend.success({
                    gifID: result.rows[0].id,
                    message: 'Gif image successfully posted',
                    CreatedOn: origin,
                    Destination: result.rows[0].gifdate,
                    title: result.rows[0].tilte,
                    imageUrl: result.rows[0].imageurl
                  });
                }

                return res.jsend.error(error);
              });

              return _context.abrupt("return", null);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](2);
              (0, _debug["default"])('app:*')('Error Occured: Something wrong @createGif');

            case 10:
              // disconnect client
              _dbconnect["default"].on('remove', function () {
                (0, _debug["default"])('app:*')('Client Removed @ createGif');
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 7]]);
    }));

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  // user login logic
  "delete": function () {
    var _delete2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function _delete(_x3, _x4) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  // user login logic
  getOne: function () {
    var _getOne = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getOne(_x5, _x6) {
      return _getOne.apply(this, arguments);
    }

    return getOne;
  }(),
  // user login logic
  createComment: function () {
    var _createComment = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function createComment(_x7, _x8) {
      return _createComment.apply(this, arguments);
    }

    return createComment;
  }(),
  // user login logic
  deleteComment: function () {
    var _deleteComment = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deleteComment(_x9, _x10) {
      return _deleteComment.apply(this, arguments);
    }

    return deleteComment;
  }()
};
exports["default"] = _default;