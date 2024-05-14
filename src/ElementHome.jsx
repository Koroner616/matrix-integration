import React, { useEffect, useState } from 'react';
import { getMatrixClient } from './MatrixClient';

const ElementHome = () => {
  const client = getMatrixClient();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (client) {
      const fetchRooms = async () => {
        const roomList = client.getRooms();
        setRooms(roomList);
      };

      fetchRooms();

      client.on('sync', (state) => {
        if (state === 'SYNCING') {
          fetchRooms();
        }
      });
    }
  }, [client]);

  return (
    <div>
      <h2>Welcome to Element</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.roomId}>{room.name || room.roomId}</li>
        ))}
      </ul>
    </div>
  );
};

export default ElementHome;
