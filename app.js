const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// TODO: Add routers here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app; 