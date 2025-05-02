import React from 'react';
import { useParams } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './TutorPage.css';


//TODO: problemi con la visualizzazione dei tutor, non vengono visualizzati correttamente

const tutorData = {
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
  tutor: [] // Nessun tutor disponibile
};

export default function VistutorPage() {
  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta
  const navigate = useNavigate(); // Hook per la navigazione


  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda passando l'ID
  }

  return (
    <div className="tutorSingolo-container">
      <p>{aziendaId}</p>

      {/* Controlla se tutorData.tutor è null o vuoto */}
      {Array.isArray(tutorData.tutor) && tutorData.tutor.length > 0 ? (
        tutorData.tutor.map((tutorSingolo) => (
          <div className="tutorSingolo-card" key={tutorSingolo.idtutor}>
            <div className="tutorSingolo-header">
              {/* Informazioni tutorSingolo */}
              <div className="tutorSingolo-info">
                <h2
                  className="tutorSingolo-title"
                  onClick={() => handleAziendaClick(aziendaId)} // Naviga alla pagina dell'azienda
                  style={{
                    cursor: "pointer",
                    color: "var(--text-color)",
                    textDecoration: "underline",
                  }} // Stile per enfatizzare il link
                >
                  {tutorData.ragioneSociale}
                </h2>
                <p className="tutorSingolo-address">
                  {`${tutorData.indirizzo.indirizzo}, ${tutorData.indirizzo.cap}, ${tutorData.indirizzo.comune}, ${tutorData.indirizzo.stato}`}
                </p>

                <a
                  href={tutorData.sitoWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tutorSingolo-link"
                >
                  {tutorData.sitoWeb}
                </a>
              </div>

              {/* Logo tutorSingolo */}
              <div className="tutorSingolo-logo">
                {tutorData.indirizzoLogo ? (
                  <img
                    src={tutorData.indirizzoLogo}
                    alt={`Logo di ${tutorData.ragioneSociale}`}
                  />
                ) : (
                  <div className="tutorSingolo-logo-placeholder"></div> /* Placeholder */
                )}
              </div>
            </div>

            {/* Dati Extra */}
            <div className="tutorSingolo-dati">
              <p>{`${tutorSingolo.nome} ${tutorSingolo.cognome}`}</p>

              {tutorSingolo.ruolo && <p>{`${tutorSingolo.ruolo}`}</p>}
              <p>{`${tutorSingolo.telefono}`}</p>
              <p>{`${tutorSingolo.email}`}</p>
            </div>
          </div>
        ))
      ) : (
        /* Messaggio per tutor mancanti */
        <p className="tutorSingolo-nessun-dato">
          Non è stato inserito alcun dato per i tutor
        </p>
      )}
    </div>
  );
}