import React from 'react';
import { useParams } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import './TurniPage.css';


//TODO: sistema il logo 

const turniData =
  {
    idAzienda: 1,
    ragioneSociale: "Università di Verona",
    indirizzoLogo: null,
    sitoWeb: "https://www.google.it/search?q=campo+minato",
    materie: null,
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    turni: [
      {
        idTurno:1,
        dataInizio: "06/06/2025",
        dataFine: "10/07/2025",
        postiDisponibili: 2,
        postiTotali: 5,
        oreTotali: 140,
        orarioInizio: "9:00",
        orarioFine: "15:00",
        materie: null
      },
      {
        idTurno:1,
        dataInizio: "06/06/2025",
        dataFine: "10/07/2025",
        postiDisponibili: 2,
        postiTotali: 5,
        oreTotali: 140,
        orarioInizio: "9:00",
        orarioFine: "15:00",
        materie: [
          { nome: "Programmazione WEB", colore: "#FFD700" }, // Giallo
          { nome: "Data science", colore: "#87CEEB" }, // Azzurro
        ], 
      },
      {
        idTurno:1,
        dataInizio: "06/06/2025",
        dataFine: "10/07/2025",
        postiDisponibili: 2,
        postiTotali: 5,
        oreTotali: 140,
        orarioInizio: "9:00",
        orarioFine: "15:00",
        materie: [
          { nome: "Programmazione WEB", colore: "#FFD700" }, // Giallo
          { nome: "Data science", colore: "#87CEEB" }, // Azzurro
        ], 
      }
    ]
  }


export default function VisturnoPage() {

  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta


  return (
    <div className="turno-container">
      <p>{aziendaId}</p>

      {turniData.turni.map((turno) => (
        <div className="turno-card" key={turno.idTurno}>
          <div className="turno-header">
            {/* Informazioni turno */}
            <div className="turno-info">
              <h2 className="turno-title">{turniData.ragioneSociale}</h2>
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

            {/* Logo turno */}
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

            {/* Materie */}
            {/* {turno.materie && (
              <div className="turno-materie">
              <strong>Materie: </strong>
              {turno.materie.map((materia, index) => (
                  <span
                      key={index}
                      className="materia-badge"
                      style={{ backgroundColor: materia.colore }} // Usa il colore dal JSON
                  >
                      {materia.nome}
                  </span>
                  ))}
              </div>
            )} */}


            {/* Materie*/}
            <div className="turno-materie">
            <strong>Materie: </strong>
            {turno.materie &&
                turno.materie.map((materia, index) => (
                <span
                    key={index}
                    className="materia-badge"
                    style={{ backgroundColor: materia.colore }} // Usa il colore dal JSON
                >
                    {materia.nome}
                </span>
                ))}
            </div> 


            {/* Dati Extra */}
            <div className="turno-dati-extra">
            <div className="dati-extra-grid">
                <p><strong>Data inizio:</strong> <span>{turno.dataInizio}</span></p>
                <p><strong>Data fine:</strong> <span>{turno.dataFine}</span></p>
                <p><strong>Posti disponibili:</strong> <span>{turno.postiDisponibili}</span></p>
                <p><strong>Posti totali:</strong> <span>{turno.postiTotali}</span></p>
                <p><strong>Ore totali:</strong> <span>{turno.oreTotali}</span></p>
                <p><strong>Orario inizio:</strong> <span>{turno.orarioInizio}</span></p>
                <p><strong>Orario fine:</strong> <span>{turno.orarioFine}</span></p>
            </div>
            </div>

          {/* Azioni */}
          <div className="turno-actions">
            <button className="turno-button">Tutor</button>
            <button className="turno-button">Assegna</button>
            <button className="turno-button">Turno</button>
          </div>
        </div>
      ))}
    </div>
  );
}