const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  const { name, area_hectares, crop_type } = req.body;
  const id = uuidv4();
  const result = await db.query(
    'INSERT INTO parcels (id, name, area_hectares, crop_type) VALUES ($1, $2, $3, $4) RETURNING *',
    [id, name, area_hectares, crop_type]
  );
  res.status(201).json(result.rows[0]);
});

router.get('/:id', async (req, res) => {
  const result = await db.query('SELECT * FROM parcels WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).send();
  res.json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM parcels');
  res.json(result.rows);
});

router.put('/:id', async (req, res) => {
  const { name, area_hectares, crop_type } = req.body;
  const result = await db.query(
    'UPDATE parcels SET name = $1, area_hectares = $2, crop_type = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
    [name, area_hectares, crop_type, req.params.id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM parcels WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

module.exports = router;