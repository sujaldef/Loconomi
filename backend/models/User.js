// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Optional fixed location – defaults to [0, 0] if not provided
  fixedLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },

  // Optional tracking of past locations
  locations: [{
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

/**
 * Indexes:
 *  - fixedLocation: only index if coordinates exist
 *  - locations.coordinates: for $near queries on history
 */
userSchema.index(
  { fixedLocation: '2dsphere' },
  { partialFilterExpression: { 'fixedLocation.coordinates': { $exists: true, $ne: [0, 0] } } }
);

userSchema.index(
  { 'locations.coordinates': '2dsphere' },
  { partialFilterExpression: { 'locations.coordinates': { $exists: true } } }
);

module.exports = mongoose.model('User', userSchema);