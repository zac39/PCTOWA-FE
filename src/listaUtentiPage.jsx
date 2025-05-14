import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import "./listaUtentiPage.css"; // Importa il file CSS per lo stile
import Select from 'react-select';
import pencil from './pencilBlack.png'; // Importa l'icona della matita
import deleteIcon from './deleteBlack.png'; // Importa l'icona delete


const opzioniFiltro = {
  Ruolo: ['Docente', 'Tutor', 'SuperTutor', 'Admin'],
};

const RuoloLabel = ({ ruolo }) => {
  let label = "";

  switch (ruolo) {
    case 'docente':
      label = "Docente";
      break;
    case 'tutor':
      label = "Tutor";
      break;
    case 'supertutor':
      label = "SuperTutor";
      break;
    case 'admin':
      label = "Admin";
      break;
    default:
      label = "Sconosciuto";
  }

  return (
    <div className="ruolo-label" style={{ backgroundColor: 'var(--secondary-color)' }}>
      {label}
    </div>
  );
};

const ListaUtentiPage = () => {
  const navigate = useNavigate(); // Hook per la navigazione

  const [searchTerm, setSearchTerm] = useState(''); // Stato per la barra di ricerca
    const [utentiData, setUtenti] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  const [valoriInput, setValoriInput] = useState({
    Ruolo: '',
  });

  function handleEditClick(utente) {
    navigate(`/nuovoUtente`, { state: utente }); // Passa i dati dell'utente alla rotta
  }

  function handleDeleteClick(utente) {
    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare l'utente ${utente.nome} ${utente.cognome}?`
    );
    if (confirmed) {
      // Logica per eliminare l'utente
      console.log('Utente eliminato:', utente);
      alert(`Utente ${utente.nome} ${utente.cognome} eliminato con successo!`);
      // Puoi aggiungere qui una logica per rimuovere l'utente dal server o dallo stato locale
    }
  }

  function handleAddUtenteClick() {
    navigate(`/nuovoUtente`); // Naviga alla pagina per creare un nuovo utente senza dati
  }

  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput(prev => ({ ...prev, [filtro]: valore }));
  }

    useEffect(() => {
      // Funzione per recuperare i dati dell'azienda tramite API
      const fetchUtenteData = async () => {
        try {
          // Configura l'header con il token access_data
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) {
            throw new Error("Token di accesso non trovato. Effettua il login.");
          }
  
          const response = await fetch(`http://localhost:5000/api/v1/user`, {
            method: "GET", // Metodo HTTP
            headers: {
              "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
            },
          });
  
          if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
          }
  
          const data = await response.json();
          setUtenti(data); // Salva i dati ricevuti nello stato
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUtenteData();
    }, []);
  
    console.log(utentiData);
  
    if (isLoading) {
      return <p>Caricamento in corso...</p>;
    }
  
    if (error) {
      return <p>Errore: {error}</p>;
    }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtra gli utenti in base al termine di ricerca
  const utentiFiltrati = utentiData.filter(
    (utente) =>
      utente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utente.cognome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stile personalizzato per react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--primary-color)', // Colore di sfondo dei filtri
      border: '1px solid var(--filter-border-color)', // Colore del bordo
      borderRadius: '8px',
      boxShadow: 'none',
      ':hover': {
        borderColor: 'var(--filter-border-color)', // Cambia il colore del bordo al passaggio del mouse
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--primary-color)', // Colore di sfondo del menu a tendina
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--secondary-color)' // Sfondo per opzione selezionata
        : 'var(--primary-color)', // Sfondo normale
      color: 'var(--text-color)', // Colore del testo
      ':hover': {
        backgroundColor: 'var(--secondary-color)', // Sfondo al passaggio del mouse
        color: 'var(--text-color)', // Colore del testo al passaggio
      },
    }),
  };
  return (
    <div className="utenti-container">
      <div className="filters-search-container">
        {/* SearchBar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Cerca Nome o Cognome"
          value={searchTerm}
          onChange={handleSearchChange} // Aggiorna il termine di ricerca
        />

        {/* Filtri */}
        <div className="filters">
          {Object.keys(opzioniFiltro).map((filtro) => (
            <div key={filtro} className="filter-container">
              <Select
                options={opzioniFiltro[filtro].map(opt => ({ value: opt, label: opt }))}
                onChange={(selectedOption) => handleSelectChange(filtro, selectedOption)}
                placeholder={`${filtro}`}
                isClearable
                styles={customStyles} // Applica lo stile personalizzato
                classNamePrefix="react-select"
              />
            </div>
          ))}
        </div>
      </div>

      {utentiFiltrati.map((utente) => (
        <div key={utente.id} className="utente-row">
          <div className="utente-nome">
            {utente.nome} {utente.cognome}
          </div>
          <div className="utente-email">{utente.email}</div>
          <RuoloLabel ruolo={utente.ruolo} />
          <button
            className="btn-edit"
            onClick={() => handleEditClick(utente)} // Passa i dati dell'utente al click
          >
            <img src={pencil} alt="Edit" className="edit-icon" />
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDeleteClick(utente)} // Gestisce il click sul pulsante delete
          >
            <img src={deleteIcon} alt="Delete" className="delete-icon" />
          </button>
        </div>
      ))}
      {/* Pulsante per aggiungere un nuovo utente */}
      <button className="add-turno-button" onClick={handleAddUtenteClick}>
        +
      </button>
    </div>
  );
};

export default ListaUtentiPage;