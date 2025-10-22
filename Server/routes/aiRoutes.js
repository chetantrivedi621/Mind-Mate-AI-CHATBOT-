const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { processMessage, generateChatTitle } = require('../controllers/aiController');

// Process a message with Claude AI
router.post('/message', protect, processMessage);

// Generate a chat title
router.post('/generate-title', protect, generateChatTitle);

module.exports = router;