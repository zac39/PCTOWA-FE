import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');

  const handleLogin = async (e) => {
    onLoginSuccess();  // Vai avanti con il login riuscito

    // e.preventDefault();
    // setErrore('');

    // try {
    //   const res = await fetch('http://localhost:5000/api/v1/user/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await res.json();
    //   console.log('data ricevuto dal login:', data);  // Logga la risposta completa

    //   if (res.ok) {
    //     localStorage.setItem("access_token", data.access_token);  // Usa data.access_token, non data.token
    //     console.log('Access Token salvato:', data.access_token);  // Logga il token salvato
    //     onLoginSuccess();  // Vai avanti con il login riuscito
    //   } else {
    //     setErrore(data.message || 'Credenziali errate');
    //   }
    // } catch (err) {
    //   console.error('Errore di rete:', err);
    //   setErrore('Errore di rete');
    // }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Inserisci la tua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <a href="#" className="forgot-password">Password dimenticata</a>
          {errore && <p className="error-message">{errore}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;