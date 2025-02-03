class GetDateHandler {
    constructor() {
        console.log("GetDateHandler initialized."); // For debugging

        this.url = require('url');
        this.getDate = require("./modules/utils").getDate;
        this.messages = require("../../../../lang/en.js");
    }

    //  Handles incoming requests
    handleRequest = (req, res) => {
        console.log("Inside GetDateHandler");

        const parsedUrl = this.url.parse(req.url, true); 
        const name = parsedUrl.query.name || "Guest";
        const currentTime = this.getDate(); // Server time

        const responseMessage = `<p style="color:blue;">${this.messages.greeting.replace("%s", name)} ${currentTime}</p>`;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(responseMessage);
    };
}

module.exports = new GetDateHandler();
