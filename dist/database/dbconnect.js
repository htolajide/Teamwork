"use strict";

var _pg = _interopRequireDefault(require("pg"));

var _debug = _interopRequireDefault(require("debug"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// get node postgres connector
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'; //const config = configuration[env];

console.log('this is the environment: ', env);

if (env === 'production') {
  var pool = _pg["default"].Pool(_config["default"].production);

  pool.on('connect', function () {
    (0, _debug["default"])('app:database')('connected to the Database');
    module.exports = pool;
  });
} else if (env === 'test') {
  var _pool = _pg["default"].Pool(_config["default"].test);

  _pool.on('connect', function () {
    (0, _debug["default"])('app:database')('connected to the Database');
  });

  module.exports = _pool;
} else {
  var _pool2 = _pg["default"].Pool(_config["default"].development);

  _pool2.on('connect', function () {
    (0, _debug["default"])('app:database')('connected to the Database');
  });

  module.exports = _pool2;
}