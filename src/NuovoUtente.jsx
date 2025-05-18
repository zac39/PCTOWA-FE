import React, { useState, useEffect } from 'react';
import './NuovoUtente.css';
import { useNavigate, useLocation } from 'react-router-dom';

const roles = [
  { value: 'docente', label: 'Docente' },
  { value: 'tutor', label: 'Tutor' },
  { value: 'supertutor', label: 'SuperTutor' },
  { value: 'admin', label: 'Admin' },
];

const roleMapping = {
  0: 'admin',
  1: 'docente',
  2: 'tutor',
  3: 'supertutor',
};

const NuovoUtente = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: '',
    ruolo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      ruolo: e.target.value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nome) newErrors.name = 'Il nome è obbligatorio';
    if (!formData.cognome) newErrors.surname = 'Il cognome è obbligatorio';
    if (!formData.email) {
      newErrors.email = "L'email è obbligatoria";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "L'email non è valida";
    }
    if (!formData.password) {
      newErrors.password = 'La password è obbligatoria';
    }
    if (!formData.ruolo) newErrors.ruolo = 'Il ruolo è obbligatorio';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("Token di accesso non trovato. Effettua il login.");
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/v1/user', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }

        const data = await response.json();
        alert('Utente creato con successo!');
        console.log('Risposta API:', data);
      } catch (error) {
        console.error("Errore durante la creazione dell'utente:", error);
        alert("Errore durante la creazione dell'utente.");
      }
    }
  };

  return (
    <div className="nuovo-utente-form-container">
      <form className="nuovo-utente-form" onSubmit={handleSubmit}>
        <h2>{'Crea Nuovo Utente'}</h2>

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

        <button type="submit" className="invio-btn">
          {'Crea Utente'}
        </button>
      </form>
    </div>
  );
};

export default NuovoUtente;