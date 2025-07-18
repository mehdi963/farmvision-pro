const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateJWT = require('../middleware/authMiddleware');

router.get('/', authenticateJWT, async (req, res) => {
  try {
    const allParcelles = await pool.query('SELECT * FROM parcelles WHERE owner_id = $1', [req.user.id]);
    res.json(allParcelles.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { name, area, geometry } = req.body;
    const newParcelle = await pool.query(
      'INSERT INTO parcelles (owner_id, name, area, geometry) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, name, area, geometry]
    );
    res.status(201).json(newParcelle.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;