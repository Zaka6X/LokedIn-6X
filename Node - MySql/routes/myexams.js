const express = require('express');

const myexamsController = require('../controllers/myexamsController')

const router = express.Router();


router.get('/myexams', myexamsController.getExamsByUser);
router.get('/getquestions', myexamsController.getQuestionsByExamId);
router.post("/updatequestion", myexamsController.updateQuestion);
router.post("/updateoptions", myexamsController.updateOptions);
router.post("/deletequestion", myexamsController.deleteQuestion);
router.post("/deleteexam", myexamsController.deleteExam);





module.exports = router;    