const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.inscri = async (req, res) => {
    const { email, password, firstname, lastname, dob, gender, address, usertype } = req.body;

    // //Encrypted password:
    const hashedPassword = await bcrypt.hash(password, 8);


    db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.log(err);
      } else if (results.length > 0) {
        return res.status(401).json({ message: "Email is already used" });
      } else {
        db.query("INSERT INTO users SET ?", {
          email: email,
          password: hashedPassword,
          firstname: firstname,
          lastname: lastname,
          dob: dob,
          gender: gender,
          address: address,
          usertype: usertype,
        }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.redirect('../login.html');
          }
        });
      }
    });
    
    
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      console.log("Email not found");
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password incorrect");
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    console.log("Login successful!");
    return res.status(200).json({ message: "Login successful!" });  
  });
};