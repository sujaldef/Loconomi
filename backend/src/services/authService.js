import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Provider from '../models/Provider.js';

const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const userSignup = async (data) => {
  try {
    const { name, email, password, userType } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        status: 'error',
        message: 'Email already registered',
        data: null,
      };
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      userType: userType || 'user',
    });

    const savedUser = await user.save();
    const token = generateToken(savedUser._id, savedUser.userType);

    return {
      status: 'success',
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          userType: savedUser.userType,
        },
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      status: 'error',
      message: error.message || 'Signup failed',
      data: null,
    };
  }
};

const userLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      };
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return {
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      };
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id, user.userType);

    return {
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      status: 'error',
      message: 'Login failed',
      data: null,
    };
  }
};

const providerSignup = async (data) => {
  try {
    const { name, email, password, role, wage, phone } = data;

    // Check if provider already exists
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return {
        status: 'error',
        message: 'Email already registered as provider',
        data: null,
      };
    }

    // Create provider
    const provider = new Provider({
      name,
      email,
      password,
      role,
      wage,
      phone,
      availability: 'Available',
    });

    const savedProvider = await provider.save();
    const token = generateToken(savedProvider._id, 'provider');

    return {
      status: 'success',
      message: 'Provider registered successfully',
      data: {
        token,
        user: {
          id: savedProvider._id,
          name: savedProvider.name,
          email: savedProvider.email,
          userType: 'provider',
          role: savedProvider.role,
          wage: savedProvider.wage,
        },
      },
    };
  } catch (error) {
    console.error('Provider signup error:', error);
    return {
      status: 'error',
      message: error.message || 'Provider signup failed',
      data: null,
    };
  }
};

const providerLogin = async (email, password) => {
  try {
    const provider = await Provider.findOne({ email });
    if (!provider) {
      return {
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      };
    }

    const isPasswordValid = await provider.comparePassword(password);
    if (!isPasswordValid) {
      return {
        status: 'error',
        message: 'Invalid email or password',
        data: null,
      };
    }

    const token = generateToken(provider._id, 'provider');

    return {
      status: 'success',
      message: 'Login successful',
      data: {
        token,
        user: {
          id: provider._id,
          name: provider.name,
          email: provider.email,
          userType: 'provider',
          role: provider.role,
          rating: provider.rating,
        },
      },
    };
  } catch (error) {
    console.error('Provider login error:', error);
    return {
      status: 'error',
      message: 'Login failed',
      data: null,
    };
  }
};

export { userSignup, userLogin, providerSignup, providerLogin };
