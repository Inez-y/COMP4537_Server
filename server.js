class Server {
    constructor(port = process.env.PORT || 3000, host = '0.0.0.0', endpoint = '/COMP4537/labs') {
        console.log("Server initialized."); // For debugging

        // Modules
        this.http = require('http');
        this.url = require('url');
        this.messages = require("./lang/en.js");
        this.getDate = require('./COMP4537/labs/3/getDate/server.js');
        this.readFile = require('./COMP4537/labs/3/readFile/read.js');
        this.writeFile = require('./COMP4537/labs/3/writeFile/write.js');

        this.port = port;
        this.host = host;
        this.endpoint = endpoint;

        this.server = this.http.createServer((req, res) => this.handleRequest(req, res));
    }

    // Start the server
    start() {
        this.server.listen(this.port, this.host, () => {
            console.log(`Server running at http://${this.host}:${this.port}${this.endpoint}`);
        });
    }

    // Handle incoming requests
    handleRequest = (req, res) => {
        const parsedUrl = this.url.parse(req.url, true); 
        console.log(`Requested Path: ${parsedUrl.pathname}`);

        if (parsedUrl.pathname.startsWith(this.endpoint)) {
            this.routeRequest(parsedUrl.pathname, req, res);
        } else {
            this.sendNotFound(res);
        }
    };

    // Route the request to the correct handler
    routeRequest = (pathname, req, res) => {
        if (pathname.startsWith(`${this.endpoint}/3/getDate`)) {
            console.log('To getDate');
            this.getDate.handleRequest(req, res);
        } else if (pathname.startsWith(`${this.endpoint}/3/readFile/`)) {
            console.log('To readFile');
            this.readFile.handleRequest(req, res);
        } else if (pathname.startsWith(`${this.endpoint}/3/writeFile`)) {
            console.log('To writeFile');
            this.writeFile.handleRequest(req, res);
        } else {
            this.sendNotFound(res);
        }
    };

    // Send a 404 Not Found response
    sendNotFound = (res) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(this.messages.getMessage("notfound") || "404 Not Found");
    };
}

// Start the server instance
const serverInstance = new Server();
serverInstance.start();
