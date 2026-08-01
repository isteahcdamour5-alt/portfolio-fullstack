const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
// Nou mete 8080 an premye kounye a:
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Sèvi fichiye statik ki soti nan client/build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Route API pou fòm kontak la
app.post('/api/contact', (req, res) => {
  const { nom, email, message } = req.body;
  if (!nom || !email || !message) {
    return res.status(400).json({ success: false, error: 'Veuillez remplir tous les champs.' });
  }
  res.json({ success: true, message: 'Message envoyé avec succès !' });
});

// Ranplase tout lòt wout yo pou kòmande index.html React la
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
                                 
