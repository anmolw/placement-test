const router = require('express').Router();
const passport = require('passport');
const dashboardController = require("../controllers/dashboard");

router.get('/students', passport.checkAuthenticated, dashboardController.studentsPage);
router.get('/interviews', passport.checkAuthenticated, dashboardController.interviewsPage);

module.exports = router;