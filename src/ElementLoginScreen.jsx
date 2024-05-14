// src/ElementLoginScreen.js
import React, { useState, useEffect } from 'react';
import MatrixLogin from './MatrixLogin';
import { initMatrixClient, getMatrixClient } from './MatrixClient';

const ElementLoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState(null);

  const handleLoginSuccess = (details) => {
    setLoggedIn(true);
    setLoginDetails(details);
    initMatrixClient(details); // Pass the entire details object
  };

  useEffect(() => {
    if (loggedIn && loginDetails) {
      // Client is already initialized in handleLoginSuccess
      const client = getMatrixClient();
      client.once('sync', (state) => {
        if (state === 'PREPARED') {
          console.log('Matrix client is ready');
        }
      });
    }
  }, [loggedIn, loginDetails]);

  return (
    <div>
      {!loggedIn ? (
        <MatrixLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <h3>Welcome to Matrix!</h3>
          <p>You are logged in.</p>
        </div>
      )}
    </div>
  );
};

export default ElementLoginScreen;
