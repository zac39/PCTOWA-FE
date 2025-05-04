import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import SidebarMenu from './SidebarMenu';
import NuovaClasse from './NuovaClasse';
import CaricaClassi from './CaricaClassi';
import NuovaAzienda from './NuovaAzienda';
import TutorPage from './TutorPage'; // Importa la nuova pagina

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function MainApp({ onLogout }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [theme, setTheme] = useState(() => {
    // Rileva il tema predefinito del sistema operativo
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
            <Link to="/nuovaClasse" style={{ marginLeft: '10px' }}>
              <button>Nuova classe</button>
            </Link>
            <Link to="/caricaClassi" style={{ marginLeft: '10px' }}>
              <button>Carica classi</button>
            </Link>
            <Link to="/nuovaAzienda" style={{ marginLeft: '10px' }}>
              <button>nuova azinda</button>
            </Link>
          </nav>
        </>
      )}

      {/* Qui vengono mostrate solo le route */}
      <div style={{ marginTop: isHome ? '40px' : '0px' }}>
        <Routes>
          {/* Rotte protette */}
          <Route
            path="/indirizzi"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <IndirizziPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listaAziende"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ListaAziendePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studenti"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <StudentiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuovaClasse"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <NuovaClasse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/caricaClassi"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <CaricaClassi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nuovaAzienda"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <NuovaAzienda />
              </ProtectedRoute>
            }
          />
          <Route
            path="/turni/:aziendaId"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <TurniPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/azienda/:idAzienda"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <AziendaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contatti/:aziendaId"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ContattiPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/:aziendaId"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <TutorPage />
              </ProtectedRoute>
            }
          />
          {/* Rotta di login */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [autenticato, setAutenticato] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAutenticato(false);
  };

  const handleLoginSuccess = () => {
    setAutenticato(true);
  };

  return (
    <Router>
      <SidebarMenu>
        {autenticato ? (
          <MainApp onLogout={handleLogout} />
        ) : (
          <Routes>
            {/* Passa la funzione handleLoginSuccess */}
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </SidebarMenu>
    </Router>
  );
}

export default App;