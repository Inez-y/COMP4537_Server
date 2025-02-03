const http = require('http');
const url = require('url');
const messages = require("./lang/en.js"); 

const PORT = 3000;
const HOST = '0.0.0.0';  // Allows external access
const ENDPOINT = '/COMP4537/labs'; 

// route handlers
const getDate = require('./COMP4537/labs/3/getDate/server.js');
const readFile = require('./COMP4537/labs/3/readFile/read.js');
const writeFile = require('./COMP4537/labs/3/writeFile/write.js');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log(`Requested Path: ${parsedUrl.pathname}`);

    // startsWith function to check the endpoint
    if (parsedUrl.pathname.startsWith(ENDPOINT)) {
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end("Success! Endpoint hit.");
        // Navigate to getDate
        if (parsedUrl.pathname === ENDPOINT + '/3/getDate') {
            console.log('To getDate');
            getDate.emit('request', req, res);
            return;
            // emit calls listeners 
        }
        // Navigate to readFile
        else if (parsedUrl.pathname.startsWith(ENDPOINT + '/3/readFile/')) {
            console.log('To readFile');
            readFile.emit('request', req, res);
            return;
        }
        // Navigate to writeFile
        else if (parsedUrl.pathname === ENDPOINT + '/3/writeFile') {
            console.log('To writeFile');
            writeFile.emit('request', req, res);
            return;
        }
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

