import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './listaAziendePage.css';
import pencil from './pencilBlack.png'; // Importa l'icona della matita

// Dati aggiornati per il nuovo formato JSON
const aziende = [
  {
    categoria: "Tecnologia",
    codice_ateco: "627801",
    email_azienda: "info@techsolutions.it",
    fax: "0123456789",
    forma_giuridica: "S.r.l.",
    id_azienda: 1,
    indirizzo_logo: "logo1.png",
    partita_iva: "12345678901",
    pec: "tech@pec.it",
    ragione_sociale: "Tech Solutions",
    data_convenzione: "2023-03-01",
    scadenza_convenzione: "2024-05-31",
    sito_web: "https://techsolutions.it/",
    telefono_azienda: "1234567890",
    addresses: [
      {
        stato: "Italia",
        provincia: "Verona",
        comune: "Verona",
        cap: "37132",
        indirizzo: "Via Andrea d'Angeli 23"
      },
      {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
    ],
    turni: [
      {
        data_fine: "Fri, 31 May 2024 00:00:00 GMT",
        data_inizio: "Fri, 01 Mar 2024 00:00:00 GMT",
        giorno_fine: "venerdì",
        giorno_inizio: "lunedì",
        id_indirizzo: 1,
        id_turno: 1,
        ora_fine: "13:00",
        ora_inizio: "09:00",
        ore: 120,
        posti: 2,
        posti_occupati: 2,
        addresses: {
          stato: "Italia",
          provincia: "Verona",
          comune: "Verona",
          cap: "37132",
          indirizzo: "Via Andrea d'Angeli 23"
        },
      },
    ],
  },
  {
    categoria: "Tecnologia",
    codice_ateco: "627801",
    email_azienda: "info@techsolutions.it",
    fax: "0123456789",
    forma_giuridica: "S.r.l.",
    id_azienda: 2,
    indirizzo_logo: "logo1.png",
    partita_iva: "12345678901",
    pec: "tech@pec.it",
    ragione_sociale: "Tech Solutions",
    data_convenzione: "2023-03-01",
    scadenza_convenzione: "2024-05-31",
    sito_web: "https://techsolutions.it/",
    telefono_azienda: "1234567890",
    addresses: [
      {
        stato: "Italia",
        provincia: "Verona",
        comune: "Verona",
        cap: "37132",
        indirizzo: "Via Andrea d'Angeli 23"
      },
      {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
            {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
                  {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
                  {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
                  {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
                  {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
                  {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
                  {
        stato: "Italia",
        provincia: "Milano",
        comune: "Milano",
        cap: "20100",
        indirizzo: "Via Roma 10"
      },
    ],
    turni: [
      {
        data_fine: "Fri, 31 May 2024 00:00:00 GMT",
        data_inizio: "Fri, 01 Mar 2024 00:00:00 GMT",
        giorno_fine: "venerdì",
        giorno_inizio: "lunedì",
        id_indirizzo: 1,
        id_turno: 1,
        ora_fine: "13:00",
        ora_inizio: "09:00",
        ore: 120,
        posti: 2,
        posti_occupati: 2,
        addresses: {
          stato: "Italia",
          provincia: "Verona",
          comune: "Verona",
          cap: "37132",
          indirizzo: "Via Andrea d'Angeli 23"
        },
      },
    ],
  },
  {
    categoria: "Tecnologia",
    codice_ateco: "627801",
    email_azienda: "info@techsolutions.it",
    fax: "0123456789",
    forma_giuridica: "S.r.l.",
    id_azienda: 3,
    indirizzo_logo: "logo1.png",
    partita_iva: "12345678901",
    pec: "tech@pec.it",
    ragione_sociale: "Tech Solutions",
    data_convenzione: "2023-03-01",
    scadenza_convenzione: "2024-05-31",
    sito_web: "https://techsolutions.it/",
    telefono_azienda: "1234567890",
    addresses: [
      {
        stato: "Italia",
        provincia: "Verona",
        comune: "Verona",
        cap: "37132",
        indirizzo: "Via Andrea d'Angeli 23"
      },
    ],
    turni: [
      {
        data_fine: "Fri, 31 May 2024 00:00:00 GMT",
        data_inizio: "Fri, 01 Mar 2024 00:00:00 GMT",
        giorno_fine: "venerdì",
        giorno_inizio: "lunedì",
        id_indirizzo: 1,
        id_turno: 1,
        ora_fine: "13:00",
        ora_inizio: "09:00",
        ore: 120,
        posti: 2,
        posti_occupati: 2,
        addresses: {
          stato: "Italia",
          provincia: "Verona",
          comune: "Verona",
          cap: "37132",
          indirizzo: "Via Andrea d'Angeli 23"
        },
      },
    ],
  },
  // Altri oggetti azienda...
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

  function handleEditClick(azienda) {
    navigate(`/nuovaAzienda`, { state: { azienda } }); // Naviga alla pagina di modifica passando l'azienda
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
      // Se il checkbox è selezionato, escludi le aziende senza posti disponibili nei turni
      if (soloConPosti) {
        const postiDisponibili = azienda.turni.some(
          (turno) => turno.posti > turno.posti_occupati
        );
        return postiDisponibili;
      }
      return true;
    })
    .sort((a, b) => {
      // Ordina le aziende: quelle con posti disponibili per prime
      const postiDisponibiliA = a.turni.some(
        (turno) => turno.posti > turno.posti_occupati
      );
      const postiDisponibiliB = b.turni.some(
        (turno) => turno.posti > turno.posti_occupati
      );
      if (postiDisponibiliA === postiDisponibiliB) return 0;
      return postiDisponibiliA ? -1 : 1;
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
            className={`aziende-card`}
            key={azienda.id_azienda}
          >
            <div className="aziende-header">
              <h2
                className="aziende-titolo"
                onClick={() => handleAziendaClick(azienda.id_azienda)} // Naviga alla pagina dell'azienda
                style={{ cursor: 'pointer', color: 'var(--text-color)', textDecoration: 'underline' }} // Stile per enfatizzare il link
              >
                {azienda.ragione_sociale}
              </h2>
              <div className="aziende-indirizzi-scrollable">
                {azienda.addresses.map((address, index) => (
                  <p key={index} className="aziende-indirizzo">
                    {`${address.indirizzo}, ${address.cap}, ${address.comune}, ${address.provincia}, ${address.stato}`}
                  </p>
                ))}
              </div>
            </div>
            <div className="azienda-sitoWeb">
              <a href={azienda.sito_web} target="_blank" rel="noopener noreferrer">
                {azienda.sito_web}
              </a>
            </div>
            <div className="settore" style={{ backgroundColor: azienda.settore }}></div>
            <div className="bottoni">
              <button
                className="btn contatti"
                onClick={() => handleContattiClick(azienda.id_azienda)} // Gestisce il click sul pulsante "Contatti"
              >
                Contatti
              </button>
              <button
                className="btn turni"
                onClick={() => handleTurniClick(azienda.id_azienda)} // Gestisce il click sul pulsante "Turni"
              >
                Turni
              </button>
              <button
                className="btn edit"
                onClick={() => handleEditClick(azienda)} // Gestisce il click sul pulsante di modifica
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