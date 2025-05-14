import React, { useState, useEffect } from 'react';
import './NuovoUtente.css'; // Importa il file CSS per lo stile
import { useLocation } from 'react-router-dom';

const roles = [
  { value: 'docente', label: 'Docente' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'supertutor', label: 'SuperTutor' },
  { value: 'admin', label: 'Admin' },
];

// Mappa dei ruoli numerici ai valori stringa
const roleMapping = {
  0: 'admin',
  1: 'docente',
  2: 'tutor',
  3: 'supertutor',
};

const NuovoUtente = () => {
  const location = useLocation();
  const utente = location.state || {}; // Recupera i dati dell'utente o un oggetto vuoto
  console.log('Dati utente:', utente); // Log dei dati dell'utente

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    ruolo: '',
  });

  const [errors, setErrors] = useState({});

  // Popola il form con i dati di default se `utente` è valorizzato
  useEffect(() => {
    if (utente) {
      setFormData({
        name: utente.name || '',
        surname: utente.surname || '',
        email: utente.email || '',
        password: '', // La password non viene mai pre-riempita per motivi di sicurezza
        ruolo: roleMapping[utente.ruolo] || '', // Mappa il valore numerico al ruolo
      });
    }
  }, [utente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      ruolo: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addUtente = async () => {
    console.log('Nuovo utente:', formData);
    alert('Utente creato con successo!');
    try {
        const response = await fetch('http://localhost:5000/api/v1/user', {
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
  
        // Eventuale redirect dopo la creazione
        navigate('/aziende'); // modifica il percorso secondo le tue rotte
  
      } catch (error) {
        console.error('Errore durante la creazione dell\'azienda:', error);
        alert('Si è verificato un errore durante la creazione dell\'azienda.');
      }
  };

  const editUtente = () => {
    console.log('Modifiche salvate per l\'utente:', formData);
    alert('Modifiche salvate con successo!');
    // Aggiungi qui la logica per inviare le modifiche al server
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validazione dei campi
    if (!formData.name) newErrors.name = 'Il nome è obbligatorio';
    if (!formData.surname) newErrors.surname = 'Il cognome è obbligatorio';
    if (!formData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'L\'email non è valida';
    }
    if (!formData.password && !utente.id) {
      // La password è obbligatoria solo per la creazione di un nuovo utente
      newErrors.password = 'La password è obbligatoria';
    }
    if (!formData.ruolo) newErrors.ruolo = 'Il ruolo è obbligatorio';

    setErrors(newErrors);

    // Invia i dati se non ci sono errori
    if (Object.keys(newErrors).length === 0) {
      if (utente.id) {
        editUtente();
      } else {
        addUtente();
      }
    }
  };

  return (
    <div className="nuovo-utente-form-container">
      <form className="nuovo-utente-form" onSubmit={handleSubmit}>
        <h2>{utente.id ? 'Modifica Utente' : 'Crea Nuovo Utente'}</h2>

        {/* Nome */}
        <div className="nuovo-utente-form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Inserisci il nome"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Cognome */}
        <div className="nuovo-utente-form-group">
          <label>Cognome</label>
          <input
            type="text"
            name="cognome"
            placeholder="Inserisci il cognome"
            value={formData.surname}
            onChange={handleChange}
          />
          {errors.surname && <span className="error">{errors.surname}</span>}
        </div>

        {/* Email */}
        <div className="nuovo-utente-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Inserisci l'email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="nuovo-utente-form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Inserisci la password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Ruolo */}
        <div className="nuovo-utente-form-group">
          <label>Ruolo</label>
          <select name="ruolo" value={formData.ruolo} onChange={handleRoleChange}>
            <option value="">Seleziona un ruolo</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          {errors.ruolo && <span className="error">{errors.ruolo}</span>}
        </div>

        {/* Pulsante di invio */}
        <button type="submit" className="invio-btn">
          {utente.id ? 'Salva Modifiche' : 'Crea Utente'}
        </button>
      </form>
    </div>
  );
};

export default NuovoUtente;