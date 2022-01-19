const router = require('express').Router();
const studentsController = require('../controllers/students');
const passport = require("passport");

router.get('/', passport.checkAuthenticated, studentsController.studentsPage);
router.use('/employees', require('./employees'));
router.use('/interviews', require('./interviews'));
router.use('/results', require('./results'));
router.use('/students', require('./students'));

module.exports = router;