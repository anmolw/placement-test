// Imports
const express = require("express");
const flash = require('connect-flash');
const setFlash = require('./middleware/flash').setFlash;
const ejsLayouts = require("express-ejs-layouts");
const path = require('path');
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");

require('dotenv').config();

// Connect to MongoDB
const db = require("./config/db");

// Configure passport
require("./config/passport");

const app = express();
const hostname = "localhost";
const port = 8080;

// Import routes
const router = require('./routes');

// Set express options
app.set("view engine", "ejs");
app.set("layout", './layouts/layout');
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Register middleware
app.use(ejsLayouts);

// Serve static files from the assets folder
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a session store for login sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        client: db.getClient(),
        dbName: "placement"
    }),
    cookie: {
        // Cookie expires in one day
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Register flash middleware
app.use(flash());
app.use(setFlash);

// Initialize passport & register as middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Register routes
app.use('/', router);

app.listen(port, hostname, (err) => {
    if (err) {
        console.log(`Error encountered while starting server: ${err}`);
        process.exit(1);
    }
    console.log(`Listening on http://${hostname}:${port}`);
})