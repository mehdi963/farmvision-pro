const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('User Endpoints', () => {
  let userToken;

  beforeAll(async () => {
    // Créer un utilisateur de test
    const hashedPassword = await bcrypt.hash('testpassword', 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      ['testuser', 'test@example.com', hashedPassword]
    );
    const user = newUser.rows[0];
    userToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    // Supprimer l'utilisateur de test
    await pool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'newuser',
        email: 'new@example.com',
        password: 'password',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');

    // Supprimer l'utilisateur créé
    const token = res.body.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await pool.query('DELETE FROM users WHERE id = $1', [decoded.id]);
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should get user data with a valid token', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.user).toHaveProperty('id');
  });
});