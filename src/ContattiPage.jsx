import React from 'react';
import { useParams } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import './ContattiPage.css';



const contattiData =
  {
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
    contatti: [
      {
        idContatto:1,
        nome: "David",
        cognome: "Rossi",
        telefono: "1234567890",
        email: "david.rossi@gmail.com",
        ruolo: "Responsabile",
      },
      {
        idContatto:2,
        nome: "David",
        cognome: "Bianchi",
        telefono: "1234567890",
        email: "david.rossi@gmail.com",
        ruolo: "Responsabile",
      },
      {
        idContatto:3,
        nome: "David",
        cognome: "Verdi",
        telefono: "1234567890",
        email: "david.rossi@gmail.com",
        ruolo: "Responsabile",
      },
      {
        idContatto:4,
        nome: "David",
        cognome: "Blue",
        telefono: "1234567890",
        email: "david.rossi@gmail.com",
        ruolo: "Responsabile",
      },
      
    ]
  }


export default function ViscontattiPage() {

  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta


  return (
    <div className="contatto-container">
      <p>{aziendaId}</p>

      {contattiData.contatti.map((contatto) => (
        <div className="contatto-card" key={contatto.idContatto}>
          <div className="contatto-header">
            {/* Informazioni contatto */}
            <div className="contatto-info">
              <h2 className="contatto-title">{contattiData.ragioneSociale}</h2>
              <p className="contatto-address">
                {`${contattiData.indirizzo.indirizzo}, ${contattiData.indirizzo.cap}, ${contattiData.indirizzo.comune}, ${contattiData.indirizzo.stato}`}
              </p>
              
              <a
                href={contattiData.sitoWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="contatto-link"
              >
                {contattiData.sitoWeb}
              </a>

            </div>

            {/* Logo contatto */}
            <div className="contatto-logo">
                {contattiData.indirizzoLogo ? (
                    <img
                    src={contattiData.indirizzoLogo}
                    alt={`Logo di ${contattiData.ragioneSociale}`}
                    />
                ) : (
                    <div className="contatto-logo-placeholder"></div> /* Placeholder */
                )}
            </div>
          </div>

          
            {/* Dati Extra */}
            <div className="contatto-dati">
            <p>{`${contatto.nome} ${contatto.cognome}`}</p>
            <p>{`${contatto.ruolo}`}</p>
            <p>{`${contatto.telefono}`}</p>
            <p>{`${contatto.email}`}</p>

            </div>

          {/* Azioni */}
          <div className="contatto-actions">
            <button className="contatto-button">Tutor</button>
            <button className="contatto-button">Assegna</button>
            <button className="contatto-button">Turno</button>
          </div>
        </div>
      ))}
    </div>
  );
}