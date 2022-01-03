const router = require('express').Router();
const employeesController = require('../controllers/employees');
const passport = require("passport");

router.get("/login", employeesController.loginPage);
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/employees/login",
    successRedirect: "/"
}));
router.get('/logout', employeesController.logout);
router.get('/register', employeesController.registerPage);
router.post('/register', employeesController.register);

module.exports = router;