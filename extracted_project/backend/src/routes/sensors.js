const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  const { name, type, location } = req.body;
  const result = await db.query(
    'INSERT INTO sensors (id, name, type, location) VALUES ($1, $2, $3, $4) RETURNING *',
    [uuidv4(), name, type, location]
  );
  res.status(201).json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM sensors');
  res.json(result.rows);
});

module.exports = router;