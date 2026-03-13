import dotenv from 'dotenv';
import http from 'http';
import app from './src/app.js';
import connectDB from './src/config/db.js';
import { initSocket } from './src/config/socket.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);
if (missingVars.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingVars.join(', ')}`,
  );
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.IO
const io = initSocket(server);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`
╔╦╗  ╓──────────────────────────────────────╖
║║║  ║  🚀 Loconomi Server Started          ║
║║║  ║  ✅ Server running on port ${PORT}        ║
║║║  ║  ✅ MongoDB connected                  ║
║║║  ║  ✅ Socket.IO initialized              ║
║║║  ╙──────────────────────────────────────╜
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️  Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Promise Rejection:', error);
  process.exit(1);
});

startServer();
