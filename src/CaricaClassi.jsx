import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './CaricaClassi.css';

export default function CaricaClassi() {
  const [files, setFiles] = useState([]); // Stato per memorizzare la lista dei file caricati
  const [parsedData, setParsedData] = useState([]); // Stato per memorizzare i dati JSON dal CSV
  const navigate = useNavigate(); // Hook per la navigazione

  function handleManualeClick() {
    navigate(`/nuovaClasse`); // Naviga alla pagina NuovaClasse
  }

  // Gestione degli eventi di drag & drop
  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === 'dragenter' || event.type === 'dragover') {
      event.currentTarget.classList.add('drag-active');
    } else if (event.type === 'dragleave') {
      event.currentTarget.classList.remove('drag-active');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('drag-active');

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const uploadedFiles = Array.from(event.dataTransfer.files).filter((file) =>
        file.name.endsWith('.csv')
      ); // Accetta solo file CSV
      if (uploadedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      } else {
        alert('Carica solo file CSV!');
      }
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFiles = Array.from(event.target.files).filter((file) =>
        file.name.endsWith('.csv')
      ); // Accetta solo file CSV
      if (uploadedFiles.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
      } else {
        alert('Carica solo file CSV!');
      }
    }
  };

  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleCaricaClick = async () => {
    const jsonResults = [];
    for (const file of files) {
      const text = await file.text(); // Legge il contenuto del file
      const rows = text.split('\n'); // Divide il file in righe
      const headers = rows[0].split(','); // Estrae le intestazioni dalla prima riga

      const jsonData = rows.slice(1).map((row) => {
        const values = row.split(',');
        return headers.reduce((acc, header, index) => {
          acc[header.trim()] = values[index]?.trim();
          return acc;
        }, {});
      });

      jsonResults.push(...jsonData); // Aggiunge i dati JSON
    }

    setParsedData(jsonResults); // Salva i dati JSON nello stato
    console.log('Dati JSON:', jsonResults); // Stampa i dati JSON nella console
    alert('File processati e convertiti in JSON!');
    //TODO: vedi cosa farci con sti dati json 
  };

  return (
    <div className="carica-classi-container">
      <div className="carica-classi-card">
        <button
          className="inserimento-manuale-button"
          onClick={() => handleManualeClick()} // Naviga alla pagina NuovaClasse
        >
          Inserimento Manuale
        </button>

        {/* Sezione per il caricamento dei file */}
        <div
          className="file-upload-section"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <label htmlFor="file-upload" className="file-upload-label">
            <span>Trascina i file CSV qui o clicca per caricare</span>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              className="file-upload-input"
              onChange={handleFileChange}
              multiple // Permette il caricamento di più file
              accept=".csv" // Accetta solo file CSV
            />
          </label>
        </div>

        {/* Lista dei file caricati */}
        {files.length > 0 && (
          <div className="file-list">
            <h4>File caricati:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index} className="file-item">
                  <span>{file.name}</span>
                  <button
                    className="remove-file-button"
                    onClick={() => handleRemoveFile(file.name)}
                  >
                    Rimuovi
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="carica-button" onClick={handleCaricaClick}>
          Carica
        </button>
      </div>
    </div>
  );
}