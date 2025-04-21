import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import IndirizziPage from './IndirizziPage'; // Importa la pagina degli indirizzi

function App() {
  const [autenticato, setAutenticato] = useState(
    !!localStorage.getItem('token') // controlla se esiste già un token
  );

  const handleLogout = () => {
    localStorage.removeItem('token'); // elimina il token
    setAutenticato(false); // aggiorna lo stato
  };

  return (
    <Router>
      <div>
        {autenticato ? (
          <div>
            <h1>Benvenuto! 🎉</h1>
            <button onClick={handleLogout}>Logout</button>

            {/* 👉 Aggiungiamo qui il pulsante per andare agli indirizzi */}
            <div style={{ marginTop: '20px' }}>
              <Link to="/indirizzi">
                <button>Vai agli indirizzi 📍</button>
              </Link>
            </div>

            {/* Qui definiamo tutte le route disponibili */}
            <Routes>
              <Route path="/indirizzi" element={<IndirizziPage />} />
            </Routes>
          </div>
        ) : (
          <Login onLoginSuccess={() => setAutenticato(true)} />
        )}
      </div>
    </Router>
    
  );
}

export default App;