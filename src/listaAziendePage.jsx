import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './listaAziendePage.css';

//TODO: prendere effettivamente i dati e fare le richieste

const aziende = [
  { id: 1, nome: 'Università di Verona', sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'yellow' },
  { id: 2, nome: 'Università di Verona', sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'blue' },
  { id: 3, nome: 'Università di Verona', sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'purple' },
  { id: 4, nome: 'Università di Verona', sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'red' },
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

  // Gestore per navigare alla pagina "azienda.jsx"
  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda passando l'ID
  }

  function handleTurniClick(id) {
    navigate(`/turni/${id}`); // Naviga alla pagina dei turni passando l'ID
  }

  const [valoriInput, setValoriInput] = useState({
    Comune: '',
    Settore: '',
    Materia: '',
    Anno: '',
    Mese: '',
  });

  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput(prev => ({ ...prev, [filtro]: valore }));
  }

  // Stile personalizzato per react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#ABD6CD', // Sfondo personalizzato
      border: '1px solid #ccc', // Bordo
      borderRadius: '4px',
      boxShadow: 'none',
      ':hover': {
        borderColor: '#888', // Colore al passaggio del mouse
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#ABD6CD', // Sfondo del menu a tendina
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#88B9A6' : '#ABD6CD', // Sfondo per opzione selezionata
      color: '#000', // Colore del testo
      ':hover': {
        backgroundColor: '#88B9A6', // Sfondo al passaggio del mouse
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

      <div className="azienda-list">
        {aziende.map((azienda, index) => (
          <div className="azienda-card" key={index}>
            <div className="azienda-dati">
              {/* Aggiunto gestore di click sul nome */}
              <h2
                className="azienda-titolo"
                onClick={() => handleAziendaClick(azienda.id)} // Naviga alla pagina dell'azienda
                style={{ cursor: 'pointer', color: '#000', textDecoration: 'underline' }} // Stile per enfatizzare il link
              >
                {azienda.nome}
              </h2>
              <p className="azienda-indirizzo">{azienda.indirizzo}</p>
            </div>
            <div className="azienda-sitoWeb">
              <a href={azienda.sitoWeb} target="_blank" rel="noopener noreferrer">
                {azienda.sitoWeb}
              </a>
            </div>
            <div className="colore" style={{ backgroundColor: azienda.colore }}></div>
            <div className="bottoni">
              <button className="btn contatti">Contatti</button>
              <button
                className="btn turni"
                onClick={() => handleTurniClick(azienda.id)} // Gestisce il click sul pulsante "Turni"
              >
                Turni
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}