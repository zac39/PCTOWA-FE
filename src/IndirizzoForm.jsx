import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './IndirizzoForm.css'; // Stile per la pagina

const IndirizzoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera i dati dell'azienda dalla pagina precedente
  const { turnoData } = location.state || {}; // Recupera i dati passati dalla pagina precedente

    const [selectedAddress, setSelectedAddress] = useState('');
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
      stato: '',
      provincia: '',
      comune: '',
      cap: '',
      indirizzo: '',
      id_indirizzo: ''
    });
    const [addressData, setAddress] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const aziendaId = localStorage.getItem("id_azienda");
  
    useEffect(() => {
      // Funzione per recuperare i dati dell'azienda tramite API
      const fetchAziendaData = async () => {
        try {
          // Configura l'header con il token access_data
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) {
            throw new Error("Token di accesso non trovato. Effettua il login.");
          }
  
          const response = await fetch(`http://localhost:5000/api/v1/address/${aziendaId}`, {
            method: "GET", // Metodo HTTP
            headers: {
              "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
            },
          });
  
          if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
          }
  
          const data = await response.json();
          setAddress(data); // Salva i dati ricevuti nello stato
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

        fetchAziendaData();
        console.log("aggiornato");
      }, []);

    console.log(addressData);

  if (isLoading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }   


  const handleAddressSelect = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleToggleNewAddressForm = () => {
    setShowNewAddressForm(!showNewAddressForm);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextClick = async () => {
    if (!selectedAddress && !showNewAddressForm) {
      alert('Per favore seleziona un indirizzo!');
    } else {
      const indirizzoData = showNewAddressForm
        ? newAddress // Usa i dati del nuovo indirizzo
        : addressData.find((address) => address.indirizzo === selectedAddress); // Usa l'indirizzo selezionato

      // Crea il JSON combinato
      const combinedData = {
        azienda: turnoData,
        id_indirizzo: indirizzoData.id_indirizzo,
      };

        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
            }
           
        const newTurn = {
          data_inizio: combinedData.azienda.turno.data_inizio,
          data_fine: combinedData.azienda.turno.data_fine,
          posti: combinedData.azienda.turno.posti,
          ore: combinedData.azienda.turno.ore,
          id_azienda: localStorage.getItem("id_azienda"),
          id_indirizzo: indirizzoData.id_indirizzo,
          ora_inizio: combinedData.azienda.turno.ora_inizio,
          ora_fine: combinedData.azienda.turno.ora_fine,
          giorno_inizio: combinedData.azienda.turno.giorno_inizio,
          giorno_fine: combinedData.azienda.turno.giorno_fine,
          settori: combinedData.azienda.turno.settori,
          materie: combinedData.azienda.turno.materie
        };
        
        try {
        const response = await fetch('http://localhost:5000/api/v1/turn', {
          method: 'POST',
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTurn),
        });
  
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
  
        const data = await response.json();
        alert('Azienda creata con successo!');
        console.log('Risposta API:', data);
        const location=data.location;
        const id_turno=location.substring(location.lastIndexOf("/") + 1); // → "8"
        localStorage.setItem("id_turno", id_turno);
        console.log(id_turno)
  
      } catch (error) {
        console.error('Errore durante la creazione dell\'azienda:', error);
        alert('Si è verificato un errore durante la creazione dell\'azienda.');
      }
      console.log('Form valido, navigazione verso NuovoIndirizzo');

      console.log('Dati combinati:', combinedData);

      // Passa i dati combinati alla pagina TutorForm
      navigate('/tutorForm');
    }
  };

  return (
    <div className="indirizzo-form-container">
      <div className="indirizzo-form">
        <h2>Inserisci Indirizzo</h2>
        <div className="indirizzo-select-container">
          <select
            className="indirizzo-select"
            value={selectedAddress}
            onChange={handleAddressSelect}
            disabled={showNewAddressForm}
          >
            <option value="" disabled>
              Seleziona o cerca un indirizzo
            </option>
            {addressData.map((address, index) => (
              <option key={index} value={address.indirizzo}>
                {address.indirizzo}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="indirizzo-add-btn"
            onClick={handleToggleNewAddressForm}
          >
            {showNewAddressForm ? '-' : '+'}
          </button>
        </div>

        {showNewAddressForm && (
          <div className="new-address-form">
            <input
              type="text"
              name="stato"
              placeholder="Stato"
              value={newAddress.stato}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="provincia"
              placeholder="Provincia"
              value={newAddress.provincia}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="comune"
              placeholder="Comune"
              value={newAddress.comune}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="cap"
              placeholder="CAP"
              value={newAddress.cap}
              onChange={handleNewAddressChange}
            />
            <input
              type="text"
              name="indirizzo"
              placeholder="Indirizzo"
              value={newAddress.indirizzo}
              onChange={handleNewAddressChange}
            />
          </div>
        )}

        <button
          type="button"
          className="indirizzo-next-btn"
          onClick={handleNextClick}
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default IndirizzoForm;