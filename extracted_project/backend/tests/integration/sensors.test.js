const request = require('supertest');
const app = require('../../src/index');

describe('Sensors API CRUD', () => {
  let sensorId;

  it('should create a sensor', async () => {
    const res = await request(app).post('/api/sensors').send({
      name: 'Soil Sensor',
      type: 'soil-moisture',
      location: 'Farm A'
    });
    expect(res.statusCode).toBe(201);
    sensorId = res.body.id;
  });

  it('should delete the sensor', async () => {
    const res = await request(app).delete(`/api/sensors/${sensorId}`);
    expect(res.statusCode).toBe(204);
  });
});