import React from 'react';
import { useParams } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import './VisTurniPage.css';


//TODO: sistema il logo 

const turniData = [
  {
    idturno: 1,
    ragioneSociale: "Università di Verona",
    codiceAteco: 123456,
    partitaIVA: 12345678910,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoturno: "+39 123 123 1234",
    emailturno: "email@gmail.com",
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
    idturno: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoturno: "+39 987 987 9876",
    emailturno: "tech@gmail.com",
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
    idturno: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoturno: "+39 987 987 9876",
    emailturno: "tech@gmail.com",
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
    idturno: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoturno: "+39 987 987 9876",
    emailturno: "tech@gmail.com",
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
    idturno: 2,
    ragioneSociale: "Tech Company SRL",
    codiceAteco: 654321,
    partitaIVA: 98765432101,
    fax: "non so cosa sia un fax",
    pec: "neanche una pec",
    telefonoturno: "+39 987 987 9876",
    emailturno: "tech@gmail.com",
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

export default function VisturnoPage() {

  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta


  return (
    <div className="turno-container">
      <p>{aziendaId}</p>

      {turniData.map((turno) => (
        <div className="turno-card" key={turno.idturno}>
          <div className="turno-header">
            {/* Informazioni turno */}
            <div className="turno-info">
              <h2 className="turno-title">{turno.ragioneSociale}</h2>
              <p className="turno-address">
                {`${turno.indirizzo.indirizzo}, ${turno.indirizzo.cap}, ${turno.indirizzo.comune}, ${turno.indirizzo.stato}`}
              </p>
              <a
                href={turno.sitoWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="turno-link"
              >
                {turno.sitoWeb}
              </a>
            </div>

            {/* Logo turno */}
            <div className="turno-logo">
              {turno.indirizzoLogo ? (
                <img
                  src={turno.indirizzoLogo}
                  alt={`Logo di ${turno.ragioneSociale}`}
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
                    <span key={index} className="materia-badge">
                    {materia}
                    </span>
                ))}
                </div>
            )} */}


            {/* Materie */}
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
            {turno.datiExtra && (
                <div className="turno-dati-extra">
                <div className="dati-extra-grid">
                    <p><strong>Data inizio:</strong> <span>{turno.datiExtra.dataInizio}</span></p>
                    <p><strong>Data fine:</strong> <span>{turno.datiExtra.dataFine}</span></p>
                    <p><strong>Posti disponibili:</strong> <span>{turno.datiExtra.postiDisponibili}</span></p>
                    <p><strong>Posti totali:</strong> <span>{turno.datiExtra.postiTotali}</span></p>
                    <p><strong>Ore totali:</strong> <span>{turno.datiExtra.oreTotali}</span></p>
                    <p><strong>Orario inizio:</strong> <span>{turno.datiExtra.orarioInizio}</span></p>
                    <p><strong>Orario fine:</strong> <span>{turno.datiExtra.orarioFine}</span></p>
                </div>
                </div>
            )}

          {/* Azioni */}
          <div className="turno-actions">
            <button className="turno-button">Tutor</button>
            <button className="turno-button">Assegna</button>
            <button className="turno-button">turno</button>
          </div>
        </div>
      ))}
    </div>
  );
}