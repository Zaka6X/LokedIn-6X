const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.creerexam = (req, res) => {
    const { titre, description, target, userId } = req.body;
    console.log("Creating exam with userId:", userId);


    const link = `${titre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    db.query("INSERT INTO exams (titre, description, target, link, Id_user) VALUES (?, ?, ?, ?, ?)",
  [titre, description, target, link, userId], 
  (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send("An error occurred while creating the exam.");
        } // Get the auto-generated ID
        const examId = result.insertId; //  this is the generated ID
        // Return the ID to the frontend
        res.status(201).json({ id: examId, link: link});
    });
};

exports.addquestion = (req, res) => {
    const { examId, question, note, duree, answer, tolerance } = req.body;
    const options = req.body.options; // Only used for QCM
  
    db.query("INSERT INTO question SET ?", {
        Id_exam: examId,
        question_text: question,
        reponse: answer,
        note: note,
        duree: duree,
        tolerance: tolerance || null  // Optional field
    }, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).send("Error adding question.");
        }
  
        const questionId = result.insertId;
  
        if (Array.isArray(options)) {
            const optionsValues = options.map((opt, index) => [questionId, opt, `OP${index + 1}`]);
            db.query("INSERT INTO options (Id_question, option_text, OP_nbr) VALUES ?", [optionsValues], (optError) => {
                if (optError) {
                    console.error("Database error:", optError);
                    return res.status(500).send("Error adding options.");
                }
                res.status(201).json({ message: "Question and options added!" });
            });
        } else {
            res.status(201).json({ message: "Question added without options." });
        }
    });
  };
  