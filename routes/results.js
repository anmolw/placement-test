const router = require("express").Router();
const resultsController = require('../controllers/results');
const passport = require("passport");

// Routes for exporting result data to a CSV file, updating & deleting results
router.get("/csv", passport.checkAuthenticated, resultsController.exportToCSV);
router.get('/:id/delete', passport.checkAuthenticated, resultsController.deleteResult);
router.post('/:id/update_status', passport.checkAuthenticated, resultsController.setStatus);

module.exports = router;