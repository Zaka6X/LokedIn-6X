 //au cas dune requte , le serveur appel la fonction createExam() pour creer un nouvel examen
 const express = require('express');
const router = express.Router();
const examController = require('/examcontroler');

// POST /api/exams
router.post('/exams', examControler.createExam);

module.exports = router;
