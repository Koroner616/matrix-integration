// src/components/ElementLoginScreen.js
import React, { useState, useEffect } from 'react';
import MatrixLogin from './MatrixLogin';

const ElementLoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState(null);

  const handleLoginSuccess = (details) => {
    setLoggedIn(true);
    setLoginDetails(details);
  };

  useEffect(() => {
    if (loggedIn && loginDetails) {
      const baseUrl = loginDetails.well_known['m.homeserver'].base_url;
      const accessToken = loginDetails.access_token;
      const userId = loginDetails.user_id;
      const elementUrl = `https://app.element.io/#/login?homeserver=${baseUrl}&access_token=${accessToken}&user_id=${userId}`;
      window.location.href = elementUrl;
    }
  }, [loggedIn, loginDetails]);

  return (
    <div>
      {!loggedIn && <MatrixLogin onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default ElementLoginScreen;
