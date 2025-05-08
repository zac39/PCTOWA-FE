import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione

import './NuovaAzienda.css';

export default function NuovaAzienda() {

  const navigate = useNavigate(); // Hook per la navigazione

  function handleCaricaClick() {
    navigate('/caricaClassi', { state: { from: 'nuovaAzienda' } }); // Passa lo stato "from" con valore "nuovaAzienda"
  }

  const [formData, setFormData] = useState({
    codiceAteco: '',
    partitaIVA: '',
    telefono: '',
    email: '',
    fax: '',
    pec: '',
    ragioneSociale: '',
    sitoWeb: '',
    formaGiuridica: '',
    categoria: '',
    indirizzoLogo: '',
    dataConvenzione: '',
    scadenzaConvenzione: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Validazione dinamica
  const validateField = (name, value) => {
    let error = '';

    const validators = {
      codiceAteco: /^\d{6}$/, // Deve essere composto da 6 numeri
      partitaIVA: /^\d{11}$/, // Deve essere composto da 11 numeri
      telefono: /^(\+39\s?)?(\d{3}\s?\d{3}\s?\d{4})$/, // Formato telefono
      fax: /^(\+39\s?)?(\d{3}\s?\d{3}\s?\d{4})$/, // Stessa regex di telefono
      email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, // Email valida
      pec: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/, // Stessa regex di email
      sitoWeb: /^(https?:\/\/)?([\w\-]+\.)+[\w-]{2,}(\:[0-9]+)?(\/.*)?$/, // URL valido
      indirizzoLogo: /^(https?:\/\/)?([\w\-]+\.)+[\w-]{2,}(\:[0-9]+)?(\/.*)?$/, // URL valido
      // Aggiungi ulteriori validatori se necessario
    };

    if (validators[name] && !validators[name].test(value)) {
      switch (name) {
        case 'codiceAteco':
          error = 'Il codice Ateco deve essere composto da 6 numeri.';
          break;
        case 'partitaIVA':
          error = 'La partita IVA deve essere composta da 11 numeri.';
          break;
        case 'telefono':
          error = 'Inserire un numero di telefono valido.';
          break;
        case 'fax':
          error = 'Inserire un numero di fax valido.';
          break;
        case 'email':
          error = "Inserire un'email valida.";
          break;
        case 'pec':
          error = "Inserire una PEC valida.";
          break;
        case 'sitoWeb':
          error = "Inserire un URL valido.";
          break;
        case 'indirizzoLogo':
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
  
    setFormErrors(newErrors);

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Token di accesso non trovato. Effettua il login.");
    }
  
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/v1/company', {
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
    }
  };
  

  return (
    <div className="nuova-azienda-container">
      <div className="nuova-azienda-card">
        {/* Header con titolo */}
        <div className="nuova-azienda-header">
          <h2>Nuova azienda</h2>
          <button className="carica-file-button"
            onClick={() => handleCaricaClick()} // Gestisce il click sul pulsante "Turni"
          >Carica file</button>
        </div>

        {/* Contenitore scorrevole */}
        <div className="nuova-azienda-scrollable">
          <form className="nuova-azienda-form" onSubmit={handleSubmit}>
            {/* Esempio di input dinamico */}
            {[
              { label: 'Ragione Sociale', name: 'ragioneSociale', type: 'text', placeholder: 'Inserisci la ragione sociale' },
              { label: 'Codice Ateco', name: 'codiceAteco', type: 'text', placeholder: 'Inserisci il codice Ateco' },
              { label: 'Partita IVA', name: 'partitaIVA', type: 'text', placeholder: 'Inserisci la partita IVA' },
              { label: 'Telefono', name: 'telefono', type: 'text', placeholder: 'Inserisci il numero di telefono' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Inserisci l\'email aziendale' },
              { label: 'Sito Web', name: 'sitoWeb', type: 'url', placeholder: 'Inserisci il sito web' },
              { label: 'Fax', name: 'fax', type: 'text', placeholder: 'Inserisci il fax aziendale' },
              { label: 'PEC', name: 'pec', type: 'text', placeholder: 'Inserisci la PEC aziendale' },
              { label: 'Data Convenzione', name: 'dataConvenzione', type: 'date' },
              { label: 'Scadenza Convenzione', name: 'scadenzaConvenzione', type: 'date' },
              { label: 'Categoria', name: 'categoria', type: 'text', placeholder: 'Inserisci la categoria' },
              { label: 'Indirizzo Logo', name: 'indirizzoLogo', type: 'text', placeholder: 'Inserisci l\'indirizzo del logo' },
              { label: 'Forma Giuridica', name: 'formaGiuridica', type: 'text', placeholder: 'Inserisci la forma giuridica' },
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

        {/* Bottone Crea sempre visibile */}
        <div className="azienda-crea-button-container">
          <button type="submit" className="azienda-crea-button" onClick={handleSubmit}>
            Crea
          </button>
        </div>
      </div>
    </div>
  );
}