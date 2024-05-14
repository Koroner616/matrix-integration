// src/ElementLoginScreen.jsx
import React, { useState, useEffect } from 'react';
import MatrixLogin from './MatrixLogin';
import { initMatrixClient, getMatrixClient } from './MatrixClient';

const ElementLoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState(null);

  const handleLoginSuccess = (details) => {
    setLoggedIn(true);
    setLoginDetails(details);
    try {
      initMatrixClient(details);
    } catch (error) {
      console.error("Error initializing Matrix client:", error);
    }
  };

  useEffect(() => {
    if (loggedIn && loginDetails) {
      const client = getMatrixClient();
      try {
        client.once('sync', (state) => {
          if (state === 'PREPARED') {
            console.log('Matrix client is ready');
          }
        });
      } catch (error) {
        console.error("Error during Matrix client sync:", error);
      }
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
