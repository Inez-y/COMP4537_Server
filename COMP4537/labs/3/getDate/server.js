const url = require('url');
const { getDate } = require("./modules/utils");
const messages = require("../../../../lang/en.js");

class GetDateHandler {
    constructor() {
        console.log("GetDateHandler initialized.");
    }

    // Handles incoming requests
    handleRequest = (req, res) => {
        console.log("Inside GetDateHandler");

        const parsedUrl = url.parse(req.url, true);
        const name = parsedUrl.query.name || "Guest";
        const currentTime = getDate();

        const responseMessage = `<p style="color:blue;">${messages.greeting.replace("%s", name)} ${currentTime}</p>`;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(responseMessage);
    };
}

module.exports = new GetDateHandler();
