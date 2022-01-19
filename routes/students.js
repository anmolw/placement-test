const router = require('express').Router();
const passport = require("passport");
const studentsController = require('../controllers/students');

// Routes for creating, updating & deleting students
router.get('/', passport.checkAuthenticated, studentsController.studentsPage);
router.post('/create', passport.checkAuthenticated, studentsController.create);
router.post('/:id/update_status', passport.checkAuthenticated, studentsController.setStatus);
router.get('/:id/delete', passport.checkAuthenticated, studentsController.delete);

module.exports = router;