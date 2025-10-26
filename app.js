const express = require('express');
require('dotenv').config();

const itemsRoutes = require('./routes/items.routes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// root
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// version (Practice 12)
app.get('/version', (req, res) => {
  res.json({
    version: '1.1',
    updatedAt: '2026-01-22'
  });
});

// REST API (Practice 13)
app.use('/api/items', itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
