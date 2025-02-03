const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const BASE_DIR = path.resolve(__dirname, '../'); // Secure base directory

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const FILE_NAME = parsedUrl.pathname;//filename
    const fileName = path.basename(parsedUrl.pathname); 
    console.log(fileName);
   
    if (FILE_NAME === null) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`Error: File name is not found.`);
        return;
    }

    const FILE_PATH = path.join(BASE_DIR, fileName);
    console.log(FILE_NAME, FILE_PATH);


    if (!FILE_PATH.startsWith(BASE_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end("Access Denied: Invalid file request.");
        return;
    }

    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Error: File "${fileName}" not found.`);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        }
    })
});
module.exports = server;
