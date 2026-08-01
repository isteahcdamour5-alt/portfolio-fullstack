import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('✅ Message envoyé avec succès !');
        setFormData({ nom: '', email: '', message: '' });
      } else {
        setStatus('❌ Erreur: ' + data.error);
      }
    } catch (err) {
      setStatus('❌ Erreur d\'envoi du message.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎓 Mon Portfolio Full-Stack</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Projet LOG3500 - Node.js / Express & React</p>
      
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>Contactez-moi</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nom:</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}></textarea>
          </div>
          <button type="submit" style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Envoyer</button>
        </form>
        {status && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{status}</p>}
      </div>
    </div>
  );
}

export default App;
  
