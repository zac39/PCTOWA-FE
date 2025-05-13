import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Importa il hook per accedere ai dati passati tramite navigazione
import './NuovoTutor.css'; // Importa il file CSS per lo stile

const TutorForm = () => {
  const location = useLocation(); // Hook per ottenere lo stato passato
  const { combinedData } = location.state || {}; // Recupera i dati passati dalla pagina precedente
  console.log('Dati ricevuti dalla pagina precedente:', combinedData); // Debug: stampa i dati ricevuti

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return ''; // Accetta email vuota
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // RegEx per validare l'email
    return emailRegex.test(email) ? '' : 'Inserisci un\'email valida.';
  };

  const validateTelefono = (telefono) => {
    if (!telefono) return ''; // Accetta telefono vuoto
    const telefonoRegex = /^\+?[0-9\s\-]{6,15}$/; // RegEx per validare il numero di telefono
    return telefonoRegex.test(telefono) ? '' : 'Inserisci un numero di telefono valido.';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validazione dinamica
    if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    } else if (name === 'telefono') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        telefono: validateTelefono(value),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione finale
    const finalErrors = {
      email: validateEmail(formData.email),
      telefono: validateTelefono(formData.telefono),
    };

    setErrors(finalErrors);

    // Controlla se ci sono errori
    if (Object.values(finalErrors).every((err) => err === '')) {
      // Combina i dati della pagina precedente con quelli della pagina corrente
      const turnoData = {
        ...combinedData, // Dati provenienti dalla pagina precedente
        tutor: formData, // Dati inseriti in questa pagina
      };

//TODO: fai richiesta al server per inviare i dati nuovi poi naviga alla pagina dei turni di quella azienda

      console.log('Dati finali inviati:', turnoData); // Debug: stampa i dati finali combinati
      alert('Turno creato con successo!');
      // Puoi aggiungere qui una chiamata API per inviare i dati combinati
    }
  };

  return (
    <div className="tutor-form-container">
      <form className="tutor-form" onSubmit={handleSubmit}>
        <h2>Inserisci Tutor</h2>

        {/* Nome */}
        <div className="tutor-form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Inserisci il nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        {/* Cognome */}
        <div className="tutor-form-group">
          <label>Cognome</label>
          <input
            type="text"
            name="cognome"
            placeholder="Inserisci il cognome"
            value={formData.cognome}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="tutor-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Inserisci l'email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="tutor-error">{errors.email}</span>}
        </div>

        {/* Telefono */}
        <div className="tutor-form-group">
          <label>Telefono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Inserisci il numero di telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <span className="tutor-error">{errors.telefono}</span>}
        </div>

        {/* Pulsante di invio */}
        <button type="submit" className="tutor-submit-btn">Crea Turno</button>
      </form>
    </div>
  );
};

export default TutorForm;