class Messages {
    constructor() {
        this.messages = {
            greeting: "Hello %s, What a beautiful day. Server current date and time is ",
            notfound: "Not found!",
            accessdeny: "Access Denied",
            nocontent: "No content!",
            cannotwrite: "Cannot write!",
        };
    }

    // Retrieve a message by key
    getMessage = (key) => {
        return this.messages[key] || "Message not found!";
    };
}

module.exports = new Messages();
