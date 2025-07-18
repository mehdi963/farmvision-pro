const request = require('supertest');
const app = require('../../src/index');

describe('Health Check', () => {
  it('should return 200 OK from /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});