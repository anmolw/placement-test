const router = require("express").Router();
const interviewsController = require("../controllers/interviews");
const resultsController = require('../controllers/results');
const passport = require("passport");

// Routes for creating & deleting interviews, and assigning students to interviews
router.post("/create", passport.checkAuthenticated, interviewsController.create);
router.get('/', passport.checkAuthenticated, interviewsController.interviewsPage);
router.get('/:id/delete', passport.checkAuthenticated, interviewsController.delete);
router.get('/:id/results', passport.checkAuthenticated, resultsController.resultsForInterview);
router.post('/:id/assign_student', passport.checkAuthenticated, interviewsController.assignStudent);

module.exports = router;