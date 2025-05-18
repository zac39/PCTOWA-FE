import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TutorForm.css'; // Stile per la pagina

const TutorForm = () => {
  const location = useLocation(); // Hook per ottenere lo stato passato
  const navigate = useNavigate();
  const { combinedData } = location.state || {}; // Recupera i dati passati dalla pagina precedente

  console.log(combinedData);
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
    id_azienda: localStorage.getItem("id_azienda"),
    id_turno: localStorage.getItem("id_turno"),
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

  const handleNextClick = async () => {
    if (!selectedTutor && !showNewTutorForm) {
      alert('Per favore seleziona un tutor!');
    } else {
      if (selectedTutor){

      }else{
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
            }
           
        try {
        const response = await fetch('http://localhost:5000/api/v1/tutor', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTutor),
        });
  
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
  
        const data = await response.json();
        alert('Azienda creata con successo!');
        console.log('Risposta API:', data);
        //const location=data.location;
        //const id_tutor=location.substring(location.lastIndexOf("/") + 1); 
  
      } catch (error) {
        console.error('Errore durante la creazione dell\'azienda:', error);
        alert('Si è verificato un errore durante la creazione dell\'azienda.');
      }
      console.log('Form valido, navigazione verso NuovoIndirizzo');

      }


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