// src/MatrixClient.js
import sdk from 'matrix-js-sdk';

let matrixClient;

export const initMatrixClient = ({ baseUrl, accessToken, userId }) => {
  matrixClient = sdk.createClient({
    baseUrl,
    accessToken,
    userId
  });

  matrixClient.startClient();
};

export const getMatrixClient = () => matrixClient;
