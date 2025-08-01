// main.js
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize WebSocket/socket.io with the server
const io = initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
