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
import ListaAziendePage from './listaAziendePage';
import StudentiPage from './listaStudentiPage';
import TurniPage from './TurniPage';
import AziendaPage from './AziendaPage';
import ContattiPage from './ContattiPage';
import NuovaClasse from './NuovaClasse';
import CaricaClassi from './CaricaDati';
import NuovaAzienda from './NuovaAzienda';
import TutorPage from './TutorPage';
import NuovoTurno from './NuovoTurno';
import ListaUtenti from './listaUtentiPage'; // Importa la pagina degli utenti
import NuovoUtente from './NuovoUtente'; // Importa la pagina per aggiungere un nuovo utente
import NuovoIndirizzo from './NuovoIndirizzo'; // Importa la pagina per aggiungere un nuovo indirizzo
import ReferenteForm from './ReferenteForm';
import NuovoTutor from './NuovoTutor';
import IndirizzoForm from './IndirizzoForm';
import TutorForm from './TutorForm';
//import  TutorPage from './TutorPage'; // Importa la nuova pagina



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
      <div >
        <Routes>
          <Route path="/listaAziende" element={<ListaAziendePage />} />
          <Route path="/listaUtenti" element={<ListaUtenti />} />
          <Route path="/studenti" element={<StudentiPage />} />
          <Route path="/nuovaClasse" element={<NuovaClasse />} />
          <Route path="/caricaClassi" element={<CaricaClassi />} />
          <Route path="/nuovaAzienda" element={<NuovaAzienda />} />
          <Route path="/nuovoTurno" element={<NuovoTurno/>} />
          <Route path="/nuovoUtente" element={<NuovoUtente />} />
          <Route path="/nuovoIndirizzo" element={<NuovoIndirizzo />} />
          <Route path="/referenteForm" element={<ReferenteForm />} />
          <Route path="/tutorForm" element={<TutorForm />} />
          <Route path="/nuovoTutor" element={<NuovoTutor />} />
          <Route path="/indirizzoForm" element={<IndirizzoForm />} />
          <Route path="/turni/:aziendaId" element={<TurniPage />} />
          <Route path="/azienda/:aziendaId" element={<AziendaPage />} />
          <Route path="/contatti/:aziendaId" element={<ContattiPage />} />
          <Route path="/tutor/:aziendaId" element={<TutorPage />} />
          <Route path="*" element={<ListaAziendePage />} />
        </Routes>
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