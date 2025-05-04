import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './NuovaClasse.css';

// Funzione per generare un array di anni dall'anno corrente al 1900
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year);
  }
  return years;
};

export default function NuovaClasse() {
  const years = generateYears();
  const navigate = useNavigate(); // Hook per la navigazione
  

  function handleCaricaClick() {
    navigate('/caricaClassi', { state: { from: 'nuovaClasse' } });
  }

  return (
    <div className="nuova-classe-container">
      <div className="nuova-classe-card">
        <div className="nuova-classe-header">
          <h2>Gestione classi admin</h2>
          <button className="carica-file-button"
           onClick={() => handleCaricaClick()} // Gestisce il click sul pulsante "Turni"
          >Carica file</button>
        </div>
        <form className="nuova-classe-form">
          {/* Sezione classi con i menu a tendina */}
          <div className="form-group">
            <label htmlFor="classeSezione">Classe</label>
            <div className="dropdown-section">
              {/* Primo menu a tendina (numeri da 1 a 5) */}
              <select id="classe-numero" name="classe-numero" className="dropdown">
                {[1, 2, 3, 4, 5].map((numero) => (
                  <option key={numero} value={numero}>
                    {numero}
                  </option>
                ))}
              </select>

              {/* Secondo menu a tendina (lettere maiuscole dalla A alla Z) */}
              <select id="classe-lettera" name="classe-lettera" className="dropdown">
                {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((lettera) => (
                  <option key={lettera} value={lettera}>
                    {lettera}
                  </option>
                ))}
              </select>

              {/* Terzo menu a tendina (5 possibilità: i, t, l, e, c) */}
              <select id="classe-categoria" name="classe-categoria" className="dropdown">
                {['A', 'C', 'E', 'I', 'L', 'T'].map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email responsabile */}
          <div className="form-group">
            <label htmlFor="emailResponsabile">emailResponsabile</label>
            <input type="email" id="emailResponsabile" name="emailResponsabile" 
                          placeholder="Scrivi la mail del responsabile"

            />
          </div>

          {/* Anno come menu a tendina scrivibile */}
          <div className="form-group">
            <label htmlFor="anno">Anno</label>
            <input
              list="anni"
              id="anno"
              name="anno"
              className="dropdown"
              placeholder="Seleziona o scrivi un anno"
            />
            <datalist id="anni">
              {years.map((year) => (
                <option key={year} value={year} />
              ))}
            </datalist>
          </div>

          {/* Bottone crea */}
          <button type="submit" className="crea-button">Crea</button>
        </form>
      </div>
    </div>
  );
}