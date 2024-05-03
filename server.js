require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const connectDB = require('./lib/dbConnect');

const app = express();
const PORT = process.env.PORT || 3000;

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

// Apply the Auth0 configuration
app.use(auth(config));

// Serve static files
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Custom route to check if logged in, then serve static page
app.get('/', requiresAuth(), (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

// Start the server after connecting to the database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server failed to start:', error);
  }
};

startServer();
