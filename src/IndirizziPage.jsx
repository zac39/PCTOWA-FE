import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IndirizziPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login'; // Nessun token -> torna al login
        return;
      }

      try {
        const response = await axios.get('http://zacserv.duckdns.org:5000/api/v1/address', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAddresses(response.data.message); // <-- Qui metti gli indirizzi nello state
      } catch (err) {
        console.error(err);
        setError('Errore nel caricamento degli indirizzi.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  if (loading) return <p>Caricamento indirizzi...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista indirizzi</h2>
      {addresses.length === 0 ? (
        <p>Nessun indirizzo trovato.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Stato</th>
              <th>Provincia</th>
              <th>Comune</th>
              <th>CAP</th>
              <th>Indirizzo</th>
              <th>ID Azienda</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr key={address.idIndirizzo}>
                <td>{address.idIndirizzo}</td>
                <td>{address.stato}</td>
                <td>{address.provincia}</td>
                <td>{address.comune}</td>
                <td>{address.cap}</td>
                <td>{address.indirizzo}</td>
                <td>{address.idAzienda}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IndirizziPage;
