import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import Select from 'react-select';
import './listaStudentiPage.css'; // Assicurati di avere il file CSS

const studentiData = [
  {
    matricola: 10001,
    nome: 'Federico Rigo',
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    classe: '5Bi 24/25',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    matricola: 10002,
    nome: 'Federico Rigo',
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    classe: '5Bi 24/25',
    azione: 'Aziende',
    azienda: {
      nome: 'Università di Verona',
      indirizzo: {
        stato: "Italia",
        provincia: "Verona",
        comune: "Verona",
        cap: "37132",
        indirizzo: "Via Andrea d'Angeli 23",
      },
      classe: '06/06-10/07',
      azione: 'Turno',
    },
  },
  {
    matricola: 10003,
    nome: 'Federico Rigo',
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    classe: '5Bi 24/25',
    azione: 'Aziende',
    azienda: {
      nome: 'Università di Verona',
      indirizzo: {
        stato: "Italia",
        provincia: "Verona",
        comune: "Verona",
        cap: "37132",
        indirizzo: "Via Andrea d'Angeli 23",
      },
      classe: '06/06-10/07',
      azione: 'Turno',
    },
  },
];

const opzioniFiltro = {
  Comune: ['Verona', 'Milano', 'Roma', 'Torino'],
  Settore: ['Informatica', 'Biologia', 'Ingegneria'],
  Materia: ['Matematica', 'Fisica', 'Chimica'],
  Anno: ['2023', '2024', '2025'],
  Mese: ['Gennaio', 'Febbraio', 'Marzo'],
};

export default function VisStudentiPage() {
  const navigate = useNavigate(); // Hook per la navigazione
  const [valoriInput, setValoriInput] = useState({
    Comune: '',
    Settore: '',
    Materia: '',
    Anno: '',
    Mese: '',
  });

  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput((prev) => ({ ...prev, [filtro]: valore }));
  }

  function handleAziendeClick(matricola, comune) {
    // Naviga verso la pagina listaAziende passando matricola e comune come parametri
    navigate(`/listaAziende?matricola=${matricola}&comune=${comune}`);
  }

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
      {/* Filtro */}
      <div className="filters">
        {Object.keys(opzioniFiltro).map((filtro) => (
          <div key={filtro} className="filter-container">
            <Select
              options={opzioniFiltro[filtro].map((opt) => ({
                value: opt,
                label: opt,
              }))}
              onChange={(selectedOption) =>
                handleSelectChange(filtro, selectedOption)
              }
              placeholder={`${filtro}`}
              isClearable
              styles={customStyles}
              classNamePrefix="react-select"
            />
          </div>
        ))}
      </div>

      {/* Elenco Studenti */}
      <div className="studenti-list">
        {studentiData.map((studente, index) => (
          <div className="studente-card" key={index}>
            {/* Riga dello studente */}
            <div className="studente-info">
              <h2 className="studente-nome">{studente.nome}</h2>
              <p className="studente-indirizzo">
                {`${studente.indirizzo.indirizzo}, ${studente.indirizzo.cap}, ${studente.indirizzo.comune}, ${studente.indirizzo.stato}`}
              </p>
              <div className="studente-classe">{studente.classe}</div>
              <div className="student-buttons">
                <div
                  className="studente-stato"
                  style={{
                    backgroundColor: studente.azienda ? '#d4edda' : '#f8d7da', // Verde se assegnato, rosso se non assegnato
                    color: studente.azienda ? '#155724' : '#721c24', // Testo verde scuro o rosso scuro
                  }}
                >
                  {studente.azienda ? 'Assegnato' : 'Non assegnato'}
                </div>
                <button
                  className="studente-azione"
                  onClick={() => 
                    handleAziendeClick(studente.matricola, studente.indirizzo.comune)
                  } // Gestisce il click sul pulsante "Turni"

                >
                  {studente.azione}
                </button>
              </div>
            </div>

            {/* Riga dell'azienda, se presente */}
            {studente.azienda && (
              <div className="aziendaAssegnata-info">
                <h2 className="aziendaAssegnata-nome">{studente.azienda.nome}</h2>
                <p className="aziendaAssegnata-indirizzo">
                  {`${studente.azienda.indirizzo.indirizzo}, ${studente.azienda.indirizzo.cap}, ${studente.azienda.indirizzo.comune}, ${studente.azienda.indirizzo.provincia}, ${studente.azienda.indirizzo.stato}`}
                </p>
                <div className="aziendaAssegnata-classe">{studente.azienda.classe}</div>
                <button className="aziendaAssegnata-azione">{studente.azienda.azione}</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}