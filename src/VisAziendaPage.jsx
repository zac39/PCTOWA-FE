import React from 'react';
import './VisAziendaPage.css';

//TODO: sistema il logo 

const aziendeData = [
  {
    idAzienda: 1,
    ragioneSociale: "Università di Verona",
    codiceAteco: 123456,
    partitaIVA: 12345678910,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoAzienda: "+39 123 123 1234",
    emailAzienda: "email@gmail.com",
    dataConvenzione: "01/01/2001",
    scadenzaConvenzione: "01/02/2002",
    categoria: "Scarpe",
    indirizzoLogo: null,
    sitoWeb: "https://www.google.it/search?q=campo+minato",
    formaGiuridica: "S.P.A",
    materie: null,
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    datiExtra: {
      dataInizio: "06/06/2025",
      dataFine: "10/07/2025",
      postiDisponibili: 2,
      postiTotali: 5,
      oreTotali: 140,
      orarioInizio: "9:00",
      orarioFine: "15:00",
    },
  },
  {
    idAzienda: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoAzienda: "+39 987 987 9876",
    emailAzienda: "tech@gmail.com",
    dataConvenzione: "01/03/2022",
    scadenzaConvenzione: "01/03/2023",
    categoria: "Tecnologia",
    indirizzoLogo: null,
    sitoWeb: "https://www.example.com",
    formaGiuridica: "SRL",
    materie: [
        { nome: "Programmazione WEB", colore: "#FFD700" }, // Giallo
        { nome: "Data science", colore: "#87CEEB" }, // Azzurro
      ],
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    datiExtra: {
      dataInizio: "20/06/2025",
      dataFine: "25/07/2025",
      postiDisponibili: 3,
      postiTotali: 6,
      oreTotali: 120,
      orarioInizio: "10:00",
      orarioFine: "16:00",
    },
  },
  {
    idAzienda: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoAzienda: "+39 987 987 9876",
    emailAzienda: "tech@gmail.com",
    dataConvenzione: "01/03/2022",
    scadenzaConvenzione: "01/03/2023",
    categoria: "Tecnologia",
    indirizzoLogo: null,
    sitoWeb: "https://www.example.com",
    formaGiuridica: "SRL",
    materie: [
        { nome: "Programmazione WEB", colore: "#FFD700" }, // Giallo
        { nome: "Data science", colore: "#87CEEB" }, // Azzurro
      ],
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    datiExtra: {
      dataInizio: "20/06/2025",
      dataFine: "25/07/2025",
      postiDisponibili: 3,
      postiTotali: 6,
      oreTotali: 120,
      orarioInizio: "10:00",
      orarioFine: "16:00",
    },
  },
  {
    idAzienda: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoAzienda: "+39 987 987 9876",
    emailAzienda: "tech@gmail.com",
    dataConvenzione: "01/03/2022",
    scadenzaConvenzione: "01/03/2023",
    categoria: "Tecnologia",
    indirizzoLogo: null,
    sitoWeb: "https://www.example.com",
    formaGiuridica: "SRL",
    materie: [
        { nome: "Programmazione WEB", colore: "#FFD700" }, // Giallo
        { nome: "Data science", colore: "#87CEEB" }, // Azzurro
      ],
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    datiExtra: {
      dataInizio: "20/06/2025",
      dataFine: "25/07/2025",
      postiDisponibili: 3,
      postiTotali: 6,
      oreTotali: 120,
      orarioInizio: "10:00",
      orarioFine: "16:00",
    },
  },
  {
    idAzienda: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoAzienda: "+39 987 987 9876",
    emailAzienda: "tech@gmail.com",
    dataConvenzione: "01/03/2022",
    scadenzaConvenzione: "01/03/2023",
    categoria: "Tecnologia",
    indirizzoLogo: null,
    sitoWeb: "https://www.example.com",
    formaGiuridica: "SRL",
    materie: [
        { nome: "Programmazione WEB", colore: "#FFD700" }, // Giallo
        { nome: "Data science", colore: "#87CEEB" }, // Azzurro
      ],
    indirizzo: {
      stato: "Italia",
      provincia: "Verona",
      comune: "Verona",
      cap: "37132",
      indirizzo: "Via Andrea d'Angeli 23",
    },
    datiExtra: {
      dataInizio: "20/06/2025",
      dataFine: "25/07/2025",
      postiDisponibili: 3,
      postiTotali: 6,
      oreTotali: 120,
      orarioInizio: "10:00",
      orarioFine: "16:00",
    },
  },

];

export default function VisAziendaPage() {
  return (
    <div className="azienda-container">
      {aziendeData.map((azienda) => (
        <div className="azienda-card" key={azienda.idAzienda}>
          <div className="azienda-header">
            {/* Informazioni Azienda */}
            <div className="azienda-info">
              <h2 className="azienda-title">{azienda.ragioneSociale}</h2>
              <p className="azienda-address">
                {`${azienda.indirizzo.indirizzo}, ${azienda.indirizzo.cap}, ${azienda.indirizzo.comune}, ${azienda.indirizzo.stato}`}
              </p>
              <a
                href={azienda.sitoWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="azienda-link"
              >
                {azienda.sitoWeb}
              </a>
            </div>

            {/* Logo Azienda */}
            <div className="azienda-logo">
              {azienda.indirizzoLogo ? (
                <img
                  src={azienda.indirizzoLogo}
                  alt={`Logo di ${azienda.ragioneSociale}`}
                />
              ) : (
                <div className="azienda-logo-placeholder"></div>
              )}
            </div>
          </div>

            {/* Materie */}
            {/* {azienda.materie && (
                <div className="azienda-materie">
                <strong>Materie: </strong>
                {azienda.materie.map((materia, index) => (
                    <span key={index} className="materia-badge">
                    {materia}
                    </span>
                ))}
                </div>
            )} */}


            {/* Materie */}
            <div className="azienda-materie">
            <strong>Materie: </strong>
            {azienda.materie &&
                azienda.materie.map((materia, index) => (
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
            {azienda.datiExtra && (
                <div className="azienda-dati-extra">
                <div className="dati-extra-grid">
                    <p><strong>Data inizio:</strong> <span>{azienda.datiExtra.dataInizio}</span></p>
                    <p><strong>Data fine:</strong> <span>{azienda.datiExtra.dataFine}</span></p>
                    <p><strong>Posti disponibili:</strong> <span>{azienda.datiExtra.postiDisponibili}</span></p>
                    <p><strong>Posti totali:</strong> <span>{azienda.datiExtra.postiTotali}</span></p>
                    <p><strong>Ore totali:</strong> <span>{azienda.datiExtra.oreTotali}</span></p>
                    <p><strong>Orario inizio:</strong> <span>{azienda.datiExtra.orarioInizio}</span></p>
                    <p><strong>Orario fine:</strong> <span>{azienda.datiExtra.orarioFine}</span></p>
                </div>
                </div>
            )}

          {/* Azioni */}
          <div className="azienda-actions">
            <button className="azienda-button">Tutor</button>
            <button className="azienda-button">Assegna</button>
            <button className="azienda-button">Azienda</button>
          </div>
        </div>
      ))}
    </div>
  );
}