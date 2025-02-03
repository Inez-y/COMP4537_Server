class ReadFileHandler {
    constructor(baseDir) {
        console.log("ReadFileHandler initialized."); // Debugging

        // Modules
        this.fs = require('fs');
        this.path = require('path');
        this.url = require('url');
        this.messages = require('../../../../lang/en.js');

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
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(this.messages.getMessage("notfound") || "404 Not Found");
            return;
        }

        const filePath = this.path.join(this.baseDir, fileName); 
        console.log(`Reading from: ${filePath}`);

        if (!filePath.startsWith(this.baseDir)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end(this.messages.getMessage("nocontent") || "Access Denied: Invalid file request.");
            return;
        }

        // Read the specified file
        this.fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("Your file is..." + this.messages.getMessage("notfound") || "404 Not Found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    };
}

module.exports = new ReadFileHandler('../');
