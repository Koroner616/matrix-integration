// import React, { useState } from 'react';
// import MatrixChat from 'matrix-react-sdk/lib/components/structures/MatrixChat';
// import MatrixLogin from './MatrixLogin';
// import configureMatrixReactSdk from './ElementConfig';
// import { initMatrixClient, getMatrixClient } from './MatrixClient';

// configureMatrixReactSdk();

// const ElementLoginScreen = () => {
//   const [matrixClient, setMatrixClient] = useState(null);

//   const handleLoginSuccess = ({
//     user_id,
//     access_token,
//     home_server,
//   }) => {
//     initMatrixClient(`https://${home_server}`, access_token, user_id);
//     setMatrixClient(getMatrixClient());
//   };

//   return (
//     <div>
//       {matrixClient ? (
//         <MatrixChat client={matrixClient} />
//       ) : (
//         <MatrixLogin onLoginSuccess={handleLoginSuccess} />
//       )}
//     </div>
//   );
// };

// export default ElementLoginScreen;
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
      window.open(elementUrl, '_blank');
    }
  }, [loggedIn, loginDetails]);

  return (
    <div>
      {!loggedIn && <MatrixLogin onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default ElementLoginScreen;
