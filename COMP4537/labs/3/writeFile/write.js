class WriteFileHandler {
    constructor(baseDir) {
        console.log("WriteFileHandler initialized."); // For debugging

        // Modules
        this.fs = require('fs');
        this.path = require('path');
        this.url = require('url');

        this.baseDir = this.path.resolve(__dirname, baseDir); // Secure base directory

        // 🔍 Handle requests
        this.handleRequest = (req, res) => {
            const parsedUrl = this.url.parse(req.url, true);
            const query = parsedUrl.query;

            // Extract filename from URL
            const pathParts = parsedUrl.pathname.split('/');
            const fileName = pathParts[pathParts.length - 1] || 'file.txt';

            // Construct secure file path
            const filePath = this.path.join(this.baseDir, fileName);
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
        this.appendToFile = (filePath, text, res) => {
            this.fs.appendFile(filePath, text + '\n', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end("Error writing to file.");
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(`Text "${text}" appended to ${this.path.basename(filePath)}`);
                }
            });
        };
    }
}

module.exports = new WriteFileHandler('../../');
