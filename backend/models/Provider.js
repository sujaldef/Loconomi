// models/Provider.js
const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Bakery Delivery']
  },
  rating: { type: Number, required: true, min: 0, max: 5 },
  availability: {
    type: String,
    required: true,
    enum: ['Available', 'Busy']
  },
  image: { type: String, default: '/default.png' },
  wage: { type: Number, required: true, min: 0 },

  // Optional fixed location – defaults to [0, 0]
  fixedLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  }
}, { timestamps: true });

/**
 * Index only when coordinates are real (not [0,0] or missing)
 */
providerSchema.index(
  { fixedLocation: '2dsphere' },
  { partialFilterExpression: { 'fixedLocation.coordinates': { $exists: true, $ne: [0, 0] } } }
);

module.exports = mongoose.model('Provider', providerSchema);