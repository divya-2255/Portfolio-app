const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  title:     { type: String, required: true, trim: true },
  tagline:   { type: String, trim: true },
  summary:   { type: String, required: true, trim: true },
  education: { type: String, trim: true },
  skills:    [String],
  languages: [String],
  interests: [String],
  projects:  [String],
  certificate: { type: String, trim: true },
  email:     { type: String, required: true, trim: true },
  linkedin:  { type: String, trim: true },
});

module.exports = mongoose.model('Profile', profileSchema);
