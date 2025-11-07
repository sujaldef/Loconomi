// services/providerService.js
const Provider = require('../models/Provider');

const createProvider = async (data) => {
  try {
    const provider = new Provider(data);
    const savedProvider = await provider.save();
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
      return { status: 'error', message: 'Provider not found', data: null };
    }
    return { status: 'success', message: 'Provider retrieved', data: provider };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const getAllProviders = async () => {
  try {
    const providers = await Provider.find();
    return { status: 'success', message: 'All providers', data: providers };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const updateProvider = async (id, data) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    if (!provider) {
      return { status: 'error', message: 'Provider not found', data: null };
    }
    return { status: 'success', message: 'Provider updated', data: provider };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const deleteProvider = async (id) => {
  try {
    const provider = await Provider.findByIdAndDelete(id);
    if (!provider) {
      return { status: 'error', message: 'Provider not found', data: null };
    }
    return { status: 'success', message: 'Provider deleted', data: provider };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

// Update provider's live location (used by Socket.IO)
const updateProviderLocation = async (providerId, longitude, latitude) => {
  try {
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return { status: 'error', message: 'Provider not found' };
    }

    provider.fixedLocation = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };
    await provider.save();

    return { status: 'success', message: 'Location updated' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

module.exports = {
  createProvider,
  getProviderById,
  getAllProviders,
  updateProvider,
  deleteProvider,
  updateProviderLocation,
};