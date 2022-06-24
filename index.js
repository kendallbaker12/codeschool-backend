// pull in mongo db
const mongodb = require("./persist/mongo");

// pull in server/app
const app = require("./server");

// SETUP CONFIG STUFF
// flags
const config = require("./config");
// set up port number

mongodb.setUpConnectionHandlers(() => {
    // start server
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port}`);
    });
});
mongodb.connect();