import React, { useState } from 'react';
import Select from 'react-select';
import './listaStudentiPage.css'; // Assicurati di avere il file CSS

const studentiData = [
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Assegnato',
    statoColor: '#d4edda', // Verde per Assegnato
    statoTextColor: '#155724',
    azione: 'Aziende',
    azienda: {
      nome: 'Università di Verona',
      indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
      classe: '06/06-10/07',
      stato: '',
      statoColor: 'transparent', // Nessuno stato
      statoTextColor: '#000',
      azione: 'Turno',
    },
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Assegnato',
    statoColor: '#d4edda', // Verde per Assegnato
    statoTextColor: '#155724',
    azione: 'Aziende',
    azienda: {
      nome: 'Università di Verona',
      indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
      classe: '06/06-10/07',
      stato: '',
      statoColor: 'transparent', // Nessuno stato
      statoTextColor: '#000',
      azione: 'Turno',
    },
  },

  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  

  {
    nome: 'Federico Rigo',
    indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
    classe: '5Bi 24/25',
    stato: 'Assegnato',
    statoColor: '#d4edda', // Verde per Assegnato
    statoTextColor: '#155724',
    azione: 'Aziende',
    azienda: {
      nome: 'Università di Verona',
      indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona',
      classe: '06/06-10/07',
      stato: '',
      statoColor: 'transparent', // Nessuno stato
      statoTextColor: '#000',
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#ABD6CD',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxShadow: 'none',
      ':hover': {
        borderColor: '#888',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#ABD6CD',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#88B9A6' : '#ABD6CD',
      color: '#000',
      ':hover': {
        backgroundColor: '#88B9A6',
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
                <p className="studente-indirizzo">{studente.indirizzo}</p>
              <div className="studente-classe">{studente.classe}</div>
              <div className="student-buttons">
                <div
                  className="studente-stato"
                  style={{
                    backgroundColor: studente.statoColor,
                    color: studente.statoTextColor,
                  }}
                >
                  {studente.stato}
                </div>
                <button className="studente-azione">{studente.azione}</button>
              </div>
            </div>


            {/* Riga dell'azienda, se presente */}
            {studente.azienda && (
              <div className="azienda-info">
                <h2 className="azienda-nome">{studente.azienda.nome}</h2>
                <p className="azienda-indirizzo">{studente.azienda.indirizzo}</p>
                <div className="azienda-classe">{studente.azienda.classe}</div>
                <button className="azienda-azione">{studente.azienda.azione}</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}