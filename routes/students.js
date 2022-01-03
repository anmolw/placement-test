const router = require('express').Router();
const passport = require("passport");
const studentsController = require('../controllers/students');

router.get('/', passport.checkAuthenticated, studentsController.studentsPage);
router.post('/create', passport.checkAuthenticated, studentsController.create);
router.delete('/:id', passport.checkAuthenticated, studentsController.delete);

module.exports = router;