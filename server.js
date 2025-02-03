const http = require('http');
const url = require('url');
const messages = require("./lang/en.js");

// Route handlers
const getDate = require('./COMP4537/labs/3/getDate/server.js');
const readFile = require('./COMP4537/labs/3/readFile/read.js');
const writeFile = require('./COMP4537/labs/3/writeFile/write.js');

class Server {
    constructor(port, host, endpoint) {
        this.port = port;
        this.host = host;
        this.endpoint = endpoint;
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
    }

    // Start the server
    start() {
        this.server.listen(this.port, this.host, () => {
            console.log(`Server running at http://${this.host}:${this.port}${this.endpoint}`);
        });
    }

    // Handle incoming requests
    handleRequest = (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        console.log(`Requested Path: ${parsedUrl.pathname}`);

        if (parsedUrl.pathname.startsWith(this.endpoint)) {
            this.routeRequest(parsedUrl.pathname, req, res);
        } else {
            this.sendNotFound(res);
        }
    };

    // Route the request to the correct handler
    routeRequest = (pathname, req, res) => {
        if (pathname === `${this.endpoint}/3/getDate`) {
            console.log('To getDate');
            getDate.handleRequest('request', req, res);
        } else if (pathname.startsWith(`${this.endpoint}/3/readFile/`)) {
            console.log('To readFile');
            readFile.handleRequest(req, res);
        } else if (pathname === `${this.endpoint}/3/writeFile`) {
            console.log('To writeFile');
            writeFile.handleRequest(req, res);
        } else {
            this.sendNotFound(res);
        }
    };

    sendNotFound = (res) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(messages.notfound || "404 Not Found");
    };
}

const serverInstance = new Server(3000, '0.0.0.0', '/COMP4537/labs');
serverInstance.start();
