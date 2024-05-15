import { createClient } from 'matrix-js-sdk';

export const initMatrixClient = (baseUrl, accessToken, userId) => {
  const client = createClient({
    baseUrl,
    accessToken,
    userId,
  });

  client.startClient();

  return client;
};
