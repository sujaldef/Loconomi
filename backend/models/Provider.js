const mongoose = require('mongoose');
const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true, enum: ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Bakery Delivery'] },
  rating: { type: Number, required: true, min: 0, max: 5 },
  availability: { type: String, required: true, enum: ['Available', 'Busy'] },
  image: { type: String, default: '/default.png' },
  wage: { type: Number, required: true, min: 0 },
  fixedLocation: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
}, { timestamps: true });

providerSchema.index({ fixedLocation: '2dsphere' });
module.exports = mongoose.model('Provider', providerSchema);