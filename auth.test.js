const chai = require('chai');
const expect = chai.expect;         
const request = require('supertest');
const app = require('../index');    
const mongoose = require('mongoose');

// Wrap all tests inside describe
describe('Auth API Tests', function() {
  this.timeout(10000); // give MongoDB extra time if needed

  // Runs before all tests
  before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_TEST_URI || process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
});


  // Runs after all tests
  after(async () => {
    // Close DB connection
    await mongoose.connection.close();
  });


  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const res = await request(app)       // supertest sends request to app
        .post('/auth/signup')                   // hit signup route
        .send({
          name: 'Ahmad yk',
          email: 'ahmad144@gmail.com',
          password: 'Momina12344.'
        });

      // Assert response
      expect(res.status).to.equal(201);    // status should be 201
      expect(res.body).to.have.property('success', true);
    });

    it('should not allow duplicate email', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          name: 'Test User',
          email: 'mirha123@gmail.com',
          password: 'password123'
        });

      expect(res.status).to.equal(409);
      expect(res.body).to.have.property('success', false);
    });
  });

  describe('POST /auth/login', () => {
    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('success', true);
    });

    it('should fail login with wrong password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'haya@gmail.com',
          password: 'haya144000.'
        });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('success', false);
    });
  });
});
