// main.js
require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./db');  // Add this
const { initSocket } = require('./socket');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Connect to MongoDB Atlas
connectDB().then(() => {
  // Initialize Socket.IO after DB is connected
  const io = initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB, server not starting:", err);
});