import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa il hook per la navigazione
import Select from 'react-select'; // Importa il componente Select da react-select

import './NuovoTurno.css';

//TODO: finisci altri passaggi e controlla che funzioni tutto

export default function NuovoTurno() {
  const navigate = useNavigate(); // Hook per la navigazione
  const location = useLocation(); // Ottieni l'oggetto location
  const aziendaId = location.state?.aziendaId; // Accedi a aziendaId dallo stato


  function handleCaricaClick() {
    navigate('/caricaClassi', { state: { from: 'nuovoTurno' } }); // Passa lo stato "from" con valore "nuovoTurno"
  }

  const [formData, setFormData] = useState({
    dataInizio: '',
    dataFine: '',
    posti: '',
    postiOccupati: '',
    ore: '',
    oraInizio: '',
    oraFine: '',
    giornoInizio: '',
    giornoFine: '',
    settori: [], // Cambiato da stringa a array per supportare selezioni multiple
    materie: [], // Nuovo campo per le materie
  });

  const [formErrors, setFormErrors] = useState({});

  const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
  const settori = [
    { value: 'Informatica', label: 'Informatica' },
    { value: 'Telecomunicazioni', label: 'Telecomunicazioni' },
    { value: 'Logistica', label: 'Logistica' },
    { value: 'Elettronica', label: 'Elettronica' },
    { value: 'Costruzione del mezzo', label: 'Costruzione del mezzo' }
  ];

  const materie = [
    { value: 'Matematica', label: 'Matematica' },
    { value: 'Fisica', label: 'Fisica' },
    { value: 'Chimica', label: 'Chimica' },
    { value: 'Informatica', label: 'Informatica' },
    { value: 'Elettronica', label: 'Elettronica' },
    { value: 'Letteratura', label: 'Letteratura' },
    { value: 'Storia', label: 'Storia' },
    { value: 'Geografia', label: 'Geografia' },
    { value: 'Biologia', label: 'Biologia' },
    { value: 'Educazione fisica', label: 'Educazione fisica' },
    // Aggiungi tutte le altre materie necessarie...
  ];

  // Validazione dinamica
  const validateField = (name, value) => {
    let error = '';

    const validators = {
      dataInizio: /^\d{4}-\d{2}-\d{2}$/, // Formato data (YYYY-MM-DD)
      dataFine: /^\d{4}-\d{2}-\d{2}$/, // Formato data (YYYY-MM-DD)
      posti: /^\d+$/, // Intero positivo
      postiOccupati: /^\d+$/, // Intero positivo
      ore: /^\d+$/, // Intero positivo
      oraInizio: /^([01]\d|2[0-3]):([0-5]\d)$/, // Formato orario (HH:mm)
      oraFine: /^([01]\d|2[0-3]):([0-5]\d)$/, // Formato orario (HH:mm)
      giornoInizio: new RegExp(`^(${giorniSettimana.join('|')})$`), // Menu a tendina (giorni della settimana)
      giornoFine: new RegExp(`^(${giorniSettimana.join('|')})$`), // Menu a tendina (giorni della settimana)
      settori: (value) => Array.isArray(value) && value.length >= 0, // Valida che almeno un settore sia selezionato
      materie: (value) => Array.isArray(value) && value.length >= 0, // Valida che almeno una materia sia selezionata
    };

    if (validators[name]) {
      const isValid = typeof validators[name] === 'function'
        ? validators[name](value)
        : validators[name].test(value);

      if (!isValid) {
        switch (name) {
          case 'dataInizio':
          case 'dataFine':
            error = 'Inserire una data valida (YYYY-MM-DD).';
            break;
          case 'posti':
          case 'postiOccupati':
          case 'ore':
            error = 'Inserire un numero intero positivo.';
            break;
          case 'oraInizio':
          case 'oraFine':
            error = 'Inserire un orario valido (HH:mm).';
            break;
          case 'giornoInizio':
          case 'giornoFine':
            error = 'Selezionare un giorno valido.';
            break;
          case 'settori':
            error = 'Selezionare almeno un settore.';
            break;
          case 'materie':
            error = 'Selezionare almeno una materia.';
            break;
          default:
            error = `Il campo ${name} non è valido.`;
        }
      }
    }

    return error;
  };

  // Gestione dinamica del cambiamento degli input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Gestione del cambiamento per il menu a tendina multiplo
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues,
    }));

    const error = validateField(name, selectedValues);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Gestione del submit del form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Controlla se ci sono errori
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setFormErrors(newErrors);

    // Se non ci sono errori, invia i dati
    if (Object.keys(newErrors).length === 0) {
      alert('Form inviato con successo!');
      console.log('Dati del form:', formData);
    }
  };

  return (
    <div className="nuovo-turno-container">
      <div className="nuovo-turno-card">
        {/* Header con titolo */}
        <div className="nuovo-turno-header">
          <h2>Nuovo turno</h2>
          <button className="carica-file-button"
            onClick={() => handleCaricaClick()} // Gestisce il click sul pulsante "Turni"
          >Carica file</button>
        </div>

        {/* Contenitore scorrevole */}
        <div className="nuovo-turno-scrollable">
          <form className="nuovo-turno-form" onSubmit={handleSubmit}>
            {/* Input dinamici */}
            {[
              { label: 'Data inizio', name: 'dataInizio', type: 'date' },
              { label: 'Data fine', name: 'dataFine', type: 'date' },
              { label: 'Posti', name: 'posti', type: 'number', placeholder: 'Inserisci il numero di posti' },
              { label: 'Posti occupati', name: 'postiOccupati', type: 'number', placeholder: 'Inserisci il numero di posti occupati' },
              { label: 'Ore', name: 'ore', type: 'number', placeholder: 'Inserisci il numero di ore' },
              { label: 'Ora inizio', name: 'oraInizio', type: 'time' },
              { label: 'Ora fine', name: 'oraFine', type: 'time' },
            ].map((field) => (
              <div className="turno-form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder || ''}
                  className="turno-form-input"
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
                {formErrors[field.name] && <p className="error-message">{formErrors[field.name]}</p>}
              </div>
            ))}

            {/* Menu a tendina per i giorni della settimana */}
            {[
              { label: 'Giorno inizio', name: 'giornoInizio' },
              { label: 'Giorno fine', name: 'giornoFine' },
            ].map((field) => (
              <div className="turno-form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <select
                  id={field.name}
                  name={field.name}
                  className="turno-form-select"
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Seleziona un giorno</option>
                  {giorniSettimana.map((giorno) => (
                    <option key={giorno} value={giorno}>{giorno}</option>
                  ))}
                </select>
                {formErrors[field.name] && <p className="error-message">{formErrors[field.name]}</p>}
              </div>
            ))}

            {/* Menu a tendina per settori con selezione multipla */}
            <div className="turno-form-group">
              <label htmlFor="settori">Settori</label>
              <Select
                id="settori"
                name="settori"
                className="turno-form-select"
                value={settori.filter(option => formData.settori.includes(option.value))}
                onChange={(selectedOptions) => handleMultiSelectChange('settori', selectedOptions)}
                options={settori}
                isMulti // Permette la selezione multipla
                placeholder="Seleziona uno o più settori"
              />
              {formErrors.settori && <p className="error-message">{formErrors.settori}</p>}
            </div>

            {/* Menu a tendina per materie con selezione multipla e ricerca */}
            <div className="turno-form-group">
              <label htmlFor="materie">Materie</label>
              <Select
                id="materie"
                name="materie"
                className="turno-form-select"
                value={materie.filter(option => formData.materie.includes(option.value))}
                onChange={(selectedOptions) => handleMultiSelectChange('materie', selectedOptions)}
                options={materie}
                isMulti // Permette la selezione multipla
                placeholder="Seleziona una o più materie"
                isSearchable // Abilita la ricerca
              />
              {formErrors.materie && <p className="error-message">{formErrors.materie}</p>}
            </div>
          </form>
        </div>

        {/* Bottone Crea sempre visibile */}
        <div className="turno-crea-button-container">
          <button type="submit" className="turno-crea-button" onClick={handleSubmit}>
            Successivo
          </button>
        </div>
      </div>
    </div>
  );
}