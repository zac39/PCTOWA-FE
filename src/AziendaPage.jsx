import React from 'react';
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


export default function VisazindaPage() {

  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta


  return (
    <div className="azienda-container">
      <p>{aziendaId}</p>

        <div className="azinda-card">
          <div className="azinda-header">
            {/* Informazioni azinda */}
            <div className="azinda-info">
              <h2 className="azinda-title">{aziendaData.ragioneSociale}</h2>
              <p className="azinda-address">
                {`${aziendaData.indirizzo.indirizzo}, ${aziendaData.indirizzo.cap}, ${aziendaData.indirizzo.comune}, ${aziendaData.indirizzo.stato}`}
              </p>
              <a
                href={aziendaData.sitoWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="azinda-link"
              >
                {aziendaData.sitoWeb}
              </a>
            </div>

            {/* Logo azinda */}
            <div className="azinda-logo">
              {aziendaData.indirizzoLogo ? (
                <img
                  src={aziendaData.indirizzoLogo}
                  alt={`Logo di ${aziendaData.ragioneSociale}`}
                />
              ) : (
                <div className="azinda-logo-placeholder"></div>
              )}
            </div>
          </div>

            {/* Dati Extra */}
            <div className="azinda-dati-extra">
            <div className="dati-extra-grid">
                <p><strong>Categoria:</strong> <span>{aziendaData.categoria}</span></p>
                <p><strong>Telefono:</strong> <span>{aziendaData.telefonoAzienda}</span></p>
                <p><strong>Email:</strong> <span>{aziendaData.emailAzienda}</span></p>
                <p><strong>Pec:</strong> <span>{aziendaData.pec}</span></p>
                <p><strong>Fax:</strong> <span>{aziendaData.fax}</span></p>
                <p><strong>Ragione sociale:</strong> <span>{aziendaData.ragioneSociale}</span></p>
                <p><strong>Forma Giuridica:</strong> <span>{aziendaData.formaGiuridica}</span></p>
                <p><strong>Codice Ateco:</strong> <span>{aziendaData.codiceAteco}</span></p>
                <p><strong>Inizio convenzione:</strong> <span>{aziendaData.dataConvenzione}</span></p>
                <p><strong>Fine convenzione:</strong> <span>{aziendaData.scadenzaConvenzione}</span></p>


            </div>
            </div>

          {/* Azioni */}
          <div className="azinda-actions">
            <button className="azinda-button">Tutor</button>
            <button className="azinda-button">Assegna</button>
            <button className="azinda-button">azinda</button>
          </div>
        </div>
    </div>
  );
}