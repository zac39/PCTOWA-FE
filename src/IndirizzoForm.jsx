import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './IndirizzoForm.css'; // Stile per la pagina

const IndirizzoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera i dati dell'azienda dalla pagina precedente
  const { turnoData } = location.state || {}; // Recupera i dati passati dalla pagina precedente

  // Dati degli indirizzi
  const addressData = [
    {
      stato: 'Italia',
      provincia: 'Verona',
      comune: 'Verona',
      cap: '37132',
      indirizzo: "Via Andrea d'Angeli 23",
    },
    {
      stato: 'Italia',
      provincia: 'Milano',
      comune: 'Milano',
      cap: '20100',
      indirizzo: 'Corso Buenos Aires 45',
    },
    {
      stato: 'Italia',
      provincia: 'Roma',
      comune: 'Roma',
      cap: '00100',
      indirizzo: 'Via del Corso 10',
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    stato: '',
    provincia: '',
    comune: '',
    cap: '',
    indirizzo: '',
  });

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

  const handleNextClick = () => {
    if (!selectedAddress && !showNewAddressForm) {
      alert('Per favore seleziona un indirizzo!');
    } else {
      const indirizzoData = showNewAddressForm
        ? newAddress // Usa i dati del nuovo indirizzo
        : addressData.find((address) => address.indirizzo === selectedAddress); // Usa l'indirizzo selezionato

      // Crea il JSON combinato
      const combinedData = {
        azienda: turnoData,
        indirizzo: indirizzoData,
      };

      console.log('Dati combinati:', combinedData);

      // Passa i dati combinati alla pagina TutorForm
      navigate('/tutorForm', { state: { combinedData } });
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