import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa il hook per i parametri della rotta
import { useNavigate } from 'react-router-dom'; // Importa il hook per la navigazione
import './ContattiPage.css';

export default function ViscontattiPage() {
  const { aziendaId } = useParams(); // Ottieni l'ID dell'azienda dalla rotta
  const navigate = useNavigate(); // Hook per la navigazione
  const [contatti, setContatti] = useState([]);
  const [azienda, setAzienda] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funzione per recuperare i dati dell'azienda tramite API
    const fetchContattiData = async () => {
      try {
        // Configura l'header con il token access_data
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
        }

        const response = await fetch(`http://localhost:5000/api/v1/contact/${aziendaId}`, {
          method: "GET", // Metodo HTTP
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
          },
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setContatti(data); // Salva i dati ricevuti nello stato
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAziendaData = async () => {
      try {
        // Configura l'header con il token access_data
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("Token di accesso non trovato. Effettua il login.");
        }

        const response = await fetch(`http://localhost:5000/api/v1/company/${aziendaId}`, {
          method: "GET", // Metodo HTTP
          headers: {
            "Authorization": `Bearer ${accessToken}`, // Aggiunge il token all'header
          },
        });

        if (!response.ok) {
          throw new Error(`Errore: ${response.status}`);
        }

        const data = await response.json();
        setAzienda(data); // Salva i dati ricevuti nello stato
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };    

    fetchAziendaData();
    fetchContattiData();
  }, [aziendaId]);

  console.log(azienda); // Logga i contatti per il debug
  console.log(contatti);

  if (isLoading) {
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }

  if (!contatti || contatti.length === 0) {
    return <p>Nessun contatto disponibile.</p>;
  }

  function handleAziendaClick(id) {
    navigate(`/azienda/${id}`); // Naviga alla pagina dell'azienda passando l'ID
  }

  return (
    <div className="contatto-container">
      {contatti.map((contatto) => (
        <div className="contatto-card" key={contatto.id_contatto}>
          <div className="contatto-header">
            {/* Informazioni contatto */}
            <div className="contatto-info">
              <h2
                className="contatto-title"
                onClick={() => handleAziendaClick(contatto.id_azienda)} // Naviga alla pagina dell'azienda
                style={{
                  cursor: 'pointer',
                  color: 'var(--text-color)',
                  textDecoration: 'underline',
                }} // Stile per enfatizzare il link
              >
                {azienda.ragione_sociale}
              </h2>
              <p className="contatto-name">
                {`${contatto.nome} ${contatto.cognome}`}
              </p>
            </div>
          </div>

          {/* Dati Extra */}
          <div className="contatto-dati">
            <p><strong>Ruolo:</strong> {contatto.ruolo || "Non specificato"}</p>
            <p><strong>Telefono:</strong> {contatto.telefono}</p>
            <p><strong>Email:</strong> {contatto.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}