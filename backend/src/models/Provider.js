import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const providerSchema = new mongoose.Schema({
  // Reference to User model (optional - providers are independent accounts)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    sparse: true,
  },

  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  phone: { type: String },
  profileImage: { type: String },

  // Provider-specific fields
  role: {
    type: String,
    required: true,
    enum: ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Bakery Delivery'],
  },
  wage: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },

  availability: {
    type: String,
    required: true,
    enum: ['Available', 'Busy'],
    default: 'Available',
  },

  // Location
  fixedLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },

  // Service area in kilometers
  serviceRadius: { type: Number, default: 10 },

  description: { type: String },
  experience: { type: String },

  // Account status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Geospatial index
providerSchema.index(
  { fixedLocation: '2dsphere' },
  {
    partialFilterExpression: {
      'fixedLocation.coordinates': { $exists: true, $ne: [0, 0] },
    },
  },
);

// Query indexes
providerSchema.index({ role: 1, availability: 1 });
providerSchema.index({ email: 1 }, { unique: true, sparse: true });
providerSchema.index({ rating: -1 });

// Hash password before saving
providerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
providerSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Remove password from JSON
providerSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('Provider', providerSchema);
