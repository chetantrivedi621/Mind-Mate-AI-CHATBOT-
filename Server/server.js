// Handle deprecation warnings
process.env.NODE_NO_WARNINGS = '1';

const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Chat = require('./models/chatModel');
const Message = require('./models/messageModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware to authenticate socket connections
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.user.id);

  // Get user's chat history
  socket.on('get-chat-history', async () => {
    try {
      const chats = await Chat.find({ user: socket.user.id }).sort({ updatedAt: -1 });
      socket.emit('chat-history', chats);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      socket.emit('error', { message: 'Error fetching chat history' });
    }
  });

  // Create new chat
  socket.on('create-chat', async ({ title }) => {
    try {
      const chat = await Chat.create({
        title: title || 'New Chat',
        user: socket.user.id
      });
      socket.emit('new-chat', chat);
    } catch (error) {
      console.error('Error creating chat:', error);
      socket.emit('error', { message: 'Error creating chat' });
    }
  });

  // Delete chat
  socket.on('delete-chat', async ({ chatId }) => {
    try {
      const chat = await Chat.findOneAndDelete({
        _id: chatId,
        user: socket.user.id
      });

      if (!chat) {
        return socket.emit('error', { message: 'Chat not found' });
      }

      await Message.deleteMany({ chat: chatId });
      socket.emit('chat-deleted', chatId);
    } catch (error) {
      console.error('Error deleting chat:', error);
      socket.emit('error', { message: 'Error deleting chat' });
    }
  });

  // Update chat title
  socket.on('update-chat-title', async ({ chatId, newTitle }) => {
    try {
      const chat = await Chat.findOneAndUpdate(
        { _id: chatId, user: socket.user.id },
        { title: newTitle },
        { new: true }
      );

      if (!chat) {
        return socket.emit('error', { message: 'Chat not found' });
      }

      socket.emit('chat-updated', chat);
    } catch (error) {
      console.error('Error updating chat title:', error);
      socket.emit('error', { message: 'Error updating chat title' });
    }
  });

  // 🆕 STREAMING CHANGE: Handle user messages with streaming
  socket.on('user-message', async (message) => {
    try {
      console.log('Received user message:', message);

      await Message.create({
        role: 'user',
        content: message,
        user: socket.user.id
      });

      let chatHistory = await Message.find({ user: socket.user.id })
        .sort({ createdAt: -1 })
        .limit(10);
      chatHistory = chatHistory.reverse();

      const conversationHistory = [
        {
          role: 'system',
          content: 'You are a helpful assistant. Always reply in clean, professional Markdown with headings, bullet points, numbered lists, and syntax-highlighted code blocks.'
        },
        ...chatHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message }
      ];

      console.log('Sending request to OpenRouter with conversation history:', conversationHistory);

      const response = await axios({
        method: 'post',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Your App Name'
        },
        data: {
          model: 'openai/gpt-5-chat',
          messages: conversationHistory,
          stream: true
        },
        responseType: 'stream'
      });

      let aiContent = '';

      response.data.on('data', (chunk) => {
        const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
          if (line === 'data: [DONE]') {
            console.log('OpenRouter stream complete');
            socket.emit('bot-response-complete', aiContent);
            return;
          }
          if (line.startsWith('data:')) {
            try {
              const json = JSON.parse(line.replace(/^data:\s*/, ''));
              const delta = json.choices?.[0]?.delta?.content || '';
              if (delta) {
                aiContent += delta;
                socket.emit('bot-response-chunk', delta);
              }
            } catch (err) {
              console.error('Error parsing OpenRouter stream line:', err);
            }
          }
        }
      });

      response.data.on('end', async () => {
        console.log('OpenRouter stream ended');
        // Save assistant message to DB after stream ends
        try {
          await Message.create({
            role: 'assistant',
            content: aiContent,
            user: socket.user.id
          });
        } catch (err) {
          console.error('Error saving assistant message:', err);
        }
      });

      response.data.on('error', (err) => {
        console.error('OpenRouter stream error:', err);
        socket.emit('bot-response', {
          role: 'assistant',
          content: 'Sorry, something went wrong with the AI response stream.'
        });
      });

    } catch (error) {
      console.error('Streaming API error:', error.message);
      socket.emit('bot-response', {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again later.'
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.id);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
