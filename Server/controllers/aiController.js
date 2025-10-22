const axios = require('axios');
const Chat = require('../models/chatModel');
const User = require('../models/User');

// Process a message with Mistral 7B
exports.processMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.user.id;

    // Find the chat and validate user is a participant
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    }).populate('messages');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Format the conversation history for OpenRouter API
    const conversationHistory = chat.messages.map(msg => ({
      role: msg.sender.toString() === userId.toString() ? "user" : "assistant",
      content: msg.content
    }));

    // Add the current message
    conversationHistory.push({ role: "user", content: message });

    // Call OpenRouter API
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "mistralai/mistral-7b-instruct",
      messages: conversationHistory,
      max_tokens: 1000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000', // Your frontend URL
        'X-Title': 'Your App Name' // Your app name
      }
    });

    // Extract the response text
    const aiResponse = response.data.choices[0].message.content;

    // Create new message objects
    const userMessage = {
      content: message,
      sender: userId,
      timestamp: new Date()
    };

    const assistantMessage = {
      content: aiResponse,
      sender: null, // null sender indicates AI
      timestamp: new Date()
    };

    // Add messages to chat
    chat.messages.push(userMessage, assistantMessage);
    chat.lastMessage = assistantMessage;
    await chat.save();

    // Return both messages
    res.json({
      userMessage,
      assistantMessage
    });
  } catch (error) {
    console.error('Error processing message with AI:', error?.response?.data || error.message || error);
    res.status(500).json({ 
      message: 'Error processing message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Generate a chat title based on the first message
exports.generateChatTitle = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    
    // Call OpenRouter API to generate a title
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "user", content: `Based on this first message, generate a short, descriptive title (4-6 words max):\n\n"${message}"` }
      ],
      max_tokens: 20,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Your App Name'
      }
    });

    // Extract and clean the title
    let title = response.data.choices[0].message.content.trim();
    // Remove quotes if present
    title = title.replace(/^["'](.*)["']$/, '$1');
    
    // Update the chat title if chatId is provided
    if (chatId) {
      await Chat.findByIdAndUpdate(chatId, { title });
    }

    res.json({ title });
  } catch (error) {
    console.error('Error generating chat title:', error);
    
    // Fallback to simple title generation
    const fallbackTitle = message.length <= 20 
      ? message 
      : message.substring(0, 20) + '...';
    
    res.json({ title: fallbackTitle });
  }
};