const http = require('http');
const url = require('url');
const messages = require("./lang/en"); 

const PORT = 3000;
const HOST = '0.0.0.0';  // Allows external access
const ENDPOINT = '/COMP4537/labs'; 

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log(`Requested Path: ${parsedUrl.pathname}`);

    // startsWith function to check the endpoint
    if (parsedUrl.pathname.startsWith(ENDPOINT)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Success! Endpoint hit.");
        // Navigate to getDate
        // Navigate to readFile
        // Navigate to writeFile
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(messages.notfound || "404 Not Found");
        return;
    }
});

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}${ENDPOINT}`);
});

