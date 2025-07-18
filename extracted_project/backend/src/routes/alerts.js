const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { sensorId, type, message } = req.body;
  const result = await db.query(
    'INSERT INTO alerts (sensor_id, type, message) VALUES ($1, $2, $3) RETURNING *',
    [sensorId, type, message]
  );
  res.status(201).json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM alerts');
  res.json(result.rows);
});

module.exports = router;