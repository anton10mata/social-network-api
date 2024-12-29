const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('debug', true); // Enable mongoose debugging

// Start the Server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
