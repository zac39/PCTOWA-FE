import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TutorForm.css'; // Stile per la pagina

const TutorForm = () => {
  const location = useLocation(); // Hook per ottenere lo stato passato
  const navigate = useNavigate();
  const { combinedData } = location.state || {}; // Recupera i dati passati dalla pagina precedente

  // Dati dei tutor
  const tutorData = [
    {
      idtutor: 1,
      nome: "David",
      cognome: "Rossi",
      telefono: "1234567890",
      email: "david.rossi@example.com",
    },
    {
      idtutor: 2,
      nome: "Laura",
      cognome: "Bianchi",
      telefono: "0987654321",
      email: "laura.bianchi@example.com",
    },
  ];

  const [selectedTutor, setSelectedTutor] = useState('');
  const [showNewTutorForm, setShowNewTutorForm] = useState(false);
  const [newTutor, setNewTutor] = useState({
    nome: '',
    cognome: '',
    telefono: '',
    email: '',
  });

  const handleTutorSelect = (e) => {
    setSelectedTutor(e.target.value);
  };

  const handleToggleNewTutorForm = () => {
    setShowNewTutorForm(!showNewTutorForm);
  };

  const handleNewTutorChange = (e) => {
    const { name, value } = e.target;
    setNewTutor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextClick = () => {
    if (!selectedTutor && !showNewTutorForm) {
      alert('Per favore seleziona un tutor!');
    } else {
      const tutorDetails = showNewTutorForm
        ? newTutor // Usa i dati del nuovo tutor
        : tutorData.find((tutor) => tutor.idtutor.toString() === selectedTutor); // Usa il tutor selezionato

      // Crea il JSON combinato con i dati del tutor come oggetto completo
      const completeData = {
        ...combinedData, // Dati provenienti dalla pagina precedente
        tutor: tutorDetails, // Dati del tutor scelto o aggiunto
      };

      console.log('Dati combinati:', completeData);

      // Naviga alla prossima pagina o gestisci i dati combinati
      // navigate('/prossimaPagina', { state: { combinedData } }); // Sostituisci "prossimaPagina" con la pagina desiderata
    }
  };

  return (
    <div className="tutor-form-container">
      <div className="tutor-form">
        <h2>Seleziona Tutor</h2>
        <div className="tutor-select-container">
          <select
            className="tutor-select"
            value={selectedTutor}
            onChange={handleTutorSelect}
            disabled={showNewTutorForm}
          >
            <option value="" disabled>
              Seleziona o cerca un tutor
            </option>
            {tutorData.map((tutor) => (
              <option key={tutor.idtutor} value={tutor.idtutor}>
                {tutor.nome} {tutor.cognome}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="tutor-add-btn"
            onClick={handleToggleNewTutorForm}
          >
            {showNewTutorForm ? '-' : '+'}
          </button>
        </div>

        {showNewTutorForm && (
          <div className="new-tutor-form">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={newTutor.nome}
              onChange={handleNewTutorChange}
            />
            <input
              type="text"
              name="cognome"
              placeholder="Cognome"
              value={newTutor.cognome}
              onChange={handleNewTutorChange}
            />
            <input
              type="text"
              name="telefono"
              placeholder="Telefono"
              value={newTutor.telefono}
              onChange={handleNewTutorChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newTutor.email}
              onChange={handleNewTutorChange}
            />
          </div>
        )}

        <button
          type="button"
          className="tutor-next-btn"
          onClick={handleNextClick}
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default TutorForm;