import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa il hook per la navigazione

import './NuovaAzienda.css';

export default function NuovaAzienda() {
  const navigate = useNavigate(); // Hook per la navigazione
  const location = useLocation(); // Hook per ottenere i dati passati tramite stato
  const aziendaData = location.state?.azienda || {}; // Recupera i dati dell'azienda o un oggetto vuoto

  const [formData, setFormData] = useState({
    codice_ateco: '',
    partita_iva: '',
    telefono_azienda: '',
    email_azienda: '',
    fax: '',
    pec: '',
    ragione_sociale: '',
    sito_web: '',
    forma_giuridica: '',
    categoria: '',
    indirizzo_logo: '',
    data_convenzione: '',
    scadenza_convenzione: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Popola i campi con i dati di aziendaData all'inizio, solo quando il componente viene montato
  useEffect(() => {
    if (aziendaData) {
      setFormData((prevData) => ({
        ...prevData,
        ...aziendaData,
      }));
    }
  }, []); // Dipendenza vuota per assicurarsi che venga eseguito solo al primo render

  // Validazione dinamica
  const validateField = (name, value) => {
    let error = '';

    const validators = {
      codice_ateco: /^\d{6}$/, // Deve essere composto da 6 numeri
      partita_iva: /^\d{11}$/, // Deve essere composto da 11 numeri
      telefono_azienda: /^(\+39\s?)?(\d{3}\s?\d{3}\s?\d{4})$/, // Formato telefono
      fax: /^(\+39\s?)?(\d{3}\s?\d{3}\s?\d{4})$/, // Stessa regex di telefono
      email_azienda: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, // Email valida
      pec: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, // Stessa regex di email
      sito_web: /^(https?:\/\/)?([\w\-]+\.)+[\w-]{2,}(\:[0-9]+)?(\/.*)?$/, // URL valido
      indirizzo_logo: /^(https?:\/\/)?([\w\-]+\.)+[\w-]{2,}(\:[0-9]+)?(\/.*)?$/, // URL valido
    };

    if (validators[name] && !validators[name].test(value)) {
      switch (name) {
        case 'codice_ateco':
          error = 'Il codice Ateco deve essere composto da 6 numeri.';
          break;
        case 'partita_iva':
          error = 'La partita IVA deve essere composta da 11 numeri.';
          break;
        case 'telefono_azienda':
          error = 'Inserire un numero di telefono valido.';
          break;
        case 'fax':
          error = 'Inserire un numero di fax valido.';
          break;
        case 'email_azienda':
          error = "Inserire un'email valida.";
          break;
        case 'pec':
          error = "Inserire una PEC valida.";
          break;
        case 'sito_web':
          error = "Inserire un URL valido.";
          break;
        case 'indirizzo_logo':
          error = "Inserire un URL valido.";
          break;
        default:
          error = `Il campo ${name} non è valido.`;
      }
    }

    return error;
  };

  // Gestione dinamica del cambiamento degli input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Aggiorna il valore dell'input
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Valida il campo
    const error = validateField(name, value);

    // Aggiorna gli errori
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Gestione del click su Successivo
  const handleCreaClick = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setFormErrors(newErrors);

    const modifica = Boolean(location.state?.azienda); // Determina se è una modifica

    const formDataToSend = {
      modifica, // Indica se è una modifica o una nuova azienda
      azienda: formData, // Dati dell'azienda aggiornati
    };

    // Se non ci sono errori, naviga verso NuovoIndirizzo e invia i dati
    if (Object.keys(newErrors).length === 0) {
      console.log('Form valido, navigazione verso NuovoIndirizzo');
      navigate('/nuovoIndirizzo', { state: { formData: formDataToSend } }); // Passa i dati del form come stato
    }
  };

  return (
    <div className="nuova-azienda-container">
      <div className="nuova-azienda-card">
        {/* Header con titolo */}
        <div className="nuova-azienda-header">
          <h2>{location.state?.azienda ? 'Modifica azienda' : 'Nuova azienda'}</h2>
          <button
            className="carica-file-button"
            onClick={() => navigate('/caricaClassi', { state: { from: 'nuovaAzienda' } })}
          >
            Carica file
          </button>
        </div>

        {/* Contenitore scorrevole */}
        <div className="nuova-azienda-scrollable">
          <form className="nuova-azienda-form" onSubmit={handleCreaClick}>
            {[
              { label: 'Ragione Sociale', name: 'ragione_sociale', type: 'text', placeholder: 'Inserisci la ragione sociale' },
              { label: 'Codice Ateco', name: 'codice_ateco', type: 'text', placeholder: 'Inserisci il codice Ateco' },
              { label: 'Partita IVA', name: 'partita_iva', type: 'text', placeholder: 'Inserisci la partita IVA' },
              { label: 'Telefono', name: 'telefono_azienda', type: 'text', placeholder: 'Inserisci il numero di telefono' },
              { label: 'Email', name: 'email_azienda', type: 'email', placeholder: 'Inserisci l\'email aziendale' },
              { label: 'Sito Web', name: 'sito_web', type: 'url', placeholder: 'Inserisci il sito web' },
              { label: 'Fax', name: 'fax', type: 'text', placeholder: 'Inserisci il fax aziendale' },
              { label: 'PEC', name: 'pec', type: 'text', placeholder: 'Inserisci la PEC aziendale' },
              { label: 'Data Convenzione', name: 'data_convenzione', type: 'date' },
              { label: 'Scadenza Convenzione', name: 'scadenza_convenzione', type: 'date' },
              { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Inserisci la categoria' },
              { label: 'Indirizzo Logo', name: 'indirizzo_logo', type: 'text', placeholder: 'Inserisci l\'indirizzo del logo' },
              { label: 'Forma Giuridica', name: 'forma_giuridica', type: 'text', placeholder: 'Inserisci la forma giuridica' },
            ].map((field) => (
              <div className="azienda-form-group" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder || ''}
                  className="azienda-form-input"
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                />
                {formErrors[field.name] && <p className="error-message">{formErrors[field.name]}</p>}
              </div>
            ))}
          </form>
        </div>

        {/* Bottone Successivo */}
        <div className="azienda-crea-button-container">
          <button type="submit" className="azienda-crea-button" onClick={handleCreaClick}>
            Successivo
          </button>
        </div>
      </div>
    </div>
  );
}