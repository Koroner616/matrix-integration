import React, { useEffect, useState } from 'react';
import { getMatrixClient } from './MatrixClient';

const MatrixChat = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const matrixClient = getMatrixClient();

  useEffect(() => {
    if (!matrixClient) return;

    const handleRoomTimeline = (event) => {
      if (event.getRoomId() === roomId) {
        setMessages((prevMessages) => [...prevMessages, event.getContent().body]);
      }
    };

    matrixClient.on('Room.timeline', handleRoomTimeline);

    return () => {
      matrixClient.removeListener('Room.timeline', handleRoomTimeline);
    };
  }, [matrixClient, roomId]);

  const handleSendMessage = async () => {
    if (matrixClient && newMessage.trim()) {
      await matrixClient.sendEvent(roomId, 'm.room.message', {
        msgtype: 'm.text',
        body: newMessage,
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Matrix Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button type="button" onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MatrixChat;
