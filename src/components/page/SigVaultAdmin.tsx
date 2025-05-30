import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function SigVaultAdmin() {
  const [, setData] = useState([]);

  const [account, setAccount] = useState('');
  const [private_owner, setOwner] = useState('');
  const [private_active, setActive] = useState('');
  const [private_posting, setPosting] = useState('');
  const [private_memo, setMemo] = useState('');
  const baseURL = 'http://localhost:3000/sigvault';
  // const baseURL = process.env.REACT_APP_BASE_URL; // Fallback URL
  const dbURL = process.env.REACT_APP_DB_URL; // Fallback UR

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(process.env);
    event.preventDefault();
    axios({
      method: 'POST',
      url: baseURL,
      data: {
        account: account,
        private_owner_key: private_owner,
        private_active_key: private_active,
        private_posting_key: private_posting,
        private_memo_key: private_memo,
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
    <>
      <h1>ADMIN page</h1>
      <div
        style={{
          maxWidth: '300px',
          margin: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
        }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>account:</label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>private_owner_key:</label>
            <input
              type="password"
              value={private_owner}
              onChange={(e) => setOwner(e.target.value)}
              required
            />
          </div>
          <div>
            <label> private_active_key:</label>
            <input
              type="password"
              value={private_active}
              onChange={(e) => setActive(e.target.value)}
              required
            />
          </div>
          <div>
            <label> private_posting_key:</label>
            <input
              type="password"
              value={private_posting}
              onChange={(e) => setPosting(e.target.value)}
              required
            />
          </div>
          <div>
            <label> private_memo_key:</label>
            <input
              type="password"
              value={private_memo}
              onChange={(e) => setMemo(e.target.value)}
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
    </>
  );
}
