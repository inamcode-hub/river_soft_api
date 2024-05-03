require('dotenv').config();
const express = require('express');
const connectDB = require('./lib/dbConnect');
const authMiddleware = require('./middleware/auth0');
const protectRoute = require('./middleware/protectRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Apply the Auth0 configuration middleware
app.use(authMiddleware);

// Serve static files
app.use(express.static('public'));

// Middleware
app.use(express.json());

// Custom route to check if logged in, then serve static page
app.get('/', protectRoute(), (req, res) => {
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
