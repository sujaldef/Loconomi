import Provider from '../models/Provider.js';

const getProviderById = async (id) => {
  try {
    const provider = await Provider.findById(id).select('-password');
    if (!provider) {
      return { status: 'error', message: 'Provider not found', data: null };
    }
    return { status: 'success', message: 'Provider retrieved', data: provider };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const getAllProviders = async (page = 1, limit = 20, filters = {}) => {
  try {
    const skip = (page - 1) * limit;
    const query = {};

    // Apply filters
    if (filters.role) query.role = filters.role;
    if (filters.availability) query.availability = filters.availability;
    if (filters.minRating) query.rating = { $gte: filters.minRating };

    const providers = await Provider.find(query)
      .select('-password')
      .limit(limit)
      .skip(skip)
      .sort({ rating: -1, createdAt: -1 });

    const total = await Provider.countDocuments(query);

    return {
      status: 'success',
      message: 'All providers',
      data: providers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const getProvidersByRole = async (role, page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;
    const providers = await Provider.find({ role, isActive: true })
      .select('-password')
      .limit(limit)
      .skip(skip)
      .sort({ rating: -1 });

    const total = await Provider.countDocuments({ role, isActive: true });

    return {
      status: 'success',
      message: `${role} providers`,
      data: providers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const updateProvider = async (id, data) => {
  try {
    const { password, ...updateData } = data;

    const provider = await Provider.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    ).select('-password');

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
    return {
      status: 'success',
      message: 'Provider deleted successfully',
      data: null,
    };
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
    provider.updatedAt = new Date();
    await provider.save();

    return { status: 'success', message: 'Location updated', data: provider };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Update provider availability
const updateAvailability = async (providerId, availability) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      providerId,
      { availability, updatedAt: new Date() },
      { new: true },
    ).select('-password');

    if (!provider) {
      return { status: 'error', message: 'Provider not found' };
    }

    return {
      status: 'success',
      message: 'Availability updated',
      data: provider,
    };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

export {
  getProviderById,
  getAllProviders,
  getProvidersByRole,
  updateProvider,
  deleteProvider,
  updateProviderLocation,
  updateAvailability,
};
