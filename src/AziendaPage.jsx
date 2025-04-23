import React from 'react';
import { useParams } from 'react-router-dom';

export default function AziendaPage() {
  const { idAzienda } = useParams(); // Ottieni l'ID dell'azienda dalla rotta

  return (
    <div>
      <h1>Dettagli Azienda</h1>
      <p>ID Azienda: {idAzienda}</p>
    </div>
  );
}