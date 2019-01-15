var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// Require controller modules.
var scoreController = require('../controllers/score');

router.get('/getScores', scoreController.getScores);
router.post('/submitEntry', scoreController.submitEntry);

module.exports = router;