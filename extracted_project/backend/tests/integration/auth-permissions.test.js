const request = require('supertest');
const app = require('../../src/index');

describe('Auth & Permissions Tests', () => {
  it('should reject login with wrong credentials', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'wrong@farm.com',
      password: 'wrongpass'
    });
    expect(res.statusCode).toBe(401);
  });

  it('should block access to profile without a token', async () => {
    const res = await request(app).get('/api/users/profile');
    expect(res.statusCode).toBe(401);
  });
});