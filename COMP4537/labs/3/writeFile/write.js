const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const BASE_DIR = path.resolve(__dirname, '../'); // Secure base directory
const DEFAULT_FILE_NAME = 'file.txt'; // Default file name
const filePath = path.join(BASE_DIR, DEFAULT_FILE_NAME); 

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    console.log(`Writing to: ${filePath}`);

    if (!query.text) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: No text provided.');
        return;
    }

    fs.appendFile(filePath, query.text + ' \n', (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error writing to file.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Text "${query.text}" appended to ${DEFAULT_FILE_NAME}`);
        }
    });
});

module.exports = server;
