const { Anthropic } = require('@anthropic-ai/sdk');
const rateLimit = require('express-rate-limit');

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Create a rate limiter
// This is important to prevent abuse of your API key
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Process a message with Claude AI without authentication
exports.processPublicMessage = [
  // Apply rate limiting
  apiRateLimiter,
  
  // Handle the request
  async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ message: 'A valid message is required' });
      }

      // Call Anthropic API with limited context (just the current message)
      const response = await anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219", // Using the latest model
        max_tokens: 500, // Limited tokens for public API
        messages: [{ role: "user", content: message }],
        system: "You are a helpful assistant that provides informative, accurate, and thoughtful responses. Keep your answers relatively brief."
      });

      // Extract the response text
      const aiResponse = response.content[0].text;

      // Return the AI response
      res.json({
        content: aiResponse
      });
    } catch (error) {
      console.error('Error processing public message with AI:', error);
      res.status(500).json({ 
        message: 'Error processing message',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
];