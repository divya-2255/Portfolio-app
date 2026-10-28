const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Profile = require('./models/Profile');
const Feedback = require('./models/Feedback');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB (make sure MongoDB is running on your computer)
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err.message));

// Get the saved profile (shown on About page and used to refill the form)
app.get('/api/profile', async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

// Save the profile from the Home page form (only one profile is kept)
app.post('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Feedback
app.get('/api/feedback', async (req, res) => {
  const list = await Feedback.find().sort({ createdAt: -1 });
  res.json(list);
});

app.post('/api/feedback', async (req, res) => {
  try {
    const item = await Feedback.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Open http://localhost:3000'));
