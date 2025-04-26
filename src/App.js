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
import ListaAziendePage from './listaAziendePage';
import StudentiPage from './listaStudentiPage'; // ✅ Importa la nuova pagina
import TurniPage from './TurniPage'; // Importa la nuova pagina
import AziendaPage from './AziendaPage';


function MainApp({ onLogout }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
      {isHome && (
        <>
          <h1>Benvenuto! 🎉</h1>
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