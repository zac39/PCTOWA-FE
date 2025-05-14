import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa i hook per la navigazione e il passaggio di stato
import './listaAziendePage.css';
import pencil from './pencilBlack.png'; // Importa l'icona della matita

const opzioniFiltro = {
  Comune: ['Verona', 'Milano', 'Roma', 'Torino'],
  Settore: ['Informatica', 'Biologia', 'Ingegneria'],
  Materia: ['Matematica', 'Fisica', 'Chimica'],
  Anno: ['2023', '2024', '2025'],
  Mese: ['Gennaio', 'Febbraio', 'Marzo'],
};

export default function VisAziendePage() {
  const location = useLocation(); // Ottieni i dati passati dalla pagina precedente
  const { idStudente, settore, comune } = location.state || {}; // Destructuring dei dati
  const navigate = useNavigate(); // Hook per la navigazione
  const [aziende, setAziende] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stato per i filtri, con valori predefiniti da `settore` e `comune`
  const [valoriInput, setValoriInput] = useState({
    Comune: comune || '', // Comune passato come valore di default
    Settore: settore || '', // Settore passato come valore di default
    Materia: '',
    Anno: '',
    Mese: '',
  });

  const [soloConPosti, setSoloConPosti] = useState(false); // Stato per il checkbox

  // Funzione per aggiornare i filtri
  function handleSelectChange(filtro, selectedOption) {
    const valore = selectedOption ? selectedOption.value : '';
    setValoriInput((prev) => ({ ...prev, [filtro]: valore }));
  }

  // Funzione per ordinare e filtrare le aziende
  const aziendeOrdinate = aziende
    .filter((azienda) => {
      // Filtra in base ai posti disponibili
      if (soloConPosti) {
        const postiDisponibili = azienda.turns.some(
          (turno) => turno.posti > turno.posti_occupati
        );
        return postiDisponibili;
      }
      return true;
    });
    // .sort((a, b) => {
    //   // Ordina le aziende: quelle con posti disponibili per prime
    //   const postiDisponibiliA = a.turni.some(
    //     (turno) => turno.posti > turno.posti_occupati
    //   );
    //   const postiDisponibiliB = b.turni.some(
    //     (turno) => turno.posti > turno.posti_occupati
    //   );
    //   if (postiDisponibiliA === postiDisponibiliB) return 0;
    //   return postiDisponibiliA ? -1 : 1;
    // });

  // Funzione per aprire la pagina dei dettagli di un'azienda
  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda
  }

  // Funzione per aprire la pagina dei turni
  function handleTurniClick(idAzienda) {
    navigate(`/turni/${idAzienda}`, { state: { idStudente } }); // Passa idStudente alla pagina dei turni
  }

  // Funzione per aprire la pagina dei contatti
  function handleContattiClick(id) {
    navigate(`/contatti/${id}`); // Naviga alla pagina dei contatti
  }

  // Funzione per modificare un'azienda
  function handleEditClick(azienda) {
    navigate(`/nuovaAzienda`, { state: { azienda } }); // Naviga alla pagina di modifica
  }

  // Funzione per aggiungere una nuova azienda
  function handleAddAziendaClick() {
    navigate(`/nuovaAzienda`); // Naviga alla pagina NuovoTurno
  }


  useEffect(() => {
    // Funzione per recuperare i dati dell'azienda tramite API
    const fetchAziendeData = async () => {
      setAziende([]); // Reset iniziale, facoltativo
      setIsLoading(true); // Riporta in stato di caricamento
      setError(null);     // Pulisce eventuali errori precedenti
      try {
        // Configura l'header con il token access_data
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
        }

        const response = await fetch(`http://localhost:5000/api/v1/company/list`, {
          method: "GET", // Metodo HTTP
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
          },
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setAziende(data); // Salva i dati ricevuti nello stato
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAziendeData();
    console.log("aggiornato");
  }, []);

    console.log(aziende);

  if (isLoading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
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
              options={opzioniFiltro[filtro].map((opt) => ({
                value: opt,
                label: opt,
              }))}
              onChange={(selectedOption) =>
                handleSelectChange(filtro, selectedOption)
              }
              placeholder={`${filtro}`}
              isClearable
              styles={customStyles} // Applica lo stile personalizzato
              classNamePrefix="react-select"
              value={
                valoriInput[filtro]
                  ? { value: valoriInput[filtro], label: valoriInput[filtro] }
                  : null
              } // Imposta il valore predefinito
            />
          </div>
        ))}
      </div>

      <div className="aziende-list">
        {aziendeOrdinate.map((azienda) => {
          // Determina se l'azienda deve essere sbiadita
          const isSbiadita =
            !soloConPosti &&
            !azienda.turns.some((turno) => turno.posti > turno.posti_occupati);

          return (
            <div
              className={`aziende-card ${isSbiadita ? 'azienda-sbiadita' : ''}`}
              key={azienda.id_azienda}
            >
              <div className="aziende-header">
                <h2
                  className="aziende-titolo"
                  onClick={() => handleAziendaClick(azienda.id_azienda)} // Apri i dettagli dell'azienda
                  style={{
                    cursor: 'pointer',
                    color: 'var(--text-color)',
                    textDecoration: 'underline',
                  }}
                >
                  {azienda.ragione_sociale}
                </h2>
                <div className="aziende-indirizzi-scrollable">
                  {azienda.turns[0].addresses.map((address, index) => (
                    <p key={index} className="aziende-indirizzo">
                      {`${address.indirizzo}, ${address.cap}, ${address.comune}, ${address.provincia}, ${address.stato}`}
                    </p>
                  ))}
                </div>
              </div>
              <div className="azienda-sitoWeb">
                <a
                  href={azienda.sito_web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {azienda.sito_web}
                </a>
              </div>
              <div
                className="settore"
                style={{ backgroundColor: azienda.settore }}
              ></div>
              <div className="bottoni">
                <button
                  className="btn contatti"
                  onClick={() => handleContattiClick(azienda.id_azienda)} // Apri contatti
                >
                  Contatti
                </button>
                <button
                  className="btn turni"
                  onClick={() => handleTurniClick(azienda.id_azienda)} // Apri turni
                >
                  Turni
                </button>
                <button
                  className="btn edit"
                  onClick={() => handleEditClick(azienda)} // Modifica azienda
                >
                  <img src={pencil} alt="Edit" className="edit-icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="add-azienda-button" onClick={handleAddAziendaClick}>
        +
      </button>
    </div>
  );
}