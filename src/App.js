import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
  useNavigate, // Importa useNavigate
} from 'react-router-dom';
import Login from './Login';
import SidebarMenu from './SidebarMenu'; // Importa il menu laterale
import IndirizziPage from './IndirizziPage'; // Importa la pagina degli indirizzi
import ListaAziendePage from './listaAziendePage';
import StudentiPage from './listaStudentiPage';
import TurniPage from './TurniPage';
import AziendaPage from './AziendaPage';
import ContattiPage from './ContattiPage';
import NuovaClasse from './NuovaClasse';
import CaricaClassi from './CaricaClassi';
import NuovaAzienda from './NuovaAzienda';
import TutorPage from './TutorPage';

function MainApp({ onLogout }) {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const [theme, setTheme] = useState(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return localStorage.getItem('theme') || (systemPrefersDark ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div>
      {isHome && (
        <>
          <h1>Benvenuto! 🎉</h1>
          <button id="theme-toggle" onClick={toggleTheme}>
            Cambia Tema
          </button>
          <button onClick={onLogout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
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
            <Link to="/nuovaClasse" style={{ marginLeft: '10px' }}>
              <button>Nuova classe</button>
            </Link>
            <Link to="/caricaClassi" style={{ marginLeft: '10px' }}>
              <button>Carica classi</button>
            </Link>
            <Link to="/nuovaAzienda" style={{ marginLeft: '10px' }}>
              <button>Nuova azienda</button>
            </Link>
          </nav>
        </>
      )}

      <div style={{ marginTop: isHome ? '40px' : '0px' }}>
        <Routes>
          <Route path="/indirizzi" element={<IndirizziPage />} />
          <Route path="/listaAziende" element={<ListaAziendePage />} />
          <Route path="/studenti" element={<StudentiPage />} />
          <Route path="/nuovaClasse" element={<NuovaClasse />} />
          <Route path="/caricaClassi" element={<CaricaClassi />} />
          <Route path="/nuovaAzienda" element={<NuovaAzienda />} />
          <Route path="/turni/:aziendaId" element={<TurniPage />} />
          <Route path="/azienda/:idAzienda" element={<AziendaPage />} />
          <Route path="/contatti/:aziendaId" element={<ContattiPage />} />
          <Route path="/tutor/:aziendaId" element={<TutorPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [autenticato, setAutenticato] = useState(() => {
    // Leggi lo stato di autenticazione da localStorage all'inizio
    return localStorage.getItem('autenticato') === 'true';
  });
  const navigate = useNavigate(); // Hook per navigare

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.setItem('autenticato', 'false'); // Aggiorna localStorage
    setAutenticato(false);
    navigate("/login"); // Reindirizza alla pagina di login
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('autenticato', 'true'); // Aggiorna localStorage
    setAutenticato(true);
    navigate("/"); // Reindirizza alla home dopo il login
  };

  return (
    <>
      {autenticato ? (
        <div className="app-container">
          {/* Sidebar Menu */}
          <SidebarMenu />

          {/* Contenuto principale */}
          <div className="content-container">
            <MainApp onLogout={handleLogout} />
          </div>
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;