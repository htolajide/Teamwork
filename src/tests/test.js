// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Teamwork Application Unit Tests", () => {
    describe("Test for GET tasks", () => {
        // Test to get all articles and gifs
        it("should get all article or gifs", (done) => {
             chai.request(app)
                 .get('/feed')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done(err);
                  });
         });
        // Test to get single student record
        it("should get a specific article", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`GET /articles/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done(err);
                  });
         });


        it("should get a specific gif", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/gifs/${id}`)
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                  });
         });
    });

    describe('Test for POST tasks', function() {
        it('Create a new employee', function(done) {
            chai.request(app)
                .post('/auth/create-user')
                .send({
                    title: 'run',
                    done: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });
        it('Login a user', function(done) {
            chai.request(app)
                .post('/auth/signin')
                .send({
                    email: 'run',
                    password: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });
        it('Create new article', function(done) {
            chai.request(app)
                .post('/articles')
                .send({
                    title: 'run',
                    UserId: 2
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Post comment on article', function(done) {
            chai.request(app)
                .post('/articles/:Id/comment')
                .send({
                    email: 'run',
                    password: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Post comment on gif', function(done) {
            chai.request(app)
                .post('/gifs/:Id/comment')
                .send({
                    email: 'run',
                    password: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Create new gif', function(done) {
            chai.request(app)
                .post('/gifs')
                .send({
                    url: 'run',
                    password: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });
    });
    describe('Test for DELETE tasks', function() {
        it('Delete a gif', function(done) {
            chai.request(app)
                .delete('/gifs/:Id')
                .end(function(err, res) {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete an article', function(done) {
            chai.request(app)
                .delete('/articles/:Id')
                .end(function(err, res) {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete an article comment', function(done) {
            chai.request(app)
                .delete('/articles/:Id/comment')
                .end(function(err, res) {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete a gif comment', function(done) {
            chai.request(app)
                .delete('/gifs/:Id/comment')
                .end(function(err, res) {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done(err);
                });
        });
    });

    describe('Test for PATCH/PUT tasks', function() {
        it('Edit an article', function(done) {
            chai.request(app)
                .patch('/articless/:Id')
                .send({
                    title: 'run',
                    password: false
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    // res.body.should.be.a('object');
                    done(err);
                });
        });
    });
});