const router = require("express").Router();
const resultsController = require('../controllers/results');
const passport = require("passport");

router.get('/', (req, res) => {
    console.log("test");
})
router.get('/:id/delete', passport.checkAuthenticated, resultsController.deleteResult);
router.post('/:id/update_status', passport.checkAuthenticated, resultsController.setStatus);

module.exports = router;