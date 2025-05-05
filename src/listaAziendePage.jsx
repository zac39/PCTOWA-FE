import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './listaAziendePage.css';

const opzioniFiltro = {
  Comune: ['Verona', 'Milano', 'Roma', 'Torino'],
  Settore: ['Informatica', 'Biologia', 'Ingegneria'],
  Materia: ['Matematica', 'Fisica', 'Chimica'],
  Anno: ['2023', '2024', '2025'],
  Mese: ['Gennaio', 'Febbraio', 'Marzo'],
};

export default function VisAziendePage() {
  const navigate = useNavigate(); // Hook per la navigazione
  const [aziende, setAziende] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [valoriInput, setValoriInput] = useState({
    Comune: '',
    Settore: '',
    Materia: '',
    Anno: '',
    Mese: '',
  });

  useEffect(() => {
    // Funzione per recuperare i dati dell'azienda tramite API
    const fetchAziendeData = async () => {
      try {
        // Configura l'header con il token access_data
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
        }

        const response = await fetch(`http://localhost:5000/api/v1/company/list?anno=2023&comune=Verona&settore=IT&mese=Gennaio&materia=Matematica`, {
          method: "GET", // Metodo HTTP
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
          },
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setAziende(data); // Salva i dati ricevuti nello stato
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAziendeData();
  }, []);

  if (isLoading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }

  // Gestore per navigare alla pagina "azienda.jsx"
  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda passando l'ID
  }

  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput(prev => ({ ...prev, [filtro]: valore }));
  }

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
    <div className="container">
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

      <div className="aziende-list">
        {aziende.map((azienda, index) => (
          <div className="aziende-card" key={index}>
            <div className="aziende-dati">
              <h2
                className="aziende-titolo"
                onClick={() => handleAziendaClick(azienda.id)} // Naviga alla pagina dell'azienda
                style={{ cursor: 'pointer', color: 'var(--text-color)', textDecoration: 'underline' }} // Stile per enfatizzare il link
              >
                {azienda.ragione_sociale}
              </h2>
              <p className="aziende-indirizzo">
                {azienda.addresses.length > 0 && (
                  `${azienda.addresses[0].indirizzo}, ${azienda.addresses[0].cap}, ${azienda.addresses[0].comune}, ${azienda.addresses[0].provincia}, ${azienda.addresses[0].stato}`
                )}
              </p>
              <p><strong>Categoria:</strong> {azienda.categoria}</p>
              <p><strong>Codice Ateco:</strong> {azienda.codice_ateco}</p>
              <p><strong>Partita IVA:</strong> {azienda.partita_iva}</p>
              <p><strong>Data Convenzione:</strong> {azienda.data_convenzione}</p>
              <p><strong>Scadenza Convenzione:</strong> {azienda.scadenza_convenzione}</p>
            </div>
            <div className="azienda-sitoWeb">
              <a href={azienda.sito_web} target="_blank" rel="noopener noreferrer">
                {azienda.sito_web}
              </a>
            </div>
            <div className="azienda-contatti">
              <p><strong>Email:</strong> {azienda.email_azienda}</p>
              <p><strong>Pec:</strong> {azienda.pec}</p>
              <p><strong>Telefono:</strong> {azienda.telefono_azienda}</p>
              <p><strong>Fax:</strong> {azienda.fax}</p>
            </div>
            <div className="azienda-logo">
              {azienda.indirizzo_logo && (
                <img src={azienda.indirizzo_logo} alt={`Logo di ${azienda.ragione_sociale}`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}