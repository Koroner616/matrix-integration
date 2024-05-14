// src/MatrixClient.js
import sdk from 'matrix-js-sdk';

let matrixClient;

export const initMatrixClient = ({ baseUrl, accessToken, userId }) => {
  if (!baseUrl || !accessToken || !userId) {
    throw new Error("Missing parameters for Matrix client initialization.");
  }

  matrixClient = sdk.createClient({
    baseUrl,
    accessToken,
    userId
  });

  matrixClient.startClient();
};

export const getMatrixClient = () => {
  if (!matrixClient) {
    throw new Error("Matrix client is not initialized.");
  }
  return matrixClient;
};
