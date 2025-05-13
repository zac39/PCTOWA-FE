import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    classeNumero: '1',
    classeLettera: 'A',
    classeCategoria: 'A',
    emailResponsabile: '',
    anno: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaricaClick = () => {
    navigate('/caricaClassi', { state: { from: 'nuovaClasse' } });
  };

  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("Token di accesso non trovato. Effettua il login.");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/class', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Errore nella richiesta');
      }

      const data = await response.json();
      alert('Classe creata con successo!');
      console.log(data);
      navigate('/classi'); // Reindirizza se vuoi

    } catch (error) {
      console.error('Errore durante la creazione della classe:', error);
      alert('Errore durante la creazione della classe');
    }
  };

  return (
    <div className="nuova-classe-container">
      <div className="nuova-classe-card">
        <div className="nuova-classe-header">
          <h2>Gestione classi admin</h2>
          <button className="carica-file-button" onClick={handleCaricaClick}>
            Carica file
          </button>
        </div>
        <form className="nuova-classe-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="classeSezione">Classe</label>
            <div className="dropdown-section">
              <select id="classeNumero" name="classeNumero" className="dropdown" value={formData.classeNumero} onChange={handleInputChange}>
                {[1, 2, 3, 4, 5].map((numero) => (
                  <option key={numero} value={numero}>{numero}</option>
                ))}
              </select>

              <select id="classeLettera" name="classeLettera" className="dropdown" value={formData.classeLettera} onChange={handleInputChange}>
                {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((lettera) => (
                  <option key={lettera} value={lettera}>{lettera}</option>
                ))}
              </select>

              <select id="classeCategoria" name="classeCategoria" className="dropdown" value={formData.classeCategoria} onChange={handleInputChange}>
                {['A', 'C', 'E', 'I', 'L', 'T'].map((categoria) => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="emailResponsabile">emailResponsabile</label>
            <input
              type="email"
              id="emailResponsabile"
              name="emailResponsabile"
              placeholder="Scrivi la mail del responsabile"
              value={formData.emailResponsabile}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="anno">Anno</label>
            <input
              list="anni"
              id="anno"
              name="anno"
              className="dropdown"
              placeholder="Seleziona o scrivi un anno"
              value={formData.anno}
              onChange={handleInputChange}
            />
            <datalist id="anni">
              {years.map((year) => (
                <option key={year} value={year} />
              ))}
            </datalist>
          </div>

          <button type="submit" className="crea-button">Crea</button>
        </form>
      </div>
    </div>
  );
}