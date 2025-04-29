const express = require('express');

const examController = require('../controllers/examController')

const router = express.Router();


router.post('/creerexam', examController.creerexam);
router.post('/addquestion', examController.addquestion);

module.exports = router;