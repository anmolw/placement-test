const Employee = require('../models/employee');

// Route handler for creating a new employee
exports.register = async (req, res) => {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect("back");
    }
    try {
        let employee = await Employee.findOne({ email: req.body.email });
        if (employee) {
            req.flash("error", "An employee with that account already exists.")
            res.redirect("back");
        }
        employee = await Employee.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.redirect("/");
    }
    catch (error) {
        req.flash("error", "An error occurred");
        console.error("Error while creating user");
        console.error(error);
    }
}

// Route handler for employee login
exports.loginPage = (req, res) => {
    res.render("login", {
        title: "Login"
    });
}

// Route handler for the registration page
exports.registerPage = (req, res) => {
    res.render("register", {
        title: "Register"
    });
}
// Route handler used to log the current user out
exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Logged out successfully");
    res.redirect('/employees/login');
}