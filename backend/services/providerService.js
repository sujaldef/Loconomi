const Provider = require('../models/Provider');
const redis = require('redis');
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });

(async () => {
  await redisClient.connect();
})();

const createProvider = async (data) => {
  try {
    const provider = new Provider(data);
    const savedProvider = await provider.save();
    // Add fixed location to Redis
    if (data.fixedLocation) {
      await redisClient.geoAdd('providers', {
        longitude: data.fixedLocation.coordinates[0],
        latitude: data.fixedLocation.coordinates[1],
        member: savedProvider._id.toString()
      });
    }
    return {
      status: 'success',
      message: 'Provider created successfully',
      data: savedProvider,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const getProviderById = async (id) => {
  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      return {
        status: 'error',
        message: 'Provider not found',
        data: null,
      };
    }
    return {
      status: 'success',
      message: 'Provider retrieved successfully',
      data: provider,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const getAllProviders = async () => {
  try {
    const providers = await Provider.find();
    return {
      status: 'success',
      message: 'Providers retrieved successfully',
      data: providers,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const updateProvider = async (id, data) => {
  try {
    const provider = await Provider.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!provider) {
      return {
        status: 'error',
        message: 'Provider not found',
        data: null,
      };
    }
    // Update fixed location in Redis if provided
    if (data.fixedLocation) {
      await redisClient.geoAdd('providers', {
        longitude: data.fixedLocation.coordinates[0],
        latitude: data.fixedLocation.coordinates[1],
        member: id
      });
    }
    return {
      status: 'success',
      message: 'Provider updated successfully',
      data: provider,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const deleteProvider = async (id) => {
  try {
    const provider = await Provider.findByIdAndDelete(id);
    if (!provider) {
      return {
        status: 'error',
        message: 'Provider not found',
        data: null,
      };
    }
    // Remove from Redis
    await redisClient.zRem('providers', id);
    return {
      status: 'success',
      message: 'Provider deleted successfully',
      data: provider,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
      data: null,
    };
  }
};

const updateProviderLocation = async (providerId, longitude, latitude) => {
  try {
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return { status: 'error', message: 'Provider not found' };
    }
    // Update dynamic location in Redis
    await redisClient.geoAdd('providers', { longitude, latitude, member: providerId });
    await redisClient.set(`provider:${providerId}:availability`, provider.availability);
    return { status: 'success', message: 'Location updated' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = { createProvider, getProviderById, getAllProviders, updateProvider, deleteProvider, updateProviderLocation };