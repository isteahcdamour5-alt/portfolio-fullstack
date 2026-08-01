import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Chargement...');

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Bienvenue sur mon Portfolio Full-Stack!'));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎓 Mon Portfolio Full-Stack</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>
        Projet développé avec React (Frontend) et Express.js (Backend).
      </p>
      <div style={{ marginTop: '30px', padding: '20px', background: '#f4f4f4', borderRadius: '8px' }}>
        <h3>Message du Serveur:</h3>
        <p style={{ color: '#0070f3', fontWeight: 'bold' }}>{message}</p>
      </div>
    </div>
  );
}

export default App;
  
