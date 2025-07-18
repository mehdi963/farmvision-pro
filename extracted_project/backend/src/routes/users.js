const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email, passwordHash]
  );
  res.status(201).json(result.rows[0]);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length === 0) return res.status(401).send('Invalid credentials');

  const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
  if (!validPassword) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;