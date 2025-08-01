const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fixedLocation: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  locations: [{
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    timestamp: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

userSchema.index({ fixedLocation: '2dsphere', 'locations.coordinates': '2dsphere' });
module.exports = mongoose.model('User', userSchema);