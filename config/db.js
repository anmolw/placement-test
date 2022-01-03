const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING, (err) => {
    if (err) {
        console.error("Failed to connect to MongoDB");
        console.error(err);
        process.exit(1);
    }
    console.log("Connected to MongoDB");
});

const db = mongoose.connection;

module.exports = db;