class ReadFileHandler {
    constructor(baseDir) {
        console.log("ReadFileHandler initialized."); // Debugging

        // Modules
        this.fs = require('fs');
        this.path = require('path');
        this.url = require('url');

        this.baseDir = this.path.resolve(__dirname, baseDir); // Secure base directory
    }

    // Handles incoming requests to read a file
    handleRequest = (req, res) => {
        const parsedUrl = this.url.parse(req.url, true); 

        // Extract filename dynamically from the request path
        const pathParts = parsedUrl.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];

        // Ensure filename is valid
        if (!fileName || fileName === 'readFile') {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("Error: No file name provided.");
            return;
        }

        const filePath = this.path.join(this.baseDir, fileName); 
        console.log(`Reading from: ${filePath}`);

        // Prevent directory traversal attacks
        if (!filePath.startsWith(this.baseDir)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end("Access Denied: Invalid file request.");
            return;
        }

        // Read the specified file
        this.fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`Error: File "${fileName}" not found.`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    };
}

module.exports = new ReadFileHandler('../');
