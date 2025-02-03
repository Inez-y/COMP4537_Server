const http = require('http');
const url = require('url');
const messages = require("./lang/en/en");
const path = "/COMP4537/labs/3"

const PORT = 3000;
const HOST = '0.0.0.0';  // i need to host first


const server = http.createServer((req, res) => {
    const fullUrl = new URL(req.url, `https://${req.headers.host}`)
    console.log(fullUrl);
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.includes(path)) {
        return;
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(
            `<p><b>${404}</b></p>` // need to edit
        );
        return;
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}${ENDPOINT}`);
});

