"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

require("chai/register-should");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import the dependencies for testing
// Configure chai
_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should();

describe("Teamwork Application Unit Tests", function () {
  describe("Test for GET tasks", function () {
    // Test to get all articles and gifs
    it("should get all article or gifs", function (done) {
      _chai["default"].request(_app["default"]).get('/feed').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    }); // Test to get single student record

    it("should get a specific article", function (done) {
      var id = 1;

      _chai["default"].request(_app["default"]).get("GET /articles/".concat(id)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
    it("should get a specific gif", function (done) {
      var id = 1;

      _chai["default"].request(_app["default"]).get("/gifs/".concat(id)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
  });
  describe('Test for POST tasks', function () {
    it('Create a new user', function (done) {
      var user = {
        email: 'jelel@yahoo.com',
        firstName: 'jelel',
        lastName: 'Hammed',
        password: 'olajide4me',
        gender: 'Male',
        jobRole: 'Administrator',
        department: 'Admin'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/create-user').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
    it('Login a user', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'htolajideyahoo.com',
        password: 'olajide4me'
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
    it('Create new article', function (done) {
      _chai["default"].request(_app["default"]).post('/articles').send({
        title: 'run',
        UserId: 2
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
    it('Post comment on article', function (done) {
      _chai["default"].request(_app["default"]).post('/articles/:Id/comment').send({
        email: 'run',
        password: false
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
    it('Post comment on gif', function (done) {
      _chai["default"].request(_app["default"]).post('/gifs/:Id/comment').send({
        email: 'run',
        password: false
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
    it('Create new gif', function (done) {
      _chai["default"].request(_app["default"]).post('/gifs').send({
        url: 'run',
        password: false
      }).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done(err);
      });
    });
  });
  describe('Test for DELETE tasks', function () {
    it('Delete a gif', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/gifs/:Id').end(function (err, res) {
        res.should.have.status(200); // res.body.should.be.a('object');

        done(err);
      });
    });
    it('Delete an article', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/articles/:Id').end(function (err, res) {
        res.should.have.status(200); // res.body.should.be.a('object');

        done(err);
      });
    });
    it('Delete an article comment', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/articles/:Id/comment').end(function (err, res) {
        res.should.have.status(200); //res.body.should.be.a('object');

        done(err);
      });
    });
    it('Delete a gif comment', function (done) {
      _chai["default"].request(_app["default"])["delete"]('/gifs/:Id/comment').end(function (err, res) {
        res.should.have.status(200); //res.body.should.be.a('object');

        done(err);
      });
    });
  });
  describe('Test for PATCH/PUT tasks', function () {
    it('Edit an article', function (done) {
      _chai["default"].request(_app["default"]).patch('/articless/:Id').send({
        title: 'run',
        password: false
      }).end(function (err, res) {
        res.should.have.status(200); // res.body.should.be.a('object');

        done(err);
      });
    });
  });
});