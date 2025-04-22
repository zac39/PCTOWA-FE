import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './Login';
import IndirizziPage from './IndirizziPage';
import VisAziendePage from './VisAziendePage';

function MainApp({ onLogout }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      {isHome && (
        <>
          <h1>Benvenuto! 🎉</h1>
          <button onClick={onLogout}>Logout</button> {/* ✅ Usa onLogout */}
          <nav style={{ marginTop: '20px' }}>
            <Link to="/indirizzi">
              <button>Vai agli indirizzi 📍</button>
            </Link>
            <Link to="/aziende" style={{ marginLeft: '10px' }}>
              <button>Vai alle aziende 🏢</button>
            </Link>
          </nav>
        </>
      )}

      {/* Qui vengono mostrate solo le route */}
      <div style={{ marginTop: isHome ? '40px' : '0px' }}>
        <Routes>
          <Route path="/indirizzi" element={<IndirizziPage />} />
          <Route path="/aziende" element={<VisAziendePage />} />
          <Route path="/" element={null} />
        </Routes>
      </div>
    </div>
  );
}

function App() {

  //const [autenticato, setAutenticato] = useState(true); // forza accesso


  const [autenticato, setAutenticato] = useState(
    !!localStorage.getItem('token') // controlla se esiste già un token
  );


  const handleLogout = () => {
    localStorage.removeItem('token');
    setAutenticato(false);
  };

  return (
    <Router>
      {autenticato ? (
        <MainApp onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={() => setAutenticato(true)} />
      )}
    </Router>
  );
}

export default App;
