const axios = require('axios');

test('Frontend should respond with index.html', async () => {
  const res = await axios.get('http://localhost:3000');
  expect(res.status).toBe(200);
  expect(res.data).toMatch(/<!DOCTYPE html>/);
});