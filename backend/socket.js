const socketIo = require('socket.io');
const providerService = require('./services/providerService');

const initSocket = (server) => {
  const io = socketIo(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('providerLocationUpdate', async (data) => {
      const { providerId, longitude, latitude } = data;
      await providerService.updateProviderLocation(providerId, longitude, latitude);
    });

    socket.on('userLocationUpdate', async (data) => {
      const { userId, longitude, latitude } = data;
      const User = require('./models/User');
      await User.findByIdAndUpdate(userId, {
        $push: {
          locations: {
            type: 'Point',
            coordinates: [longitude, latitude],
            timestamp: new Date()
          }
        }
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = { initSocket };