// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Define the port the server will listen on
const port = 3000;

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

// Route for the about page
app.get('/about', (req, res) => {
    res.send('This is the about page!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
