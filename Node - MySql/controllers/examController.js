const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.creerexam = (req, res) => {
    const { titre, description, target } = req.body;

    const link = `${titre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    db.query("INSERT INTO exams SET ?", {
        titre: titre,
        description: description,
        target: target,
        link: link
    }, (error, result) => {
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
    
    const { examId, question, OP1, OP2, OP3, answer } = req.body;
    db.query("INSERT INTO question SET ?", {
      id: examId,
      Question: question,
      OP1: OP1,
      OP2: OP2,
      OP3: OP3,
      Reponse: answer
    }, (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).send("An error occurred while adding the question.");
      }

      res.status(201).json({ message: "Question Added!" });


    });
  };                                                  
  