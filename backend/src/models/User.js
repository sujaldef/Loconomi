import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  userType: { type: String, enum: ['user', 'provider'], default: 'user' },
  phone: { type: String },
  profileImage: { type: String },

  // User profile fields
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },

  // Location tracking
  fixedLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  locations: [
    {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
      timestamp: { type: Date, default: Date.now },
    },
  ],

  // Account status
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Indexes for geospatial queries
userSchema.index(
  { fixedLocation: '2dsphere' },
  {
    partialFilterExpression: {
      'fixedLocation.coordinates': { $exists: true, $ne: [0, 0] },
    },
  },
);

userSchema.index(
  { 'locations.coordinates': '2dsphere' },
  { partialFilterExpression: { 'locations.coordinates': { $exists: true } } },
);

userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ userType: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
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
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Remove password from JSON response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', userSchema);
