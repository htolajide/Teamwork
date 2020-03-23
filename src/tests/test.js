// Import the dependencies for testing
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';
// Configure chai
chai.use(chatHttp);
chai.should();
describe("Abia Project Application Unit Tests", () => {
    beforeEach( function (){
        const userid = 1;
        return userid;
    });
    describe("Test for GET tasks", () => {
        // Test to get all articles and gifs
        it("should get products", (done) => {
             chai.request(app)
                 .get('/api/v1/products')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done(err);
                  });
         });

        it("should get a specific product", (done) => {
             const id = 3;
             chai.request(app)
                 .get(`/api/v1/product/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done(err);
                  });
         });

        it("should get a specific trader", (done) => {
             const id = 6;
             chai.request(app)
                 .get(`/api/v1/trader/${id}`)
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                  });
         });
    });

    describe('Test for POST tasks', function() {
        it('Create a new user', function(done) {
            this.timeout(0);
                const user = {
                    email: 'jelel@yahoo.com', 
                    name: 'Hammed Taofeek', 
                    bus_name: 'Hammed', 
                    password: 'olajide4me', 
                    bus_description: 'I make shoes', 
                    photourl: 'user/user1.png', 
                    address: 'Admin', 
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
                    done(err);
                });
        });

        it('Post new product', function(done) {
            chai.request(app)
                .post('/api/v1/product')
                .send({
                    name: 'Shoe',
                    trader_id: 1,
                    imageurl: 'product/shoe.png',
                    price: 1500.00
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

    });

    describe('Test for DELETE tasks', function() {

        it('Delete a trader', function(done) {
            const traderId = 1;
            chai.request(app)
                .delete(`/api/v1/trader/${traderId}`)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Delete a product', function(done) {
            const productId = 6;
            chai.request(app)
                .delete(`/api/v1/products/${productId}`)
                .end(function(err, res) {
                    res.should.have.status(200);
                    //res.body.should.be.a('object');
                    done(err);
                });
        });
    });

    describe('Test for PATCH/PUT tasks', function() {
        it('Edit a product', function(done) {
            const productId = 5;
            chai.request(app)
                .patch(`/api/v1/product/${productId}`)
                .send({
                    name: 'Sandal',
                    trader_id: 1,
                    imageurl: 'product/sandal.png',
                    price: 2500.00
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

        it('Edit a user photo and business description', function(done) {
            const userId = 5;
            chai.request(app)
                .patch(`/api/v1/user/${userId}`)
                .send({
                    bus_description: 'I now make shoes and canvas', 
                    photourl: 'user/user2.png', 
                })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done(err);
                });
        });

    });
});