const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// "Base de données" temporaire
let users = [];

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Validation simple
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Vérifie si l'utilisateur existe déjà
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email déjà utilisé.' });
  }

  // Ajoute l'utilisateur
  users.push({ username, email, password });
  console.log(users); // Debug en console

  res.status(201).json({ message: 'Compte créé avec succès.' });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});