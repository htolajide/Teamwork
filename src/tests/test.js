// Import the dependencies for testing
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';
// Configure chai
chai.use(chatHttp);
chai.should();
describe("Teamwork Application Unit Tests", () => {
    beforeEach( function (){
        const userid = 1;
        return userid;
    });
    describe("Test for GET tasks", () => {
        // Test to get all articles and gifs
        it("should get feed", (done) => {
             chai.request(app)
                 .get('/api/v1/feed')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done(err);
                  });
         });

        it("should get a specific article", (done) => {
             const id = 3;
             chai.request(app)
                 .get(`/api/v1/articles/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done(err);
                  });
         });

        it("should get a specific gif", (done) => {
             const id = 6;
             chai.request(app)
                 .get(`/api/v1/gifs/${id}`)
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                  });
         });
    });

    describe('Test for POST tasks', function() {
       /** it('Create a new user', function(done) {
            this.timeout(0);
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
                    done();
                });
        });

        it('Login a user', function(done) {
            this.timeout(0);
             chai.request(app)
                .post('/api/v1/auth/signin')
                .send({
                    email: 'jelel@yahoo.com',
                    password: 'olajide4me'
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
*/
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
            const articleId = 3;
            chai.request(app)
                .post(`/api/v1/articles/${articleId}/comment`)
                .send({
                    comment: 'This is nice',
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Post comment on gif', function(done) {
            const gifId = 3;
            chai.request(app)
                .post(`/api/v1/gifs/${gifId}/comment`)
                .send({
                    comment: 'Good post',
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
            const gifId = 4;
            chai.request(app)
                .delete(`/api/v1/gifs/${gifId}`)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete an article', function(done) {
            const articleId = 1;
            chai.request(app)
                .delete(`/api/v1/articles/${articleId}`)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete an article comment', function(done) {
            const articleId = 3;
            const commentId = 1;
            chai.request(app)
                .delete(`/api/v1/articles/${articleId}/comment/${commentId}`)
                .end(function(err, res) {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete a gif comment', function(done) {
            const gifId = 6;
            const commentId = 1;
            chai.request(app)
                .delete(`/api/v1/gifs/${gifId}/comment/${commentId}`)
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