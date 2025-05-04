import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa il hook per la navigazione
import Select from 'react-select'; // Importa il componente Select da react-select

import './NuovoTurno.css';

export default function NuovoTurno() {
    const navigate = useNavigate(); // Hook per la navigazione
    const location = useLocation(); // Ottieni l'oggetto location
    const aziendaId = location.state?.aziendaId; // Accedi a aziendaId dallo stato
  
    const [formData, setFormData] = useState({
      dataInizio: { giorno: '', mese: '', anno: '' },
      dataFine: { giorno: '', mese: '', anno: '' },
      posti: '',
      postiOccupati: '',
      ore: '',
      oraInizio: '',
      oraFine: '',
      giornoInizio: '',
      giornoFine: '',
      settori: [],
      materie: [],
    });
  
    const [formErrors, setFormErrors] = useState({});
  
    const giorniSettimana = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
    const mesi = Array.from({ length: 12 }, (_, i) => i + 1); // Array dei mesi (1-12)
    const anni = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i); // Array degli anni a partire dall'anno corrente
  
    const validateField = (name, value) => {
      let error = '';
  
      if (name === 'giorno' && value !== '' && (isNaN(value) || value < 1 || value > 31)) {
        error = 'Inserire un giorno valido (1-31).';
      }
      if (name === 'mese' && (isNaN(value) || value < 1 || value > 12)) {
        error = 'Inserire un mese valido (1-12).';
      }
      if (name === 'anno' && (isNaN(value) || value.length !== 4)) {
        error = 'Inserire un anno valido a 4 cifre.';
      }
  
      return error;
    };
  
    const handleDateChange = (field, subField, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subField]: value,
        },
      }));
  
      const error = validateField(subField, value);
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: {
          ...prevErrors[field],
          [subField]: error,
        },
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const validateDateField = (field) => {
        const { giorno, mese, anno } = formData[field];
        const errors = {};
        if (!mese) errors.mese = 'Il mese è obbligatorio.';
        if (!anno) errors.anno = "L'anno è obbligatorio.";
        if (giorno !== '' && (isNaN(giorno) || giorno < 1 || giorno > 31)) {
          errors.giorno = 'Inserire un giorno valido (1-31).';
        }
        return errors;
      };
  
      const dataInizioErrors = validateDateField('dataInizio');
      const dataFineErrors = validateDateField('dataFine');
  
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        dataInizio: dataInizioErrors,
        dataFine: dataFineErrors,
      }));
  
      const hasErrors =
        Object.values(dataInizioErrors).length > 0 || Object.values(dataFineErrors).length > 0;
  
      if (!hasErrors) {
        alert('Form inviato con successo!');
        console.log('Dati del form:', formData);
      }
    };
  

  return (
    <div className="nuovo-turno-container">
      {aziendaId ? <p>Azienda ID ricevuto: {aziendaId}</p> : <p>Errore: Azienda ID non disponibile.</p>}
      <div className="nuovo-turno-card">
        {/* Header con titolo */}
        <div className="nuovo-turno-header">
          <h2>Nuovo turno</h2>
          <button className="carica-file-button" onClick={handleCaricaClick}>
            Carica file
          </button>
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
                    <option key={giorno} value={giorno}>
                      {giorno}
                    </option>
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
                value={settori.filter((option) => formData.settori.includes(option.value))}
                onChange={(selectedOptions) => handleMultiSelectChange('settori', selectedOptions)}
                options={settori}
                isMulti
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
                value={materie.filter((option) => formData.materie.includes(option.value))}
                onChange={(selectedOptions) => handleMultiSelectChange('materie', selectedOptions)}
                options={materie}
                isMulti
                placeholder="Seleziona una o più materie"
                isSearchable
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