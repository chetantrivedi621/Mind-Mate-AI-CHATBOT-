import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  withCredentials: true
});

export const sendMessageToBot = (message) => {
  return new Promise((resolve, reject) => {
    socket.emit('user-message', message);
    
    socket.once('bot-response', (response) => {
      resolve(response);
    });
    
    socket.once('error', (error) => {
      reject(error);
    });
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};
