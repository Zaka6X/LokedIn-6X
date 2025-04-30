const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');

const express = require('express');
const { use } = require("../routes/auth");
const app = express();
app.use(cookieParser()); 


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.signup = async (req, res) => {
    const { email, password, nom , prenom , dob, sexe , filiere , etablissement } = req.body;

    // //Encrypted password:
    const hashedPassword = await bcrypt.hash(password, 8);


    db.query("SELECT email FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.log(err);
      } else if (results.length > 0) {
        return res.status(401).json({ message: "email exist" });
      } else {
        db.query("INSERT INTO users SET ?", {
          email: email,
          password: hashedPassword,
          nom: nom,
          prenom: prenom,
          dob: dob,
          sexe: sexe,
          etablissement: etablissement,
          filiere: filiere
        
        }, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            res.status(200).json({ message: "Signup successful" });
          }
        });
      }
    });
    
    
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  

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
    // Crée le token JWT
    const token = jwt.sign(
      { nom: user.nom, email: user.email},
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      }
    );

    // Envoie le token dans un cookie sécurisé
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true en prod avec HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 jour
    });
    console.log("Login successful!");
    return res.status(200).json({ username: user.nom, userId: user.Id });
  });
};

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0) // Expire immediately
  });
  res.status(200).json({ message: "Logged out successfully" });
};
