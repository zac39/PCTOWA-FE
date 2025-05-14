import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import { useParams } from 'react-router-dom';
import "./AziendaPage.css";

const aziendaData = {
  idAzienda : 1,
  ragioneSociale : "Università di Verona",
  codiceAteco : "123456",
  partitaIVA : "12345678910",
  fax : "1234567",
  pec : "pec@gmail.com",
  telefonoAzienda : "+39 123 123 1234",
  emailAzienda : "email@gmail.com",
  dataConvenzione : "01/01/20001",
  scadenzaConvenzione : "01/02/2002",
  categoria : "Scarpe",
  indirizzoLogo : null,
  sitoWeb : "https:\\google.it",
  formaGiuridica : "S.P.A",
  indirizzo: {
    stato: "Italia",
    provincia: "Verona",
    comune: "Verona",
    cap: "37132",
    indirizzo: "Via Andrea d'Angeli 23",
  },
}


export default function VisAziendaPage() {
  const navigate = useNavigate(); // Hook per la navigazione
  const [aziendaData, setAzienda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta

  useEffect(() => {
      // Funzione per recuperare i dati dell'azienda tramite API
    const fetchAziendaData = async () => {
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
      fetchAziendaData();
  }, [aziendaId]);    

  console.log("ID Azienda:", aziendaId); // Logga l'ID dell'azienda per il debug
  console.log(aziendaData); // Logga l'ID dell'azienda per il debug

  if (isLoading) {
  return (
    <div className="azienda-container">
      <p>Caricamento in corso...</p>
    </div>
  );
}

if (error) {
  return (
    <div className="azienda-container">
      <p>Errore: {error}</p>
    </div>
  );
}

  return (
    <div className="azienda-container">

        <div className="azienda-card">
          <div className="azienda-header">
            {/* Informazioni azienda */}
            <div className="azienda-info">
              <h2 className="azienda-title">{aziendaData.ragione_sociale}</h2>
              <p className="azienda-address">
                {`${aziendaData.addresses[0].indirizzo}, ${aziendaData.addresses[0].cap}, ${aziendaData.addresses[0].comune}, ${aziendaData.addresses[0].stato}`}
              </p>
              <a
                href={aziendaData.sito_web}
                target="_blank"
                rel="noopener noreferrer"
                className="azienda-link"
              >
                {aziendaData.sito_web}
              </a>
            </div>

            {/* Logo azienda */}
            <div className="azienda-logo">
              {aziendaData.indirizzo_logo ? (
                <img
                  src={aziendaData.indirizzo_logo}
                  alt={`Logo di ${aziendaData.ragione_sociale}`}
                />
              ) : (
                <div className="azienda-logo-placeholder"></div>
              )}
            </div>
          </div>

            {/* Dati Extra */}
            <div className="azienda-dati-extra">
            <div className="dati-extra-grid">
                <p><strong>Categoria:</strong> <span>{aziendaData.categoria}</span></p>
                <p><strong>Telefono:</strong> <span>{aziendaData.telefono_azienda}</span></p>
                <p><strong>Email:</strong> <span>{aziendaData.email_azienda}</span></p>
                <p><strong>Pec:</strong> <span>{aziendaData.pec}</span></p>
                <p><strong>Fax:</strong> <span>{aziendaData.fax}</span></p>
                <p><strong>Ragione sociale:</strong> <span>{aziendaData.ragione_sociale}</span></p>
                <p><strong>Forma Giuridica:</strong> <span>{aziendaData.forma_giuridica}</span></p>
                <p><strong>Codice Ateco:</strong> <span>{aziendaData.codice_ateco}</span></p>
                <p><strong>Inizio convenzione:</strong> <span>{aziendaData.data_convenzione}</span></p>
                <p><strong>Fine convenzione:</strong> <span>{aziendaData.scadenza_convenzione}</span></p>


            </div>
            </div>

          {/* Azioni */}
          <div className="azienda-actions">
            <button className="azienda-button">Tutor</button>
            <button className="azienda-button">Assegna</button>
            <button className="azienda-button">Azienda</button>
          </div>
        </div>
    </div>
  );
}