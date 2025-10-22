const Chat = require('../models/Chat');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all chats for a user
exports.getUserChats = async (req, res) => {
    try {
        const userId = req.user.id;
        const chats = await Chat.find({ participants: userId })
            .populate('participants', 'username email')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

        res.json(chats);
    } catch (error) {
        console.error('Error in getUserChats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create a new chat
exports.createChat = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { participants } = req.body;
        const userId = req.user.id;

        // Check if chat already exists
        const existingChat = await Chat.findOne({
            participants: { $all: [userId, ...participants] }
        });

        if (existingChat) {
            return res.json(existingChat);
        }

        const newChat = new Chat({
            participants: [userId, ...participants],
            createdBy: userId
        });

        await newChat.save();
        await newChat.populate('participants', 'username email');

        res.status(201).json(newChat);
    } catch (error) {
        console.error('Error in createChat:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get chat by ID
exports.getChatById = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const userId = req.user.id;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        })
        .populate('participants', 'username email')
        .populate('messages');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        res.json(chat);
    } catch (error) {
        console.error('Error in getChatById:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete chat
exports.deleteChat = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const userId = req.user.id;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        await chat.remove();
        res.json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error in deleteChat:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add message to chat
exports.addMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const chatId = req.params.chatId;
        const userId = req.user.id;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        });

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const newMessage = {
            content,
            sender: userId,
            timestamp: new Date()
        };

        chat.messages.push(newMessage);
        chat.lastMessage = newMessage;
        await chat.save();

        res.json(newMessage);
    } catch (error) {
        console.error('Error in addMessage:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
