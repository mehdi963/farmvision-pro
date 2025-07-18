const express = require('express');
const cors = require('cors');
const db = require('./db');
const usersRoutes = require('./routes/users');
const sensorsRoutes = require('./routes/sensors');
const alertsRoutes = require('./routes/alerts');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDoc = YAML.load('./swagger.yaml');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/sensors', sensorsRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

module.exports = app;