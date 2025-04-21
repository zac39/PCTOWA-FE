import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrore('');

    try {
      const res = await fetch('http://zacserv.duckdns.org:5000/api/v1/user/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        onLoginSuccess(); // passiamo al prossimo step
      } else {
        setErrore(data.message || 'Credenziali errate');
      }
    } catch (err) {
      console.error('Errore di rete:', err);
      setErrore('Errore di rete');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {errore && <p style={{ color: 'red' }}>{errore}</p>}
    </form>
  );
}

export default Login;