const url = require('url');
const fs = require('fs');
const path = require('path');

class WriteFileHandler {
    constructor(baseDir) {
        this.baseDir = path.resolve(__dirname, baseDir); // Secure base directory
    }

    // 🔍 Handle requests
    handleRequest = (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const query = parsedUrl.query;

        // Extract filename from URL 
        const pathParts = parsedUrl.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1] || 'file.txt'; // Default to file.txt if no file is provided

        // Construct secure file path
        const filePath = path.join(this.baseDir, fileName);
        console.log(`Writing to: ${filePath}`);

        // Prevent directory traversal attacks
        if (!filePath.startsWith(this.baseDir)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end("Access Denied: Invalid file request.");
            return;
        }

        // Ensure text query parameter is provided
        if (!query.text) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("Error: No text provided.");
            return;
        }

        // Append text to the file
        this.appendToFile(filePath, query.text, res);
    };

    // Append text to a file
    appendToFile = (filePath, text, res) => {
        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error writing to file.");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Text "${text}" appended to ${path.basename(filePath)}`);
            }
        });
    };
}


module.exports = new WriteFileHandler('../../');
