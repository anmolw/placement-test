const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

// Passport custom strategy
passport.use(new LocalStrategy({
    usernameField: "email",
}, async (email, password, done) => {
    try {
        const employee = await Employee.findOne({ email: email });
        const passwordMatches = (employee) ? await bcrypt.compare(password, employee.password) : false;
        if (!employee || !passwordMatches) {
            return done(null, false);
        }
        return done(null, employee);
    } catch (error) {
        console.log("Error retrieving employee");
        console.error(error);
        return done(error);
    }
}));

// Middleware that redirects unauthenticated requests
passport.checkAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/employees/login");
    }
    next();
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Employee.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.error("Error deserializing user");
        console.error(error);
        return done(error);
    }
});

passport.setAuthenticatedUser = (req, res, next) => {
    // If the user is signed in, add it to the locals for views
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

