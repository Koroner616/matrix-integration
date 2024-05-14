import sdk from 'matrix-js-sdk';

let client;

export const initMatrixClient = ({ baseUrl, accessToken, userId }) => {
  client = sdk.createClient({
    baseUrl,
    accessToken,
    userId,
  });

  client.startClient();
  return client;
};

export const getMatrixClient = () => client;
