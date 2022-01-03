const router = require("express").Router();
const interviewsController = require("../controllers/interviews");
const passport = require("passport");


router.post("/create", passport.checkAuthenticated, interviewsController.create);
router.get('/', passport.checkAuthenticated, interviewsController.interviewsPage);

module.exports = router;