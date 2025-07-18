const request = require('supertest');
const app = require('../../src/index');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

let db;

beforeAll(async () => {
  db = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT || 5432,
  });
  // Nettoyage de la table avant les tests
  await db.query('DELETE FROM parcels');
});

afterAll(async () => {
  // Fermer la connexion à la DB après les tests
  await db.end();
});

describe('Parcels API CRUD', () => {
  let createdParcelId;

  it('should create a new parcel', async () => {
    const res = await request(app).post('/api/parcels').send({
      name: 'Parcelle Test',
      area_hectares: 1.5,
      crop_type: 'Blé',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Parcelle Test');
    createdParcelId = res.body.id;
  });

  it('should get the created parcel by ID', async () => {
    const res = await request(app).get(`/api/parcels/${createdParcelId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdParcelId);
  });

  it('should update the parcel', async () => {
    const res = await request(app).put(`/api/parcels/${createdParcelId}`).send({
      name: 'Parcelle Modifiée',
      area_hectares: 2.0,
      crop_type: 'Maïs',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Parcelle Modifiée');
  });

  it('should get all parcels', async () => {
    const res = await request(app).get('/api/parcels');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should delete the parcel', async () => {
    const res = await request(app).delete(`/api/parcels/${createdParcelId}`);
    expect(res.statusCode).toBe(204);
  });
});