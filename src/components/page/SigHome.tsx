import axios from 'axios';
import React, { useState } from 'react';

export function SigHome() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios({
      method: 'POST',
      data: {
        username: email,
        password: password,
      },
      withCredentials: true,

      url: `#/login`,
    })
      .then((res) => {
        localStorage.setItem('user', res.data._id);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  console.log('Login Info:', { email, password });

  return (
    <div
      style={{
        maxWidth: '300px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
      }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
