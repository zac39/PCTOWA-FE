import React from "react";
import "./listaUtentiPage.css"; // Importa il file CSS per lo stile

const utentiData = [
  { id: 1, nome: "Mario", cognome: "Rossi", email: "mario.rossi@gmail.com", ruolo: 1 },
  { id: 2, nome: "Luigi", cognome: "Verdi", email: "luigi.verdi@gmail.com", ruolo: 2 },
  { id: 3, nome: "Anna", cognome: "Bianchi", email: "anna.bianchi@gmail.com", ruolo: 3 },
  { id: 4, nome: "Carla", cognome: "Neri", email: "carla.neri@gmail.com", ruolo: 4 },
];

const RuoloLabel = ({ ruolo }) => {
  let label = "";
  let color = "";

  switch (ruolo) {
    case 1:
      label = "Docente";
      break;
    case 2:
      label = "Tutor";
      break;
    case 3:
      label = "Super Tutor";
      break;
    case 0:
      label = "Admin";
      break;
    default:
      label = "Sconosciuto";
  }

  return (
    <div className="ruolo-label" style={{ backgroundColor: 'var(--secondary-color)' }}>
      {label}
    </div>
  );
};

const UtentiPage = () => {
  return (
    <div className="utenti-container">
      {utentiData.map((utente) => (
        <div key={utente.id} className="utente-row">
          <div className="utente-nome">
            {utente.nome} {utente.cognome}
          </div>
          <div className="utente-email">{utente.email}</div>
          <RuoloLabel ruolo={utente.ruolo} />
        </div>
      ))}
    </div>
  );
};

export default UtentiPage;