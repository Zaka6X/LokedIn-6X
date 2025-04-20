//la gestion de ce qyue fait le serveur lorsque on renvoie une requete
const Exam = require('/exam');
const { v4: uuidv4 } = require('uuid');//il gere un lien unique pour lacces

exports.createExam = async (req, res) => {
  try {
    const { title, description, targetAudience } = req.body;//extrait les infos du corps de requete

    const newExam = new Exam({
      title,
      description,
      targetAudience,
      accessLink: `https://exam-platform.com/exam/${uuidv4()}`//il gere un lien unique pour lacces
    });

    await newExam.save();
    res.status(201).json({ message: 'Examen créé avec succès', exam: newExam });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'examen' });
  }
};
