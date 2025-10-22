import React, { useState, useEffect, useRef, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useSocket } from '../context/SocketContext';

function ChatBox({ messages, setMessages }) {
  const { user } = useAuth();
  const { chatHistory, setChatHistory } = useContext(ChatContext);
  const socket = useSocket();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Common emojis with labels for better accessibility
  const commonEmojis = [
    { emoji: '😊', label: 'smile' },
    { emoji: '😂', label: 'joy' },
    { emoji: '👍', label: 'thumbs up' },
    { emoji: '❤️', label: 'heart' },
    { emoji: '🎉', label: 'party' },
    { emoji: '🤔', label: 'thinking' },
    { emoji: '👋', label: 'wave' },
    { emoji: '✨', label: 'sparkles' },
    { emoji: '🙌', label: 'raised hands' },
    { emoji: '🔥', label: 'fire' }
  ];

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return;

    socket.on('bot-response', (response) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'bot',
        content: response.content,
        timestamp: new Date().toISOString()
      }]);
      setIsLoading(false);
      setIsTyping(false);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        role: 'bot',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
        error: true
      }]);
      setIsLoading(false);
      setIsTyping(false);
    });

    return () => {
      socket.off('bot-response');
      socket.off('error');
    };
  }, [socket]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendMessage = () => {
    if (!input.trim() || isLoading || !socket) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    }]);

    // Emit message through socket
    socket.emit('user-message', userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = (emoji) => {
    setInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.role === 'user' ? 'userMessage' : ''}`}
          >
            <div className={msg.role === 'user' ? 'messageContent userMessageContent' : 'messageContent botMessageContent'}>
              <p>{msg.content}</p>
              <span className="text-xs mt-1 block opacity-70">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="message">
            <div className="messageContent botMessageContent">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2 max-w-screen-xl mx-auto">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label="Open emoji picker"
          >
            <span role="img" aria-label="smiling face">😊</span>
          </button>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full left-0 mb-2 bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-700 grid grid-cols-5 gap-2">
              {commonEmojis.map(({ emoji, label }) => (
                <button
                  key={label}
                  onClick={() => addEmoji(emoji)}
                  className="hover:bg-gray-700 p-1 rounded transition-colors"
                  aria-label={`Add ${label} emoji`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="messageInput"
            disabled={isLoading}
          />

          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="sendButton"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;