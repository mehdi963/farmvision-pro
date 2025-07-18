const jwt = require('jsonwebtoken');

describe('JWT Tests', () => {
  it('should sign and verify a token', () => {
    const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.userId).toBe(1);
  });
});