import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './Login';
import IndirizziPage from './IndirizziPage';
import ListaAziendePage from './listaAziendePage';
import StudentiPage from './listaStudentiPage'; // ✅ Importa la nuova pagina
import TurniPage from './TurniPage'; // Importa la nuova pagina
import AziendaPage from './AziendaPage';
import ContattiPage from './ContattiPage'; // Importa la nuova pagina


function MainApp({ onLogout }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [theme, setTheme] = useState(() => {
    // Rileva il tema predefinito del sistema operativo
    //TODO: non sono sicura che funzioni, va testato 
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      {isHome && (
        <>
          <h1>Benvenuto! 🎉</h1>
          <button id="theme-toggle" onClick={toggleTheme}>
            Cambia Tema
          </button>
          <button onClick={onLogout}>Logout</button>
          <nav style={{ marginTop: '20px' }}>
            <Link to="/indirizzi">
              <button>Vai agli indirizzi 📍</button>
            </Link>
            <Link to="/listaAziende" style={{ marginLeft: '10px' }}>
              <button>Vai alle aziende 🏢</button>
            </Link>
            <Link to="/studenti" style={{ marginLeft: '10px' }}>
              <button>Vai agli studenti 🎓</button>
            </Link>
          </nav>
        </>
      )}

      {/* Qui vengono mostrate solo le route */}
      <div style={{ marginTop: isHome ? '40px' : '0px' }}>
        <Routes>
          <Route path="/indirizzi" element={<IndirizziPage />} />
          <Route path="/listaAziende" element={<ListaAziendePage />} />
          <Route path="/studenti" element={<StudentiPage />} />
          <Route path="/turni/:aziendaId" element={<TurniPage />} />
          <Route path="/azienda/:idAzienda" element={<AziendaPage />} />
          <Route path="/contatti/:aziendaId" element={<ContattiPage />} />
          <Route path="/" element={null} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [autenticato, setAutenticato] = useState(true);

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