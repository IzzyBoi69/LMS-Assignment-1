const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Entry', entrySchema);
const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

// Create a new entry
router.post('/', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    await entry.save();
    res.status(201).send(entry);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single entry by id
router.get('/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send();
    }
    res.status(200).send(entry);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an entry by id
router.patch('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!entry) {
      return res.status(404).send();
    }
    res.status(200).send(entry);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an entry by id
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).send();
    }
    res.status(200).send(entry);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const entryRoutes = require('./routes/entry');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(bodyParser.json());
app.use('/entries', entryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
