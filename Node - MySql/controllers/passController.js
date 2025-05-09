const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getquestions = (req, res) => {
    const { link } = req.body;
  
    if (!link) {
      return res.status(400).json({ message: "Link is required." });
    }
  
    // First find the exam by link
    db.query("SELECT id FROM exams WHERE link = ?", [link], (error, examResults) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Database error." });
      }
  
      if (examResults.length === 0) {
        return res.status(404).json({ message: "Exam not found." });
      }
  
      const examId = examResults[0].id;
  
      // Now fetch questions for this exam
      db.query("SELECT * FROM question WHERE Id_exam = ?", [examId], async (error, questionResults) => {
        if (error) {
          console.error("Database error:", error);
          return res.status(500).json({ message: "Database error." });
        }
  
        if (questionResults.length === 0) {
          return res.status(404).json({ message: "No questions found for this exam." });
        }
  
        // Now for each question, check if options exist
        const questionsWithOptions = await Promise.all(questionResults.map(q => {
          return new Promise((resolve, reject) => {

            db.query("SELECT option_text FROM options WHERE Id_question = ?", [q.Id_question], (optError, optResults) => {
              if (optError) {
                reject(optError);
              } else {
                const options = optResults.length > 0 ? optResults.map(opt => opt.option_text) : null;
                resolve({
                  id: q.Id_exam,
                  question_text: q.question_text,
                  note: q.note,
                  duree: q.duree,
                  reponse: q.reponse,
                  tolerance: q.tolerance, 
                  options: optResults.length > 0 ? optResults.map(opt => opt.option_text) : null,
                  media: q.media
                });
                
              }
            });
          });
        }));
        res.status(200).json({ questions: questionsWithOptions });
      });
    });
  };

  exports.saveLocation = (req, res) => {
    const { latitude, longitude } = req.body;
  
    // Enregistrer en BDD ou loguer
    console.log("Coordonnées reçues :", latitude, longitude);
  
    res.status(200).json({ message: "Coordonnées enregistrées avec succès." });
  };
  
  
  