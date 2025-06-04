import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function SigHome() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showVerify, setShowVerify] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setData(response.data);
        console.log('Fetching from:', baseURL);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        baseURL,
        { email, password, verifyPassword },
        { withCredentials: true },
      )
      .then((response) => console.log('Success:', response.data))
      .catch((err) => console.error('Request failed:', err));
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setVerifyPassword('');
    setShowVerify(false);
  };

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
            onChange={(e) => {
              setPassword(e.target.value);
              setShowVerify(e.target.value.length > 0);
            }}
            required
          />
        </div>

        <div>
          <label>Verify Password:</label>
          <input
            type="password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register here</button>
        <button
          type="button"
          onClick={handleClear}
          style={{ marginLeft: '10px' }}>
          Clear All
        </button>
      </form>

      <div>
        <p>Base URL: {baseURL} here</p>
      </div>
    </div>
  );
}
