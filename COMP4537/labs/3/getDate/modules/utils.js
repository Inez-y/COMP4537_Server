class DateUtility {
    constructor() {
        console.log("DateUtility initialized.");
    }

    getDate = () => {
        return new Date().toString();
    };
}

module.exports = new DateUtility();
