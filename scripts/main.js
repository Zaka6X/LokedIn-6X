const express = require('express');
const mongoose = require('mongoose');
const examRoutes = require('./routes/examRoutes');

const app = express();
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/exam-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error(err));

// Routes
app.use('/api', examRoutes);

// Lancement du serveur
app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
