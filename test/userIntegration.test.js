import assert from 'assert';
import request from 'supertest';
import App from '../App.js';
import DbContext from '../DataContext/DbContext.js';
import User from '../Models/user.js';

describe('/v1/user Integration Tests', function () {
  let authHeader;
  const userData = {
    first_name: "firstname",
    last_name: "lastname",
    password: 'password@123',
    username: 'testuser@webapp.com'
  };

  before(async () => {
    // DATABASE SYNCHNORIZATION
    try {
        await DbContext.sync();
      } catch (error) {
        console.error('Error synchronizing database: Check database connectivity');
        process.exit(1);
      }
  });
  
  it('Test 1 - Create an account, and using the GET call, validate account exists', async function () {
    // CREATE ACCOUNT
    const postResponse = await request(App) 
      .post('/v1/user')
      .send(userData);

    assert.strictEqual(postResponse.status, 201);
    assert.strictEqual(postResponse.body.username, userData.username);

    // GET AUTH HEADER
    const credentials = Buffer.from(`${userData.username}:${userData.password}`).toString('base64');
    authHeader = `Basic ${credentials}`;

    // VALIDATE WITH GET CALL
    const getResponse = await request(App)
      .get('/v1/user/self')
      .set('Authorization', authHeader);

    assert.strictEqual(getResponse.status, 200);
    assert.strictEqual(getResponse.body.username, userData.username);
  });

  it('Test 2 - Update the account and using the GET call, validate the account was updated', async function () {

    // ACCOUNT UPDATE
    const updatedUserData = {
      first_name: 'UpdatedFirstName',
      last_name: 'UpdatedLastName'
    };

    const updateResponse = await request(App)
      .put('/v1/user/self')
      .set('Authorization', authHeader)
      .send(updatedUserData);

    assert.strictEqual(updateResponse.status, 204);

    // VALIDATE WITH GET CALL 
    const getResponse = await request(App) 
      .get('/v1/user/self')
      .set('Authorization', authHeader);

    assert.strictEqual(getResponse.status, 200);
    assert.strictEqual(getResponse.body.first_name, updatedUserData.first_name);
    assert.strictEqual(getResponse.body.last_name, updatedUserData.last_name);
  });

  after(async () => {
    try {
      await User.destroy({
        where: { username: userData.username }
      });
      console.log('Test user deleted successfully.');
    } catch (error) {
      console.error('Failed to delete test user:', error);
    }

    // CLOSE CONNECTION
    try {
      await DbContext.close();
      console.log('Database connection closed successfully.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  });
});
