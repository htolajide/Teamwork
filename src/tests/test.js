// Import the dependencies for testing
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';
// Configure chai
chai.use(chatHttp);
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
        it('Create a new user', function(done) {
                const user = {
                    email: 'jelel@yahoo.com', 
                    firstName: 'jelel', 
                    lastName: 'Hammed', 
                    password: 'olajide4me', 
                    gender: 'Male', 
                    jobRole: 'Administrator', 
                    department: 'Admin', 
                };
                chai.request(app)
                .post('/api/v1/auth/create-user')
                .set('Accept', 'application/json')
                .send(user)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Login a user', function(done) {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'jelel@yahoo.com',
                    password: 'olajide4me'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Post new article', function(done) {
            chai.request(app)
                .post('/api/v1/articles')
                .send({
                    title: 'Test Post article',
                    article: 'am just testing posting articles'
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

        it('Post new gif', function(done) {
            chai.request(app)
                .post('/api/v1/gifs')
                .send({
                    title: 'Test Post',
                    url: 'gifs/jona.jpg'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
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
            const articleId = 5;
            chai.request(app)
                .patch(`/api/v1/articles/${articleId}`)
                .send({
                    title: 'edited article',
                    article: 'just another article edited '
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });
    });
});