import User from '../models/User.js';
import Provider from '../models/Provider.js';

const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return { status: 'error', message: 'User not found', data: null };
    }
    return { status: 'success', message: 'User retrieved', data: user };
  } catch (error) {
    return { status: 'error', message: error.message, data: null };
  }
};

const getAllUsers = async (page = 1, limit = 20) => {
  try {
    const skip = (page - 1) * limit;
    const users = await User.find()
      .select('-password')
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
    const total = await User.countDocuments();

    return {
      status: 'success',
      message: 'All users',
      data: users,
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

const updateUser = async (id, data) => {
  try {
    // Don't allow password updates through this endpoint
    const { password, ...updateData } = data;

    const user = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    ).select('-password');

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
    return {
      status: 'success',
      message: 'User deleted successfully',
      data: null,
    };
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

    // Find nearby available providers (within 10km)
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
    })
      .select('-password')
      .limit(5)
      .sort({ rating: -1 });

    const waitTime = nearbyProviders.length > 0 ? 5 : 30; // minutes

    return {
      status: 'success',
      message:
        nearbyProviders.length > 0
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

export { getUserById, getAllUsers, updateUser, deleteUser, createRequest };
