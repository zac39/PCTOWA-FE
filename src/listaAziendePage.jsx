import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './listaAziendePage.css';
import pencil from './pencilBlack.png'; // Importa l'icona della matita


//TODO: sistemai i dati per gestire i filtri, settore , materia, anno e mese
//TODO: vedi se usare true o false per posti disponibili oppure dei numeri

const aziende = [
  { 
    id: 1, 
    ragioneSociale: 'Università di Verona', 
    sitoWeb: "https://www.univr.it/it/", 
    indirizzo: {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    }, 
    settore: 'pink',
    postiDisponibili: true,
  },
  {
    id: 2, 
    ragioneSociale: 'Università di Verona', 
    sitoWeb: "https://www.univr.it/it/", 
    indirizzo: {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    }, 
    settore: 'blue',
    postiDisponibili: false,
  },
  {
    id: 3, 
    ragioneSociale: 'Università di Verona', 
    sitoWeb: "https://www.univr.it/it/", 
    indirizzo: {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    }, 
    settore: 'purple',
    postiDisponibili: true,
  },
  {
    id: 4, 
    ragioneSociale: 'Università di Verona', 
    sitoWeb: "https://www.univr.it/it/", 
    indirizzo: {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    }, 
    settore: 'red',
    postiDisponibili: true,
  },
];

const opzioniFiltro = {
  Comune: ['Verona', 'Milano', 'Roma', 'Torino'],
  Settore: ['Informatica', 'Biologia', 'Ingegneria'],
  Materia: ['Matematica', 'Fisica', 'Chimica'],
  Anno: ['2023', '2024', '2025'],
  Mese: ['Gennaio', 'Febbraio', 'Marzo'],
};

export default function VisAziendePage() {
  const navigate = useNavigate(); // Hook per la navigazione

  const [valoriInput, setValoriInput] = useState({
    Comune: '',
    Settore: '',
    Materia: '',
    Anno: '',
    Mese: '',
  });

  const [soloConPosti, setSoloConPosti] = useState(false); // Stato per il checkbox

  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda passando l'ID
  }

  function handleTurniClick(id) {
    navigate(`/turni/${id}`); // Naviga alla pagina dei turni passando l'ID
  }

  function handleContattiClick(id) {
    navigate(`/contatti/${id}`); // Naviga alla pagina dei contatti passando l'ID
  }

  function handleEditClick(id) {
    navigate(`/modifica/${id}`); // Naviga alla pagina di modifica passando l'ID
  }

  function handleAddAziendaClick() {
    navigate(`/nuovaAzienda`); // Naviga alla pagina NuovoTurno passando aziendaId
  }

  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput((prev) => ({ ...prev, [filtro]: valore }));
  }

  // Funzione per ordinare le aziende
  const aziendeOrdinate = aziende
    .filter((azienda) => {
      // Se il checkbox è selezionato, escludi le aziende senza posti disponibili
      if (soloConPosti && !azienda.postiDisponibili) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Ordina le aziende: quelle con posti disponibili per prime
      if (a.postiDisponibili === b.postiDisponibili) return 0;
      return a.postiDisponibili ? -1 : 1;
    });

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
        <div className="filter-checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={soloConPosti}
              onChange={(e) => setSoloConPosti(e.target.checked)}
              className="checkbox-input"
            />
            Posti disponibili
          </label>
        </div>
        {Object.keys(opzioniFiltro).map((filtro) => (
          <div key={filtro} className="filter-container">
            <Select
              options={opzioniFiltro[filtro].map((opt) => ({ value: opt, label: opt }))}
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
        {aziendeOrdinate.map((azienda) => (
          <div
            className={`aziende-card ${azienda.postiDisponibili ? '' : 'azienda-sbiadita'}`}
            key={azienda.id}
          >
            <div className="aziende-dati">
              <h2
                className="aziende-titolo"
                onClick={() => handleAziendaClick(azienda.id)} // Naviga alla pagina dell'azienda
                style={{ cursor: 'pointer', color: 'var(--text-color)', textDecoration: 'underline' }} // Stile per enfatizzare il link
              >
                {azienda.ragioneSociale}
              </h2>
              <p className="aziende-indirizzo">
                {`${azienda.indirizzo.indirizzo}, ${azienda.indirizzo.cap}, ${azienda.indirizzo.comune}, ${azienda.indirizzo.stato}`}
              </p>
            </div>
            <div className="azienda-sitoWeb">
              <a href={azienda.sitoWeb} target="_blank" rel="noopener noreferrer">
                {azienda.sitoWeb}
              </a>
            </div>
            <div className="settore" style={{ backgroundColor: azienda.settore }}></div>
            <div className="bottoni">
              <button
                className="btn contatti"
                onClick={() => handleContattiClick(azienda.id)} // Gestisce il click sul pulsante "Contatti"
              >
                Contatti
              </button>
              <button
                className="btn turni"
                onClick={() => handleTurniClick(azienda.id)} // Gestisce il click sul pulsante "Turni"
              >
                Turni
              </button>
              <button
                className="btn edit"
                onClick={() => handleEditClick(azienda.id)} // Gestisce il click sul pulsante di modifica
              >
                <img src={pencil} alt="Edit" className="edit-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="add-azienda-button" onClick={handleAddAziendaClick}>
        +
      </button>
    </div>
  );
}