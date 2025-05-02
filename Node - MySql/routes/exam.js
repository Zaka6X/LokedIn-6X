const express = require('express');
const path = require('path');
const multer = require('multer');
const examController = require('../controllers/examController');

const router = express.Router();

// Configuration for Multer file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // make sure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/creerexam', upload.none(), examController.creerexam);


// Add question with media upload
router.post('/addquestion', upload.single('media'), examController.addquestion);

router.post('/validateExam', examController.validateExam);

module.exports = router;
