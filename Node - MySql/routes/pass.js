const express = require('express');

const passController = require('../controllers/passController')

const router = express.Router();

router.post('/getquestions', passController.getquestions);

module.exports = router;