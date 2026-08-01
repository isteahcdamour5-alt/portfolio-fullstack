const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'client/build')));

// Route API pour le formulaire de contact
app.post('/api/contact', (req, res) => {
  const { nom, email, message } = req.body;
  if (!nom || !email || !message) {
    return res.status(400).json({ success: false, error: 'Veuillez remplir tous les champs.' });
  }
  console.log('Nouveau message reçu:', { nom, email, message });
  res.json({ success: true, message: 'Message envoyé avec succès !' });
});

// Route par défaut pour React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
