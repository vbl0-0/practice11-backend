const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

let products;

async function start() {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    const db = client.db();
    products = db.collection('products');

    console.log('MongoDB connected');

    app.get('/', (req, res) => {
      res.json({ message: 'API is running' });
    });

    app.get('/api/products', async (req, res) => {
      const data = await products.find().toArray();
      res.json(data);
    });

    app.get('/api/products/:id', async (req, res) => {
      try {
        const product = await products.findOne({
          _id: new ObjectId(req.params.id)
        });
        if (!product) return res.status(404).json({ error: 'Not found' });
        res.json(product);
      } catch {
        res.status(400).json({ error: 'Invalid ID' });
      }
    });

    app.post('/api/products', async (req, res) => {
      const result = await products.insertOne(req.body);
      res.json(result);
    });

    app.put('/api/products/:id', async (req, res) => {
      const result = await products.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    });

    app.delete('/api/products/:id', async (req, res) => {
      const result = await products.deleteOne({
        _id: new ObjectId(req.params.id)
      });
      res.json(result);
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Startup error:', err);
  }
}

start();
