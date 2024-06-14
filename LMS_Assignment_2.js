// Importing required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
    // Handling different routes
    if (req.url === '/create') {
        // Creating a new file
        const filePath = path.join(__dirname, 'files', 'newfile.txt');
        fs.writeFile(filePath, 'Hello, this is a new file!', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error creating file');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File created successfully');
        });
    } else if (req.url === '/read') {
        // Reading a file
        const filePath = path.join(__dirname, 'files', 'newfile.txt');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else if (req.url === '/delete') {
        // Deleting a file
        const filePath = path.join(__dirname, 'files', 'newfile.txt');
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
        });
    } else {
        // Invalid route
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Invalid request');
    }
});

// Set the server to listen on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
