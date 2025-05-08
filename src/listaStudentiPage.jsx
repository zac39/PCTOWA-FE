import React, { useEffect, useState } from 'react';
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
  const [studente, setStudente] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

useEffect(() => {
    // Funzione per recuperare i dati dell'azienda tramite API
    const fetchAziendeData = async () => {
      try {
        // Configura l'header con il token access_data
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
        }

        const response = await fetch(`http://localhost:5000/api/v1/student/class_list/1`, {
          method: "GET", // Metodo HTTP
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
          },
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setStudente(data); // Salva i dati ricevuti nello stato
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAziendeData();
  }, []);

console.log(studente)

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
              <div className="aziendaAssegnata-info">
                <h2 className="aziendaAssegnata-nome">{studente.azienda.nome}</h2>
                <p className="aziendaAssegnata-indirizzo">{studente.azienda.indirizzo}</p>
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