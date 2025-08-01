const User = require('../models/User');
const Provider = require('../models/Provider');
const redis = require('redis');
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });
const mongoose = require('mongoose');

(async () => {
  await redisClient.connect();
})();

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
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return {
        status: 'error',
        message: 'User not found',
        data: null,
      };
    }
    return {
      status: 'success',
      message: 'User retrieved successfully',
      data: user,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!user) {
      return {
        status: 'error',
        message: 'User not found',
        data: null,
      };
    }
    return {
      status: 'success',
      message: 'User updated successfully',
      data: user,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return {
        status: 'error',
        message: 'User not found',
        data: null,
      };
    }
    return {
      status: 'success',
      message: 'User deleted successfully',
      data: user,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

 const createRequest = async (userId, serviceType, userLocation) => {
  try {
    const results = await redisClient.geoSearch(
      'providers',
      {
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      },
      {
        radius: 1000000000000000000000000000000000000000000000000000000000000000000000000000000000,
        unit: 'm',
        WITHDIST: true,
        SORT: 'ASC',
      }
    );

    let nearbyProviders = [];

    if (results.length > 0) {
      nearbyProviders = await Promise.all(
        results.map(async ([providerId, distance]) => {
          // Check if providerId is a valid ObjectId
          if (!mongoose.Types.ObjectId.isValid(providerId)) {
            return null; // skip invalid ids
          }

          const provider = await Provider.findById(providerId);
          if (
            provider &&
            provider.availability === 'Available' &&
            provider.role === serviceType
          ) {
            return { ...provider._doc, distance: parseFloat(distance) };
          }
          return null;
        })
      );

      nearbyProviders = nearbyProviders.filter(p => p !== null);
    }

    let waitTime = null;
    if (nearbyProviders.length === 0) {
      const providerKeys = await redisClient.keys('provider:*:availability');
      const availabilities = await Promise.all(
        providerKeys.map(key => redisClient.get(key))
      );
      const availableCount = availabilities.filter(a => a === 'Available').length;
      waitTime = availableCount > 0 ? 5 : 30;
    }

    return {
      status: 'success',
      message: nearbyProviders.length > 0 ? 'Providers found' : 'No providers found nearby',
      data: {
        providers: nearbyProviders,
        waitTime,
      },
    };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};


module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser, createRequest };