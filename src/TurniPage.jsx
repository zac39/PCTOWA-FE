import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import './TurniPage.css';

// TODO: sistema il logo 

const turniData = {
  idAzienda: 1,
  ragioneSociale: "Università di Verona",
  indirizzoLogo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.F5sVfnFWuwpVehf1J1SIMAHaE7%26pid%3DApi&f=1&ipt=d766df7c72080b158906873cd3235b5e4cfe64d9f13063684c0a7db2485e1bab&ipo=images",
  sitoWeb: "https://www.google.it/search?q=campo+minato",
  indirizzo: {
    stato: "Italia",
    provincia: "Verona",
    comune: "Verona",
    cap: "37132",
    indirizzo: "Via Andrea d'Angeli 23",
  },
  turni: [
    {
      idTurno: 1,
      dataInizio: "06/06/2025",
      dataFine: "10/07/2025",
      postiDisponibili: 2,
      postiTotali: 5,
      oreTotali: 140,
      orarioInizio: "9:00",
      orarioFine: "15:00",
      materie: [
        { nome: "Programmazione WEB", colore: "#FFD700" },
        { nome: "Data science", colore: "#87CEEB" },
      ],
    },
    {
      idTurno: 2,
      dataInizio: "11/07/2025",
      dataFine: "15/08/2025",
      postiDisponibili: 3,
      postiTotali: 6,
      oreTotali: 120,
      orarioInizio: "10:00",
      orarioFine: "16:00",
      materie: null,
    },
  ],
};

export default function VisturnoPage() {
  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta
  const navigate = useNavigate(); // Hook per la navigazione

  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda passando l'ID
  }

  function handleTutorClick(id) {
    navigate(`/tutor/${id}`); // Naviga alla pagina del tutor
  }

  function handleAddTurnoClick() {
    navigate(`/nuovoTurno`, { state: { aziendaId } }); // Naviga alla pagina NuovoTurno passando aziendaId
  }

  return (
    <div className="turno-container">
      <p>{aziendaId}</p>

      {turniData.turni.map((turno) => (
        <div className="turno-card" key={turno.idTurno}>
          <div className="turno-header">
            <div className="turno-info">
              <h2
                className="turno-title"
                onClick={() => handleAziendaClick(aziendaId)} // Naviga alla pagina dell'azienda
                style={{ cursor: "pointer", color: "var(--text-color)", textDecoration: "underline" }}
              >
                {turniData.ragioneSociale}
              </h2>
              <p className="turno-address">
                {`${turniData.indirizzo.indirizzo}, ${turniData.indirizzo.cap}, ${turniData.indirizzo.comune}, ${turniData.indirizzo.stato}`}
              </p>
              <a
                href={turniData.sitoWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="turno-link"
              >
                {turniData.sitoWeb}
              </a>
            </div>
            <div className="turno-logo">
              {turniData.indirizzoLogo ? (
                <img
                  src={turniData.indirizzoLogo}
                  alt={`Logo di ${turniData.ragioneSociale}`}
                />
              ) : (
                <div className="turno-logo-placeholder"></div>
              )}
            </div>
          </div>

          <div className="turno-materie">
            <strong>Materie: </strong>
            {turno.materie &&
              turno.materie.map((materia, index) => (
                <span
                  key={index}
                  className="materia-badge"
                  style={{ backgroundColor: materia.colore }}
                >
                  {materia.nome}
                </span>
              ))}
          </div>

          <div className="turno-dati-extra">
            <div className="dati-extra-grid">
              <p>
                <strong>Data inizio:</strong> <span>{turno.dataInizio}</span>
              </p>
              <p>
                <strong>Data fine:</strong> <span>{turno.dataFine}</span>
              </p>
              <p>
                <strong>Posti disponibili:</strong>{" "}
                <span>{turno.postiDisponibili}</span>
              </p>
              <p>
                <strong>Posti totali:</strong> <span>{turno.postiTotali}</span>
              </p>
              <p>
                <strong>Ore totali:</strong> <span>{turno.oreTotali}</span>
              </p>
              <p>
                <strong>Orario inizio:</strong> <span>{turno.orarioInizio}</span>
              </p>
              <p>
                <strong>Orario fine:</strong> <span>{turno.orarioFine}</span>
              </p>
            </div>
          </div>

          <div className="turno-actions">
            <button
              className="turno-button"
              onClick={() => handleTutorClick(aziendaId)} // Gestisce il click sul pulsante "Turni"
            >
              Tutor
            </button>
            <button className="turno-button">Assegna</button>
          </div>
        </div>
      ))}

      {/* Pulsante per aggiungere un nuovo turno */}
      <button className="add-turno-button" onClick={handleAddTurnoClick}>
        +
      </button>
    </div>
  );
}