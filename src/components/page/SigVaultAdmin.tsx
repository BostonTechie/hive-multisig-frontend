import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function SigVaultAdmin() {
  const [, setData] = useState([]);

  const [account, setAccount] = useState('');
  const [keys, setKeys] = useState({
    private_owner: '',
    private_active: '',
    private_posting: '',
    private_memo: '',
    public_owner: '',
    public_active: '',
    public_posting: '',
    public_memo: '',
  });

  const baseURL = 'http://localhost:3000/sigvault';
  // const baseURL = process.env.REACT_APP_BASE_URL; // Fallback URL
  const dbURL = process.env.REACT_APP_DB_URL; // Fallback UR

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(process.env);
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken'); // 🔐 Retrieve the stored access token

      const response = await axios({
        method: 'POST',
        url: baseURL,
        headers: { Authorization: `Bearer ${token}` }, // 🔐 Attach token
        data: {
          account: account,
          private_owner_key: keys.private_owner,
          private_active_key: keys.private_active,
          private_posting_key: keys.private_posting,
          private_memo_key: keys.private_memo,
          public_owner_key: keys.public_owner,
          public_active_key: keys.public_active,
          public_posting_key: keys.public_posting,
          public_memo_key: keys.public_memo,
        },
        withCredentials: true,
      });

      console.log('✅ Submission Successful:', response.data);
    } catch (err) {
      console.error('❌ Submission Failed:', err.message);
    }
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
            />
          </div>
          <div>
            <label> private_owner_key:</label>
            <input
              type="password"
              value={keys.private_owner}
              onChange={(e) =>
                setKeys({ ...keys, private_owner: e.target.value })
              }
            />
          </div>
          <div>
            <label> private_active_key:</label>
            <input
              type="password"
              value={keys.private_active}
              onChange={(e) =>
                setKeys({ ...keys, private_active: e.target.value })
              }
            />
          </div>
          <div>
            <label> private_posting_key:</label>
            <input
              type="password"
              value={keys.private_posting}
              onChange={(e) =>
                setKeys({ ...keys, private_posting: e.target.value })
              }
            />
          </div>
          <div>
            <label> private_memo_key:</label>
            <input
              type="password"
              value={keys.private_memo}
              onChange={(e) =>
                setKeys({ ...keys, private_memo: e.target.value })
              }
            />
          </div>

          <div>
            <label> public_owner_key:</label>
            <input
              type="password"
              value={keys.public_owner}
              onChange={(e) =>
                setKeys({ ...keys, public_owner: e.target.value })
              }
            />
          </div>
          <div>
            <label> public_active_key:</label>
            <input
              type="password"
              value={keys.public_active}
              onChange={(e) =>
                setKeys({ ...keys, public_active: e.target.value })
              }
            />
          </div>
          <div>
            <label> public_posting_key:</label>
            <input
              type="password"
              value={keys.public_posting}
              onChange={(e) =>
                setKeys({ ...keys, public_posting: e.target.value })
              }
            />
          </div>
          <div>
            <label> public_memo_key:</label>
            <input
              type="password"
              value={keys.public_memo}
              onChange={(e) =>
                setKeys({ ...keys, public_memo: e.target.value })
              }
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
