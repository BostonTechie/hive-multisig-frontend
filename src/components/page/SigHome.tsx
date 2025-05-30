import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function SigHome() {
  const [email, setEmail] = useState('');
  const [dataMine, setData] = useState([]);
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const baseURL = 'http://localhost:3000/';
  // const baseURL = process.env.REACT_APP_BASE_URL; // Fallback URL
  const dbURL = process.env.REACT_APP_DB_URL; // Fallback UR

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(process.env);
    event.preventDefault();
    axios({
      method: 'POST',
      url: baseURL,
      data: {
        email: email,
        password: password,
        verifyPassword: verifyPassword,
      },
      withCredentials: true,
    })
      // .then((res) => {
      //   localStorage.setItem('user', res.data._id);
      // })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  console.log('Login Info:', { email, password });

  useEffect(() => {
    console.log(process.env, 'env');

    if (!baseURL) {
      console.error('BASE_URL is undefined! Check your .env configuration.');
      return;
    }

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
      </form>

      <div>
        {/* <h1>What's up, {JSON.stringify(dataMine)}</h1> */}
        <p>Base URL: {baseURL} here</p>
      </div>
    </div>
  );
}
