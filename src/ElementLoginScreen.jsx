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
    initMatrixClient(details); // Pass the entire details object
  };

  useEffect(() => {
    if (loggedIn && loginDetails) {
      const { baseUrl, accessToken, userId } = loginDetails;
      const elementUrl = `https://app.element.io/#/login?homeserver=${baseUrl}&access_token=${accessToken}&user_id=${userId}`;
      window.location.href = elementUrl;
    }
  }, [loggedIn, loginDetails]);

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
