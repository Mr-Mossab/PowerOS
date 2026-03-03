// Simple HTTP Server for PowerOS FUI
// Run with: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Route requests
    let filePath = req.url === '/' ? '/fui/welcome.html' : req.url;
    filePath = path.join(__dirname, filePath);

    // Security: prevent directory traversal
    if (!filePath.startsWith(path.join(__dirname))) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Try index.html for directories
            if (err.code === 'EISDIR') {
                filePath = path.join(filePath, 'index.html');
                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Not Found');
                    } else {
                        const ext = path.extname(filePath);
                        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
                        res.end(data);
                    }
                });
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        } else {
            const ext = path.extname(filePath);
            res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║     PowerOS FUI Server Running          ║
╚════════════════════════════════════════╝

  🖥️ Open your browser and go to:
     http://localhost:${PORT}

  GUI: http://localhost:${PORT}/fui/index.html
  Welcome: http://localhost:${PORT}/fui/welcome.html

  Press Ctrl+C to stop the server
    `);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try port ${PORT + 1}`);
        process.exit(1);
    }
});

