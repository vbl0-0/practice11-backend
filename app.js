const express = require('express');
require('dotenv').config();

const itemsRoutes = require('./routes/items.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/items', itemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
