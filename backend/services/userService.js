// services/userService.js
const User = require('../models/User');
const Provider = require('../models/Provider');

const createUser = async (data) => {
  try {
    const user = new User(data);
    const savedUser = await user.save();
    return {
      status: 'success',
      message: 'User created successfully',
      data: savedUser,
    };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return { status: 'error', message: 'User not found', data: null };
    }
    return { status: 'success', message: 'User retrieved', data: user };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return { status: 'success', message: 'All users', data: users };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    if (!user) {
      return { status: 'error', message: 'User not found', data: null };
    }
    return { status: 'success', message: 'User updated', data: user };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return { status: 'error', message: 'User not found', data: null };
    }
    return { status: 'success', message: 'User deleted', data: user };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

// User requests a service → find nearby available providers
const createRequest = async (userId, serviceType, userLocation) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 'error', message: 'User not found', data: null };
    }

    // Save user's current location
    user.locations.push({
      type: 'Point',
      coordinates: [userLocation.longitude, userLocation.latitude],
      timestamp: new Date(),
    });
    await user.save();

    // Find nearby available providers
    const nearbyProviders = await Provider.find({
      role: serviceType,
      availability: 'Available',
      fixedLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [userLocation.longitude, userLocation.latitude],
          },
          $maxDistance: 10000, // 10 km
        },
      },
    }).limit(5);

    const waitTime = nearbyProviders.length > 0 ? 5 : 30; // minutes

    return {
      status: 'success',
      message: nearbyProviders.length > 0
        ? `${nearbyProviders.length} provider(s) found nearby`
        : 'No providers nearby, estimated wait: 30 mins',
      data: {
        providers: nearbyProviders,
        waitTime,
        userLocation: {
          type: 'Point',
          coordinates: [userLocation.longitude, userLocation.latitude],
        },
      },
    };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  createRequest,
};