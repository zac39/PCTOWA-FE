import React from 'react';
import './VisAziendePage.css'; // Assicura di creare questo file!


const aziende = [
  { nome: 'Università di Verona',sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'bg-yellow-400' },
  { nome: 'Università di Verona',sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'bg-blue-500' },
  { nome: 'Università di Verona',sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'bg-purple-500' },
  { nome: 'Università di Verona',sitoWeb: "https://www.univr.it/it/", indirizzo: 'Via Andrea d’Angeli 4, 37132, Verona', colore: 'bg-red-600' },
];

export default function VisAziendePage() {
  return (
    <div className="container">
      <div className="filters">
        {['Comune', 'Settore', 'Materia', 'Anno', 'Mese'].map((filtro) => (
          <button key={filtro} className="filter-button">
            {filtro}
          </button>
        ))}
      </div>

      <div className="azienda-list">
        {aziende.map((azienda, index) => (
          <div className="azienda-card" key={index}>
              <div className="azienda-dati">
                <h2 className="azienda-titolo">{azienda.nome}</h2>
                <p className="azienda-indirizzo">{azienda.indirizzo}</p>
              </div>
              
              <div className="azienda-sitoWeb">
                <a href={azienda.sitoWeb} target="_blank" rel="noopener noreferrer">
                  {azienda.sitoWeb}
                </a>
              </div>
                      

            <div className="colore" style={{ backgroundColor: azienda.colore }}></div>
            <div className="bottoni">
              <button className="btn contatti">Contatti</button>
              <button className="btn turni">Turni</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

