import React, { useState } from 'react';
import Login from './Login';

function App() {
  const [autenticato, setAutenticato] = useState(
    !!localStorage.getItem('token') // controlla se esiste già un token
  );

  return (
    <div>
      {autenticato ? (
        <h1>Benvenuto! 🎉</h1>
      ) : (
        <Login onLoginSuccess={() => setAutenticato(true)} />
      )}
    </div>
  );
}

export default App;