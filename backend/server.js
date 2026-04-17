// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Allows your Next.js frontend to talk to this backend
app.use(express.json()); // Allows the server to understand JSON data

// A simple test route
app.get('/api/health', (req, res) => {
    res.json({ message: "The backend is alive and well!" });
});

// Define the port (use 5001 so it doesn't clash with macOS AirPlay receiver on 5000)
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});