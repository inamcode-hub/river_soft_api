// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./lib/dbConnect');
const sampleRoute = require('./routes/sampleRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', sampleRoute);

// Start the server after connecting to the database
const startServer = async () => {
    try {
      await connectDB(); // Wait for the database connection
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Server failed to start:', error);
    }
  };
  
  // Call the startServer function to start the server
  startServer();