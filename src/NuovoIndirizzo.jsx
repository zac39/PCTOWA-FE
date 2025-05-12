import React, { useState } from 'react';
import './NuovoIndirizzo.css'; // Importa il file CSS per lo stile
import { useNavigate, useLocation } from 'react-router-dom'; // Importa i hook per la navigazione

const NuovoIndirizzo = () => {
  const navigate = useNavigate(); // Hook per la navigazione
  const location = useLocation(); // Hook per ottenere i dati passati tramite stato
  const [AziendaId, setAziendaId] = useState([]); // Dati dell'azienda dalla pagina precedente

  const [formData, setFormData] = useState({
    stato: '',
    provincia: '',
    comune: '',
    cap: '',
    indirizzo: '',
    id_azienda: localStorage.getItem("id_azienda")
  });

  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuccessivoClick= async (e) => {
    e.preventDefault();
    const newErrors = {};

    const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Token di accesso non trovato. Effettua il login.");
      }

    // Validazione dei campi
    if (!formData.stato) newErrors.stato = 'Il campo Stato è obbligatorio';
    if (!formData.provincia) newErrors.provincia = 'Il campo Provincia è obbligatorio';
    if (!formData.comune) newErrors.comune = 'Il campo Comune è obbligatorio';
    if (!formData.cap) newErrors.cap = 'Il campo CAP è obbligatorio';
    if (!formData.indirizzo) newErrors.indirizzo = 'Il campo Indirizzo è obbligatorio';

    setErrors(newErrors);

 

    // Naviga a ReferenteForm se non ci sono errori
    if (Object.keys(newErrors).length === 0) {
try {
        const response = await fetch('http://localhost:5000/api/v1/address', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
  
        const data = await response.json();
        alert('Azienda creata con successo!');
        console.log('Risposta API:', data);
        const location=data.location;
        const id_indirizzo=location.substring(location.lastIndexOf("/") + 1); // → "8"
        localStorage.setItem("id_indirizzo", id_indirizzo);  // Usa data.access_token, non data.token
        console.log('id_indirizzo salvata:', id_indirizzo); 
  
        // Eventuale redirect dopo la creazione
        navigate('/aziende'); // modifica il percorso secondo le tue rotte
  
      } catch (error) {
        console.error('Errore durante la creazione dell\'azienda:', error);
        alert('Si è verificato un errore durante la creazione dell\'azienda.');
      }
      console.log('Dati combinati (JSON):'); // Stampa il JSON per verifica

      navigate('/ReferenteForm'); // Passa i dati combinati a ReferenteForm
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