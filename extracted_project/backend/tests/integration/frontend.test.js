const axios = require('axios');

describe('Frontend Check', () => {
  it('should respond with index.html', async () => {
    const res = await axios.get('http://localhost');
    expect(res.status).toBe(200);
    expect(res.data).toMatch(/<!DOCTYPE html>/);
  });
});