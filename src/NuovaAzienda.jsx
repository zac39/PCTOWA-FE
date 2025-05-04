import React, { useState } from 'react';
import './NuovaAzienda.css';

export default function NuovaAzienda() {
  const [codiceAteco, setCodiceAteco] = useState('');
  const [codiceAtecoError, setCodiceAtecoError] = useState('');

  const validateCodiceAteco = (value) => {
    const regex = /^\d{6}$/; // Accetta solo stringhe composte da 6 numeri.
    if (!regex.test(value)) {
      setCodiceAtecoError('Il codice Ateco deve essere composto da 6 numeri.');
    } else {
      setCodiceAtecoError('');
    }
  };
  

  const handleCodiceAtecoChange = (e) => {
    const value = e.target.value;
    setCodiceAteco(value);
    validateCodiceAteco(value);
  };

  const [partitaIVA, setPartitaIVA] = useState('');
  const [partitaIVAError, setPartitaIVAError] = useState('');

  const validatePartitaIVA = (value) => {
    const regex = /^\d{11}$/; // Accetta solo stringhe composte da 6 numeri.
    if (!regex.test(value)) {
        setPartitaIVAError('La partita IVA deve essere composto da 11 numeri.');
    } else {
        setPartitaIVAError('');
    }
  };
  

  const handlePartitaIVAChange = (e) => {
    const value = e.target.value;
    setPartitaIVA(value);
    validatePartitaIVA(value);
  };




  return (
    <div className="nuova-azienda-container">
      <div className="nuova-azienda-card">
        {/* Header con titolo */}
        <div className="nuova-azienda-header">
          <h2>Nuova azienda</h2>
          <button className="carica-file-button">Carica file</button>
        </div>

        {/* Contenitore scorrevole */}
        <div className="nuova-azienda-scrollable">
          <form className="nuova-azienda-form">
            {/* Input per Ragione Sociale */}
            <div className="azienda-form-group">
              <label htmlFor="ragioneSociale">Ragione Sociale</label>
              <input
                type="text"
                id="ragioneSociale"
                name="ragioneSociale"
                placeholder="Inserisci la ragione sociale"
                className="azienda-form-input"
              />
            </div>

            {/* Input per Codice Ateco */}
            <div className="azienda-form-group">
              <label htmlFor="codiceAteco">Codice Ateco</label>
              <input
                type="text"
                id="codiceAteco"
                name="codiceAteco"
                placeholder="Inserisci il codice Ateco"
                className="azienda-form-input"
                value={codiceAteco}
                onChange={handleCodiceAtecoChange}
              />
              {codiceAtecoError && <p className="error-message">{codiceAtecoError}</p>}
            </div>

            {/* Input per Partita IVA */}
            <div className="azienda-form-group">
              <label htmlFor="partitaIva">Partita IVA</label>
              <input
                type="text"
                id="partitaIva"
                name="partitaIva"
                placeholder="Inserisci la partita IVA"
                className="azienda-form-input"
                value={partitaIVA}
                onChange={handlePartitaIVAChange}
              />    
              {partitaIVAError && <p className="error-message">{partitaIVAError}</p>}

            </div>

            {/* Input per Telefono */}
            <div className="azienda-form-group">
              <label htmlFor="telefonoAzienda">Telefono</label>
              <input
                type="text"
                id="telefonoAzienda"
                name="telefonoAzienda"
                placeholder="Inserisci il numero di telefono"
                className="azienda-form-input"
              />
            </div>

            {/* Input per Email */}
            <div className="azienda-form-group">
              <label htmlFor="emailAzienda">Email</label>
              <input
                type="email"
                id="emailAzienda"
                name="emailAzienda"
                placeholder="Inserisci l'email aziendale"
                className="azienda-form-input"
              />
            </div>


          {/* Input per Fax */}
          <div className="azienda-form-group">
            <label htmlFor="faxAzienda">Fax</label>
            <input
              type="text"
              id="faxAzienda"
              name="faxAzienda"
              placeholder="Inserisci il fax aziendale"
              className="azienda-form-input"
            />
          </div>

          {/* Input per PEC */}
          <div className="azienda-form-group">
            <label htmlFor="pecAzienda">PEC</label>
            <input
              type="text"
              id="pecAzienda"
              name="pecAzienda"
              placeholder="Inserisci la PEC aziendale"
              className="azienda-form-input"
            />
          </div>

          {/* Input per Data Convenzione */}
          <div className="azienda-form-group">
            <label htmlFor="dataConvenzione">Data Convenzione</label>
            <input
              type="date"
              id="dataConvenzione"
              name="dataConvenzione"
              className="azienda-form-input"
            />
          </div>

          {/* Input per Scadenza Convenzione */}
          <div className="azienda-form-group">
            <label htmlFor="scadenzaConvenzione">Scadenza Convenzione</label>
            <input
              type="date"
              id="scadenzaConvenzione"
              name="scadenzaConvenzione"
              className="azienda-form-input"
            />
          </div>

          {/* Input per Categoria */}
          <div className="azienda-form-group">
            <label htmlFor="categoria">Categoria</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              placeholder="Inserisci la categoria"
              className="azienda-form-input"
            />
          </div>

          {/* Input per Indirizzo Logo */}
          <div className="azienda-form-group">
            <label htmlFor="indirizzoLogo">Indirizzo Logo</label>
            <input
              type="text"
              id="indirizzoLogo"
              name="indirizzoLogo"
              placeholder="Inserisci l'indirizzo del logo"
              className="azienda-form-input"
            />
          </div>

          {/* Input per Sito Web */}
          <div className="azienda-form-group">
            <label htmlFor="sitoWeb">Sito Web</label>
            <input
              type="url"
              id="sitoWeb"
              name="sitoWeb"
              placeholder="Inserisci il sito web"
              className="azienda-form-input"
            />
          </div>

          {/* Input per Forma Giuridica */}
          <div className="azienda-form-group">
            <label htmlFor="formaGiuridica">Forma Giuridica</label>
            <input
              type="text"
              id="formaGiuridica"
              name="formaGiuridica"
              placeholder="Inserisci la forma giuridica"
              className="azienda-form-input"
            />
          </div>


          </form>
        </div>

        {/* Bottone Crea */}
        <button type="submit" className="azienda-crea-button">
          Crea
        </button>
      </div>
    </div>
  );
}