import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa il hook per la navigazione
import Select from 'react-select'; // Importa il componente Select da react-select

import './NuovoTurno.css';


export default function NuovoTurno() {
  const navigate = useNavigate(); // Hook per la navigazione
  const location = useLocation(); // Ottieni l'oggetto location
  const aziendaId = location.state?.aziendaId; // Accedi a aziendaId dallo stato

  const [formData, setFormData] = useState({
    data_inizio: '',
    data_fine: '',
    posti: '',
    ore: '',
    ora_inizio: '',
    ora_fine: '',
    giorno_inizio: '',
    giorno_fine: '',

  //TDOO: nel back questi si chiamano settore e materia e non sono array, prima di vedere se funziona vedi se il back e a posto
    settori: [], // Cambiato da stringa a array per supportare selezioni multiple
    materie: [], // Nuovo campo per le materie
  });

  const settori = [
    { value: 'Informatica', label: 'Informatica' },
    { value: 'Telecomunicazioni', label: 'Telecomunicazioni' },
    { value: 'Logistica', label: 'Logistica' },
    { value: 'Elettronica', label: 'Elettronica' },
    { value: 'Costruzione del mezzo', label: 'Costruzione del mezzo' },
  ];

  const materie = [
    { value: 'Sistemista', label: 'Sistemista' },
    { value: 'Fisica', label: 'Fisica' },
    { value: 'Chimica', label: 'Chimica' },
    { value: 'Informatica', label: 'Informatica' },
    { value: 'Elettronica', label: 'Elettronica' },
    { value: 'Letteratura', label: 'Letteratura' },
    { value: 'Storia', label: 'Storia' },
    { value: 'Geografia', label: 'Geografia' },
    { value: 'Biologia', label: 'Biologia' },
    { value: 'Educazione fisica', label: 'Educazione fisica' },
  ];

  const giorniSettimana = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crea un oggetto JSON dei dati da passare
    const turnoData = {
      turno: formData,
      aziendaId, // Aggiungi aziendaId al JSON
    };

    console.log('Dati del turno inviati:', turnoData);

    // Naviga verso TutorForm passando i dati del turno come stato
    navigate('/IndirizzoForm', { state: { turnoData } });
  };

  return (
    <div className="nuovo-turno-container">
      <div className="nuovo-turno-card">
        <div className="nuovo-turno-header">
          <h2>Nuovo Turno</h2>
        </div>

        <div className="nuovo-turno-scrollable">
          <form className="nuovo-turno-form" onSubmit={handleSubmit}>
            {[{ label: 'Data Inizio', name: 'data_inizio', type: 'date' },
              { label: 'Data Fine', name: 'data_fine', type: 'date' },
              { label: 'Posti', name: 'posti', type: 'number', placeholder: 'Inserisci il numero di posti' },
              { label: 'Ore', name: 'ore', type: 'number', placeholder: 'Inserisci il numero di ore' },
              { label: 'Ora Inizio', name: 'ora_inizio', type: 'time' },
              { label: 'Ora Fine', name: 'ora_fine', type: 'time' },
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
              </div>
            ))}

            {[{ label: 'Giorno Inizio', name: 'giorno_inizio' },
              { label: 'Giorno Fine', name: 'giorno_fine' },
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
              </div>
            ))}

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
            </div>

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
            </div>
          </form>
        </div>

        <div className="turno-successivo-button-container">
          <button type="button" className="turno-successivo-button" onClick={handleSubmit}>
            Successivo
          </button>
        </div>
      </div>
    </div>
  );
}