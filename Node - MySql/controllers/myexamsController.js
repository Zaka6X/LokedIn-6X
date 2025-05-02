const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.getExamsByUser = (req, res) => {
    const userId = req.query.userId;    
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    db.query("SELECT * FROM exams WHERE Id_user = ?", [userId], (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Database error" });
      }
      res.json(results);
    });
  };
  
  exports.getQuestionsByExamId = (req, res) => {
    const examId = req.query.examId;
    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required." });
    }
  
    // Get questions
    db.query("SELECT * FROM question WHERE Id_exam = ?", [examId], (error, questions) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Database error." });
      }
  
      if (questions.length === 0) return res.json([]);

      const questionIds = questions.map(q => q.Id_question  );
      db.query("SELECT * FROM options WHERE Id_question IN (?)", [questionIds], (optError, options) => {
        if (optError) {
          console.error("Options fetch error:", optError);
          return res.status(500).json({ message: "Error fetching options." });
        }
  
        // Group options under their respective question
        const optionMap = {};
        options.forEach(opt => {
          if (!optionMap[opt.Id_question]) optionMap[opt.Id_question] = [];
          optionMap[opt.Id_question].push(opt);
        });

        
        // Attach options to questions
        questions.forEach(q => {
          q.options = optionMap[q.Id_question] || [];
        });
        
        res.json(questions);
      });
    });
  };

  
  exports.updateQuestion = (req, res) => {
    const { id, question_text, reponse, note, duree, tolerance } = req.body;
    if (!id || !question_text || !reponse || !note || !duree || tolerance == null) {
      return res.status(400).json({ message: "Missing fields" });
    }
  
    const sql = `
      UPDATE question
         SET question_text = ?,
             reponse       = ?,
             note          = ?,
             duree         = ?,
             tolerance     = ?
       WHERE Id_question  = ?
    `;
    db.query(sql,
      [question_text, reponse, note, duree, tolerance, id],
      (error, result) => {
        if (error) {
          console.error("Update question error:", error);
          return res.status(500).json({ message: "Failed to update question" });
        }
        res.json({ message: "Question updated successfully" });
      }
    );
  };
  
  exports.updateOptions = (req, res) => {
    const { options } = req.body;
  
    if (!Array.isArray(options)) {
      return res.status(400).json({ message: "Options must be an array" });
    }
  
    const updates = options.map(opt => {
      const { option_text, OP_nbr, Id_question } = opt;
      return new Promise((resolve, reject) => {
        db.query(
          "UPDATE options SET option_text = ? WHERE OP_nbr = ? AND Id_question = ?",
          [option_text, OP_nbr, Id_question],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    });
  
    Promise.all(updates)
      .then(() => res.json({ message: "Options updated successfully" }))
      .catch(err => {
        console.error("Update options error:", err);
        res.status(500).json({ message: "Failed to update options" });
      });
  };

  
  exports.deleteQuestion = (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "Question ID is required." });
  
    // Delete options first (foreign key constraint), then the question
    db.query("DELETE FROM options WHERE Id_question = ?", [id], (optErr) => {
      if (optErr) {
        console.error("Error deleting options:", optErr);
        return res.status(500).json({ message: "Failed to delete options" });
      }
  
      db.query("DELETE FROM question WHERE Id_question = ?", [id], (qErr) => {
        if (qErr) {
          console.error("Error deleting question:", qErr);
          return res.status(500).json({ message: "Failed to delete question" });
        }
  
        res.json({ message: "Question deleted successfully" });
      });
    });
  };
  
  exports.deleteExam = (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Exam ID is required." });

  // First delete related questions and options
  const deleteOptions = `DELETE o FROM options o JOIN question q ON o.Id_question = q.Id_question WHERE q.Id_exam = ?`;
  const deleteQuestions = `DELETE FROM question WHERE Id_exam = ?`;
  const deleteExam = `DELETE FROM exams WHERE id = ?`;

  db.query(deleteOptions, [id], (err1) => {
    if (err1) return res.status(500).json({ message: "Error deleting options." });

    db.query(deleteQuestions, [id], (err2) => {
      if (err2) return res.status(500).json({ message: "Error deleting questions." });

      db.query(deleteExam, [id], (err3) => {
        if (err3) return res.status(500).json({ message: "Error deleting exam." });
        res.json({ message: "Exam deleted successfully." });
      });
    });
  });
};

  