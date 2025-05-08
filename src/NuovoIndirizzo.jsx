import React, { useState } from 'react';
import './NuovoIndirizzo.css'; // Importa il file CSS per lo stile
import { useNavigate, useLocation } from 'react-router-dom'; // Importa i hook per la navigazione

const NuovoIndirizzo = () => {
  const navigate = useNavigate(); // Hook per la navigazione
  const location = useLocation(); // Hook per ottenere i dati passati tramite stato
  const aziendaData = location.state?.formData || {}; // Dati dell'azienda dalla pagina precedente

  const [formData, setFormData] = useState({
    stato: '',
    provincia: '',
    comune: '',
    cap: '',
    indirizzo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuccessivoClick = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validazione dei campi
    if (!formData.stato) newErrors.stato = 'Il campo Stato è obbligatorio';
    if (!formData.provincia) newErrors.provincia = 'Il campo Provincia è obbligatorio';
    if (!formData.comune) newErrors.comune = 'Il campo Comune è obbligatorio';
    if (!formData.cap) newErrors.cap = 'Il campo CAP è obbligatorio';
    if (!formData.indirizzo) newErrors.indirizzo = 'Il campo Indirizzo è obbligatorio';

    setErrors(newErrors);

    // Naviga a ReferenteForm se non ci sono errori
    if (Object.keys(newErrors).length === 0) {
      console.log('Dati inviati:', formData);

      // Combina i dati dell'azienda con i dati dell'indirizzo in un JSON
      const combinedData = {
        azienda: aziendaData, // Dati dell'azienda
        indirizzo: formData, // Dati dell'indirizzo
      };

      console.log('Dati combinati (JSON):', JSON.stringify(combinedData)); // Stampa il JSON per verifica

      navigate('/ReferenteForm', { state: { combinedData } }); // Passa i dati combinati a ReferenteForm
    }
  };

  return (
    <div className="indirizzo-form-container">
      <form className="indirizzo-form" onSubmit={handleSuccessivoClick}>
        <h2>Inserisci Indirizzo</h2>

        {/* Stato */}
        <div className="indirizzo-form-group">
          <label>Stato</label>
          <input
            type="text"
            name="stato"
            placeholder="Inserisci lo stato"
            value={formData.stato}
            onChange={handleChange}
          />
          {errors.stato && <span className="indirizzo-error">{errors.stato}</span>}
        </div>

        {/* Provincia */}
        <div className="indirizzo-form-group">
          <label>Provincia</label>
          <input
            type="text"
            name="provincia"
            placeholder="Inserisci la provincia"
            value={formData.provincia}
            onChange={handleChange}
          />
          {errors.provincia && <span className="indirizzo-error">{errors.provincia}</span>}
        </div>

        {/* Comune */}
        <div className="indirizzo-form-group">
          <label>Comune</label>
          <input
            type="text"
            name="comune"
            placeholder="Inserisci il comune"
            value={formData.comune}
            onChange={handleChange}
          />
          {errors.comune && <span className="indirizzo-error">{errors.comune}</span>}
        </div>

        {/* CAP */}
        <div className="indirizzo-form-group">
          <label>CAP</label>
          <input
            type="text"
            name="cap"
            placeholder="Inserisci il CAP"
            value={formData.cap}
            onChange={handleChange}
          />
          {errors.cap && <span className="indirizzo-error">{errors.cap}</span>}
        </div>

        {/* Indirizzo */}
        <div className="indirizzo-form-group">
          <label>Indirizzo</label>
          <input
            type="text"
            name="indirizzo"
            placeholder="Inserisci l'indirizzo"
            value={formData.indirizzo}
            onChange={handleChange}
          />
          {errors.indirizzo && <span className="indirizzo-error">{errors.indirizzo}</span>}
        </div>

        {/* Pulsante Successivo */}
        <button type="submit" className="indirizzo-successivo-btn">
          Successivo
        </button>
      </form>
    </div>
  );
};

export default NuovoIndirizzo;