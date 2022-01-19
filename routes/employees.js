const router = require('express').Router();
const employeesController = require('../controllers/employees');
const passport = require("passport");

router.get("/login", employeesController.loginPage);
router.post("/login", passport.authenticate("local", {
    successFlash: "Logged in successfully",
    failureFlash: "Invalid email/password",
    successRedirect: "/",
    failureRedirect: "/employees/login"
}));
router.get('/logout', employeesController.logout);
router.get('/register', employeesController.registerPage);
router.post('/register', employeesController.register);

module.exports = router;