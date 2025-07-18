const request = require('supertest');
const app = require('../../src/index'); // Assurez-vous que l'application est exportée depuis index.js
const pool = require('../../src/db'); // Importez votre configuration de DB pour nettoyer les données

describe('Authentication Tests', () => {
  beforeAll(async () => {
    // Nettoyage de la table users avant le test
    await pool.query('DELETE FROM users');
  });

  afterAll(async () => {
    // Fermer la connexion à la DB après les tests
    await pool.end();
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token'); // Vérifie que le token JWT est retourné
  });

  it('should login successfully with valid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // Vérifie que le token JWT est retourné
  });

  it('should fail to login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(400); // Vérifie que le statut 400 est retourné
    expect(res.body).toHaveProperty('message', 'Invalid credentials'); // Vérifie le message d'erreur
  });
});