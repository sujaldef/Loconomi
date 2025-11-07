// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());



// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/providers', require('./routes/providerRoutes'));

module.exports = app;
