import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import './TurniPage.css';


const turniData = {
  idAzienda: 1,
  ragioneSociale: "Università di Verona",
  //indirizzoLogo: null,
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
      postiAssegnati: 5,
      oreTotali: 140,
      postiConfermati: true,
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
      postiAssegnati: 6,
      postiConfermati: false,
      oreTotali: 120,
      orarioInizio: "10:00",
      orarioFine: "16:00",
      materie: null,
    },
  ],
};

export default function VisturnoPage() {
  const { aziendaId } = useParams();
  const location = useLocation(); // Ottieni lo stato passato dalla pagina precedente
  const navigate = useNavigate(); // Hook per la navigazione
    const [azienda, setAzienda] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const { idStudente } = location.state || {}; // Ottieni idStudente

  function handleAssegnaClick(turnoId) {
    if (idStudente) {
      alert(`Lo studente con ID ${idStudente} è stato assegnato al turno ${turnoId}`);
    }
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
  
          const response = await fetch(`http://localhost:5000/api/v1/company/${aziendaId}`, {
            method: "GET", // Metodo HTTP
            headers: {
              "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
            },
          });
  
          if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
          }
  
          const data = await response.json();
          setAzienda(data); // Salva i dati ricevuti nello stato
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAziendeData();
    }, [aziendaId]);  

    console.log(azienda);



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
                <strong>Posti assegnati:</strong> <span>{turno.postiAssegnati}</span>
              </p>
              <p>
                <strong>Numero posti confermati:</strong>{" "}
                <span>{turno.postiConfermati ? "Si" : "No"}</span>
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
            <button className="turno-button" onClick={() => handleAssegnaClick(turno.idTurno)}>Assegna</button>
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