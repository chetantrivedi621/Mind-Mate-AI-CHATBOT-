const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

// This file is kept for future REST API endpoints if needed
// All chat functionality has been moved to socket.io

module.exports = router;