import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa il hook per la navigazione
import Select from 'react-select';
import './listaStudentiPage.css'; // Assicurati di avere il file CSS



export default function VisStudentiPage() {
  const [classiData, setClassi] = useState([]);
  const [studentiData, setStudenti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook per la navigazione

  const studentiData2 = [
  {
    idStudente: 1,
    nome: 'Federico Rigo',
    indirizzo: {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    },
    settore: 'Informatica',
    classe: '5Bi 24/25',
    stato: 'Non assegnato',
    statoColor: '#f8d7da', // Rosso per Non assegnato
    statoTextColor: '#721c24',
    azione: 'Aziende',
    azienda: null, // Nessuna azienda associata
  },
  {
    idStudente: 2,
    nome: 'Marco Rossi',
    indirizzo: {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    },
    settore: 'Logistica',
    classe: '5Ai 24/25',
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
  // Altri studenti...
];

useEffect(() => {
    // Funzione per recuperare i dati dell'azienda tramite API
    const fetchClassiData = async () => {
      try {
        // Configura l'header con il token access_data
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
        }

        const response = await fetch(`http://localhost:5000/api/v1/class/fsearch?input_str=`, {
          method: "GET", // Metodo HTTP
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
          },
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setClassi(data); // Salva i dati ricevuti nello stato
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassiData();
  }, []);

console.log(classiData)
// Genera dinamicamente l'array degli anni (fino a 20 anni prima dell'anno corrente)
const annoCorrente = new Date().getFullYear();
const opzioniAnno = Array.from({ length: 20 }, (_, i) => (annoCorrente - i).toString());

// Genera dinamicamente l'array dei comuni presenti nella lista degli studenti
const opzioniComune = Array.from(
  new Set(studentiData.map((studente) => studente.comune))
).sort(); // Rimuove duplicati e ordina alfabeticamente



//TODO: SISTEMA QUA
const opzioniClasse = Array.from(
  new Set(studentiData.map((item => `${item.sigla} ${item.anno}`)))
)// Rimuove duplicati e ordina alfabeticamente
//const opzioniClasse = ['5Bi 24/25', '5Ci 24/25', '5Ai 24/25', '5Bi 23/24', '5Ci 23/24', '5Ai 23/24'];
console.log(studentiData)
console.log(opzioniClasse)

const opzioniFiltro = {
  Classe: opzioniClasse,
  Comune: opzioniComune, // Usa la lista dinamica dei comuni
  Anno: opzioniAnno, // Usa l'array dinamico per gli anni
};  

 const [valoriInput, setValoriInput] = useState({
    Classe: '',
    Comune: '',
    Anno: new Date().getFullYear().toString(), // Valore di default: anno corrente
  });

  const [classiFiltrate, setClassiFiltrate] = useState(opzioniFiltro.Classe); // Classi filtrate per anno

  useEffect(() => {
    // Filtra le classi in base all'anno selezionato
    if (valoriInput.Anno) {
      const anno = valoriInput.Anno.slice(-2); // Prendi gli ultimi 2 caratteri dell'anno
      const classiFiltrate = opzioniFiltro.Classe.filter((classe) =>
        classe.endsWith(anno)
      );
      setClassiFiltrate(classiFiltrate);
    } else {
      setClassiFiltrate(opzioniFiltro.Classe);
    }
  }, [valoriInput.Anno]);

  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput((prev) => ({ ...prev, [filtro]: valore }));
  }

  function handleAziendeClick(studente) {
    // Naviga verso la pagina delle aziende passando idStudente, settore e comune
    navigate('/listaAziende', {
      state: {
        idStudente: studente.idStudente, // ID dello studente
        settore: studente.settore, // Settore dello studente
        comune: studente.indirizzo.comune, // Comune dello studente
      },
    });
  }


  // Funzione per filtrare gli studenti
  const studentiFiltrati = valoriInput.Classe
    ? studentiData.filter((studente) => {
        // Filtra per comune
        if (valoriInput.Comune && studente.comune !== valoriInput.Comune) {
          return false;
        }
        // Filtra per anno
        if (
          valoriInput.Anno &&
          !studente.classe.endsWith(valoriInput.Anno.slice(-2))
        ) {
          return false;
        }
        // Filtra per classe
        if (valoriInput.Classe && studente.classe !== valoriInput.Classe) {
          return false;
        }
        return true;
      })
    : []; // Se Classe non è valorizzato, non mostrare studenti

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
              options={
                filtro === 'Classe'
                  ? classiFiltrate.map((opt) => ({ value: opt, label: opt }))
                  : opzioniFiltro[filtro].map((opt) => ({
                      value: opt,
                      label: opt,
                    }))
              }
              onChange={(selectedOption) =>
                handleSelectChange(filtro, selectedOption)
              }
              placeholder={`${filtro}`}
              isClearable
              styles={customStyles}
              classNamePrefix="react-select"
              value={
                valoriInput[filtro]
                  ? { value: valoriInput[filtro], label: valoriInput[filtro] }
                  : null
              }
            />
          </div>
        ))}
      </div>

      {/* Elenco Studenti o Messaggio */}
      {valoriInput.Classe ? (
        <div className="studenti-list">
          {studentiFiltrati.map((studente, index) => (
            <div className="studente-card" key={index}>
              {/* Riga dello studente */}
              <div className="studente-info">
                <h2 className="studente-nome">{studente.nome}</h2>
                <p className="studente-indirizzo">
                  {`${studente.indirizzo.indirizzo}, ${studente.indirizzo.cap}, ${studente.indirizzo.comune}, ${studente.indirizzo.provincia}, ${studente.indirizzo.stato}`}
                </p>
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
                  <button className="studente-azione"
                    onClick={() => handleAziendeClick(studente)} // Naviga verso la lista delle aziende
                  >{studente.azione}</button>
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
      ) : (
        <div className="empty-message">
          <h2>Scegliere una classe</h2>
        </div>
      )}
    </div>
  );
}