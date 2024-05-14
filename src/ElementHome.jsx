// src/ElementHome.js
import React, { useEffect, useState } from 'react';
import { getMatrixClient } from './MatrixClient';

const ElementHome = ({ loginDetails }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const matrixClient = getMatrixClient();
    
    if (matrixClient) {
      matrixClient.once('sync', (state) => {
        if (state === 'PREPARED') {
          setRooms(matrixClient.getRooms());
        }
      });
    }
  }, []);

  return (
    <div>
      <h2>Bienvenido a Element, {loginDetails.user_id}</h2>
      <div>
        <h3>Rooms:</h3>
        <ul>
          {rooms.map((room) => (
            <li key={room.roomId}>{room.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ElementHome;
