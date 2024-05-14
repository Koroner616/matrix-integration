// src/ElementLoginScreen.js
import React, { useState, useEffect } from 'react';
import MatrixLogin from './MatrixLogin';
import { initMatrixClient } from './MatrixClient';
import ElementHome from './ElementHome';

const ElementLoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState(null);

  const handleLoginSuccess = (details) => {
    setLoggedIn(true);
    setLoginDetails(details);
    const { baseUrl, accessToken, userId } = details;
    initMatrixClient(baseUrl, accessToken, userId);
  };

  return (
    <div>
      {!loggedIn ? (
        <MatrixLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ElementHome loginDetails={loginDetails} />
      )}
    </div>
  );
};

export default ElementLoginScreen;
