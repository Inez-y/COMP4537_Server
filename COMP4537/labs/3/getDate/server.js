const http = require('http');
const url = require('url');
const { getDate } = require("./modules/utils");
const messages = require("../../../../lang/en.js");

const server = http.createServer((req, res) => {
    console.log("inside get date server");
    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name || "Guest";
    const currentTime = getDate();

    const responseMessage = `<p style="color:blue;">${messages.greeting.replace("%s", name)} ${currentTime}</p>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(responseMessage);
});


module.exports = server;