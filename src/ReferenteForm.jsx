import React, { useState } from 'react';
import './ReferenteForm.css'; // Importa il file CSS per lo stile
import { useNavigate, useLocation } from 'react-router-dom'; // Importa i hook per la navigazione


//TODO: togli nome e cognome che tanto non servono e chiedi solo email
//TODO: se l'email non corrisponde a nessun utente allora manda un errore che il docente non e stato collegato ma crea comunque il resto
//TODO: togli il pop up 

const ReferenteForm = () => {
  const location = useLocation(); // Hook per ottenere lo stato passato
  const navigate = useNavigate(); // Hook per la navigazione

  const { combinedData } = location.state || {}; // Recupera i dati passati dallo stato
  console.log('Dati azienda iniziali:', combinedData); // Stampa i dati dell'azienda per il debug

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx per validare l'email
    return emailRegex.test(email);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validazione dei campi
    if (!formData.nome) newErrors.nome = 'Il campo Nome è obbligatorio';
    if (!formData.cognome) newErrors.cognome = 'Il campo Cognome è obbligatorio';
    if (!formData.email) {
      newErrors.email = 'Il campo Email è obbligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'L\'email inserita non è valida';
    }

    setErrors(newErrors);
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Token di accesso non trovato. Effettua il login.");
    }

    // Invia i dati se non ci sono errori
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/user/bind/${formData.email}` , {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_azienda: localStorage.getItem("id_azienda") }),
        });
  
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
  
        const data = await response.json();
        alert('Azienda creata con successo!');
        console.log('Risposta API:', data);
        // Eventuale redirect dopo la creazione

  
      } catch (error) {
        console.error('Errore durante la creazione dell\'azienda:', error);
        alert('Si è verificato un errore durante la creazione dell\'azienda.');
      }
      console.log('Form valido, navigazione verso NuovoIndirizzo');
      navigate('/nuovoTurno'); // modifica il percorso secondo le tue rotte
    }
  };

  return (
    <div className="referente-form-container">
      <form className="referente-form" onSubmit={handleSubmit}>
        <h2>Inserisci Referente</h2>

        {/* Nome */}
        <div className="referente-form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Inserisci il nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {errors.nome && <span className="referente-error">{errors.nome}</span>}
        </div>

        {/* Cognome */}
        <div className="referente-form-group">
          <label>Cognome</label>
          <input
            type="text"
            name="cognome"
            placeholder="Inserisci il cognome"
            value={formData.cognome}
            onChange={handleChange}
          />
          {errors.cognome && <span className="referente-error">{errors.cognome}</span>}
        </div>

        {/* Email */}
        <div className="referente-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Inserisci l'email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="referente-error">{errors.email}</span>}
        </div>

        {/* Pulsante di invio */}
        <button type="submit" className="referente-submit-btn">Salva</button>
      </form>
    </div>
  );
};

export default ReferenteForm;