const { ObjectId } = require('mongodb');
const connectDB = require('../db/mongo');

async function getCollection() {
  const db = await connectDB();
  return db.collection('items');
}

// GET /api/items
exports.getAll = async (req, res) => {
  try {
    const items = await (await getCollection()).find().toArray();
    res.status(200).json(items);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/items/:id
exports.getById = async (req, res) => {
  try {
    const item = await (await getCollection()).findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};

// POST /api/items
exports.create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await (await getCollection()).insertOne(req.body);
    res.status(201).json(result);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/items/:id (full update)
exports.updateFull = async (req, res) => {
  try {
    const result = await (await getCollection()).replaceOne(
      { _id: new ObjectId(req.params.id) },
      req.body
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ updated: true });
  } catch {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// PATCH /api/items/:id (partial update)
exports.updatePartial = async (req, res) => {
  try {
    const result = await (await getCollection()).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ updated: true });
  } catch {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// DELETE /api/items/:id
exports.remove = async (req, res) => {
  try {
    const result = await (await getCollection()).deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(204).send();
  } catch {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
