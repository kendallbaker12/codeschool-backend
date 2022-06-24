// pull in mongoose
const mongoose = require("mongoose");

// rename mongoose connection to something shorter
const db = mongoose.connection;

function connect(user, password, host, port, db) {
    const connectionString = `mongodb+srv://codeschool:codeschool@cluster0.o7b5acp.mongodb.net/?retryWrites=true&w=majority`;

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

function setUpConnectionHandlers(callback) {
    // what should happen when it start connecting?
    db.once("connecting", () => {
        console.log("Connecting to MongoDB");
    });

    // what should happen when it's connected?
    db.once("connected", () => {
        console.log("Connected to MongoDB");
    });

    // what should happen when it opens?
    db.once("open", () => {
        console.log("Open Connection to MongoDB");
        callback();
    });

    // what should happen when it errors?
    db.once("error", () => {
        console.log("Error Connecting to MongoDB");
    });
}

// export the functions
module.exports = {
    connect: connect,
    setUpConnectionHandlers: setUpConnectionHandlers,
};