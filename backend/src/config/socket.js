import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import * as providerService from '../services/providerService.js';
import User from '../models/User.js';

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
      allowedHeaders: ['authorization'],
    },
    transports: ['websocket', 'polling'],
  });

  // Socket authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error('Authentication token required'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.userType = decoded.userType;
      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id} (User: ${socket.userId})`);

    // Provider location update
    socket.on('providerLocationUpdate', async (data) => {
      try {
        const { longitude, latitude } = data;

        if (typeof longitude !== 'number' || typeof latitude !== 'number') {
          return socket.emit('error', 'Invalid coordinates');
        }

        const result = await providerService.updateProviderLocation(
          socket.userId,
          longitude,
          latitude,
        );

        if (result.status === 'success') {
          socket.emit('locationUpdated', { success: true });
          // Broadcast provider location to users
          io.emit('providerLocationUpdated', {
            providerId: socket.userId,
            location: { longitude, latitude },
          });
        }
      } catch (error) {
        console.error('Provider location update error:', error);
        socket.emit('error', 'Failed to update location');
      }
    });

    // User location update
    socket.on('userLocationUpdate', async (data) => {
      try {
        const { longitude, latitude } = data;

        if (typeof longitude !== 'number' || typeof latitude !== 'number') {
          return socket.emit('error', 'Invalid coordinates');
        }

        const user = await User.findByIdAndUpdate(
          socket.userId,
          {
            $push: {
              locations: {
                type: 'Point',
                coordinates: [longitude, latitude],
                timestamp: new Date(),
              },
            },
            fixedLocation: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
          },
          { new: true },
        );

        if (user) {
          socket.emit('locationUpdated', { success: true });
        }
      } catch (error) {
        console.error('User location update error:', error);
        socket.emit('error', 'Failed to update location');
      }
    });

    // Request service
    socket.on('requestService', async (data) => {
      try {
        const { serviceType, location } = data;
        socket.emit('serviceRequested', {
          success: true,
          message: 'Service request received',
        });
      } catch (error) {
        console.error('Service request error:', error);
        socket.emit('error', 'Failed to request service');
      }
    });

    // Typing indicator
    socket.on('typing', (data) => {
      socket.broadcast.emit('userTyping', {
        userId: socket.userId,
        typing: data.typing,
      });
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Error handler
    socket.on('error', (error) => {
      console.error(`Socket error for ${socket.id}:`, error);
    });
  });

  return io;
};

export { initSocket };
