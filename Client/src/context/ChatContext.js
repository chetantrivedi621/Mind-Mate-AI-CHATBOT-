import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const { isAuthenticated } = useAuth();
  const socket = useSocket();

  // Set up socket event listeners
  useEffect(() => {
    if (!socket || !isAuthenticated) return;

    socket.on('chat-history', (chats) => {
      if (Array.isArray(chats)) {
        setChatHistory(chats);
      }
    });

    socket.on('new-chat', (chat) => {
      setChatHistory(prev => [chat, ...prev]);
    });

    socket.on('chat-deleted', (chatId) => {
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    });

    socket.on('chat-updated', (updatedChat) => {
      setChatHistory(prev => prev.map(chat => 
        chat.id === updatedChat.id ? updatedChat : chat
      ));
    });

    // Request chat history when connected
    socket.emit('get-chat-history');

    return () => {
      socket.off('chat-history');
      socket.off('new-chat');
      socket.off('chat-deleted');
      socket.off('chat-updated');
    };
  }, [socket, isAuthenticated]);

  // Create a new chat
  const createChat = (title = 'New Chat') => {
    if (!socket || !isAuthenticated) return;
    
    socket.emit('create-chat', { title });
  };

  // Delete a chat
  const deleteChat = (chatId) => {
    if (!socket || !isAuthenticated) return;
    
    socket.emit('delete-chat', { chatId });
  };

  // Update a chat's title
  const updateChatTitle = (chatId, newTitle) => {
    if (!socket || !isAuthenticated) return;
    
    socket.emit('update-chat-title', { chatId, newTitle });
  };

  // Add message to a chat
  const addMessageToChat = (chatId, message) => {
    if (!socket || !isAuthenticated) return;
    
    socket.emit('add-message', { chatId, message });
  };

  return (
    <ChatContext.Provider 
      value={{ 
        chatHistory, 
        setChatHistory,
        createChat,
        deleteChat,
        updateChatTitle,
        addMessageToChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);