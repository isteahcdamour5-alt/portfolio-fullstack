const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Sèvi fichiye statik React yo
const buildPath = path.join(__dirname, 'client', 'build');
app.use(express.static(buildPath));

// Route API pou fòm kontak la
app.post('/api/contact', (req, res) => {
  const { nom, email, message } = req.body;
  if (!nom || !email || !message) {
    return res.status(400).json({ success: false, error: 'Veuillez remplir tous les champs.' });
  }
  res.json({ success: true, message: 'Message envoyé avec succès !' });
});

// Sèvi index.html pou nenpòt lòt wout
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send("Build React la poko pare oswa fichiye a pa jwenn.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
