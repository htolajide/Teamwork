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
  signup: function () {
    var _signup = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$body, firstName, lastName, email, password, gender, jobRole, isAdmin, department, regDate;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // check for existence
              _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, gender = _req$body.gender, jobRole = _req$body.jobRole, isAdmin = _req$body.isAdmin, department = _req$body.department, regDate = _req$body.regDate;

              try {
                _dbconnect["default"].query('SELECT email FROM employee WHERE email = $1', [email],
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(error, results) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(results.rows[0] === undefined)) {
                              _context.next = 16;
                              break;
                            }

                            _context.t0 = _dbconnect["default"];
                            _context.t1 = 'INSERT INTO employee (firstName, lastName, email, password, gender, jobRole, isAdmin, department)' + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, isAdmin';
                            _context.t2 = firstName;
                            _context.t3 = lastName;
                            _context.t4 = email;
                            _context.next = 8;
                            return _bcrypt["default"].hash(password, 10);

                          case 8:
                            _context.t5 = _context.sent;
                            _context.t6 = gender;
                            _context.t7 = jobRole;
                            _context.t8 = isAdmin;
                            _context.t9 = department;
                            _context.t10 = [_context.t2, _context.t3, _context.t4, _context.t5, _context.t6, _context.t7, _context.t8, _context.t9];

                            _context.t11 = function (err, result) {
                              // signin jwt and wrap in a cookie
                              var token = _jsonwebtoken["default"].sign({
                                userId: result.rows[0].id
                              }, process.env.SECRET);

                              res.cookie('userid', result.rows[0].id, {
                                expires: new Date(Date.now() + 3600000),
                                httpOnly: true
                              });
                              res.cookie('token', token, {
                                expires: new Date(Date.now() + 3600000),
                                httpOnly: true
                              });
                              return res.jsend.success({
                                message: 'User account successfully created',
                                user_id: result.rows[0].id,
                                Token: token,
                                is_admin: result.rows[0].isadmin
                              });
                            };

                            _context.t0.query.call(_context.t0, _context.t1, _context.t10, _context.t11);

                          case 16:
                            if (!(results.rows[0] !== undefined)) {
                              _context.next = 18;
                              break;
                            }

                            return _context.abrupt("return", res.jsend.error('Email already exists'));

                          case 18:
                            return _context.abrupt("return", null);

                          case 19:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3, _x4) {
                    return _ref.apply(this, arguments);
                  };
                }());
              } catch (error) {
                (0, _debug["default"])('app:*')(error);
              } // disconnect client after operation


              _dbconnect["default"].on('remove', function () {
                (0, _debug["default"])('app:login')('client removed @signup');
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function signup(_x, _x2) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),
  // user login logic
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      var _req$body2, email, password;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

              _dbconnect["default"].query('SELECT id, email, password FROM employee WHERE email = $1 ', [email],
              /*#__PURE__*/
              function () {
                var _ref2 = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3(error, results) {
                  var match, token;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!error) {
                            _context3.next = 2;
                            break;
                          }

                          throw error;

                        case 2:
                          if (!(results.rows[0] === undefined)) {
                            _context3.next = 4;
                            break;
                          }

                          return _context3.abrupt("return", res.jsend.error('Login failed, check your inputs'));

                        case 4:
                          _context3.next = 6;
                          return _bcrypt["default"].compare(password, results.rows[0].password);

                        case 6:
                          match = _context3.sent;

                          if (match) {
                            _context3.next = 9;
                            break;
                          }

                          return _context3.abrupt("return", res.jsend.error({
                            message: 'Login failed, check your password'
                          }));

                        case 9:
                          // sign jwt and wrap in a cookie
                          token = _jsonwebtoken["default"].sign({
                            userId: results.rows[0].id
                          }, process.env.SECRET);
                          res.cookie('userid', results.rows[0].id, {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true
                          });
                          res.cookie('token', token, {
                            expires: new Date(Date.now() + 3600000),
                            httpOnly: true
                          });
                          return _context3.abrupt("return", res.jsend.success({
                            Token: token,
                            user_id: results.rows[0].id
                          }));

                        case 13:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x7, _x8) {
                  return _ref2.apply(this, arguments);
                };
              }()); // disconnect client after operation


              _dbconnect["default"].on('remove', function () {
                (0, _debug["default"])('app:login')('client removed @signin');
              });

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function login(_x5, _x6) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
exports["default"] = _default;