// import React, { useState } from 'react';

// const MatrixLogin = ({ onLoginSuccess }) => {
//   const [baseUrl, setBaseUrl] = useState('https://matrix.org');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`${baseUrl}/_matrix/client/r0/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: 'm.login.password',
//           user: username,
//           password,
//         }),
//       });

//       if (response.status === 200) {
//         const result = await response.json();
//         console.log("🚀 ~ handleLogin ~ response:", result);
//         const { access_token, user_id, device_id, well_known } = result;
//         onLoginSuccess({
//           user_id,
//           access_token,
//           home_server: new URL(baseUrl).hostname,
//           device_id,
//           well_known,
//         });
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Matrix Login</h2>
//       <input
//         type="text"
//         placeholder="Matrix URL"
//         value={baseUrl}
//         onChange={(e) => setBaseUrl(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type='button' onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default MatrixLogin;
// src/MatrixLogin.js
import React, { useState } from 'react';
import { initMatrixClient } from './MatrixClient';

const MatrixLogin = ({ onLoginSuccess }) => {
  const [baseUrl, setBaseUrl] = useState('https://matrix.org');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/_matrix/client/r0/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'm.login.password',
          user: username,
          password,
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        console.log("🚀 ~ handleLogin ~ response:", result);
        const { access_token, user_id, device_id, well_known } = result;
        onLoginSuccess({
          user_id,
          access_token,
          home_server: new URL(baseUrl).hostname,
          device_id,
          well_known,
        });
        initMatrixClient(baseUrl, access_token, user_id);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Matrix Login</h2>
      <input
        type="text"
        placeholder="Matrix URL"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='button' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default MatrixLogin;
