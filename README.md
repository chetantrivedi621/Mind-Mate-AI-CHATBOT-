# 🤖 MIND MATE - AI Chatbot Application

**MIND MATE** ek powerful, real-time AI chatbot application hai jo modern web technologies ke saath built ki gayi hai. Ye application users ko intelligent AI assistant ke saath seamless conversation experience provide karta hai.

## 🌟 Key Features

### 🧠 Smart AI Integration
- **OpenRouter API Integration** - GPT-5 powered responses
- **Real-time Streaming** - Instant message responses with streaming
- **Context-aware Conversations** - Maintains conversation history
- **Markdown Support** - Rich text formatting with syntax highlighting

### 🔐 User Authentication & Security
- **JWT-based Authentication** - Secure user sessions
- **Password Encryption** - bcrypt hashing for passwords
- **Password Reset** - Email-based password recovery
- **Protected Routes** - Secure access to chat functionality

### 💬 Advanced Chat Features
- **Real-time Messaging** - Socket.IO for instant communication
- **Chat History** - Persistent conversation storage
- **Multiple Chats** - Create and manage multiple chat sessions
- **Message Streaming** - Live typing indicators and streaming responses
- **Dark/Light Theme** - User preference-based theming

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all devices
- **3D Robot Model** - Interactive 3D avatar using model-viewer
- **Beautiful Landing Page** - Professional marketing page
- **Smooth Animations** - Enhanced user experience
- **Cross-platform Compatibility** - Mobile, tablet, and desktop support

## 🏗️ Architecture Overview

### Frontend (React.js)
```
Client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Route-based page components
│   ├── context/            # React Context for state management
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service layers
│   ├── styles/             # CSS modules and styling
│   └── utils/              # Utility functions
```

### Backend (Node.js + Express)
```
Server/
├── controllers/            # Business logic controllers
├── models/                 # MongoDB data models
├── routes/                 # API route definitions
├── middleware/             # Custom middleware functions
├── config/                 # Database and app configuration
└── server.js              # Main server entry point
```

## 🛠️ Technology Stack

### Frontend Technologies
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **React Markdown** - Rich text rendering
- **Axios** - HTTP client for API calls
- **FontAwesome** - Icon library
- **Model Viewer** - 3D model rendering
- **Highlight.js** - Code syntax highlighting

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **OpenRouter API** - AI model integration

### Development Tools
- **Nodemon** - Development server auto-restart
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Dotenv** - Environment variable management

## 🚀 Installation & Setup

### Prerequisites
- Node.js (>= 18.x)
- MongoDB database
- OpenRouter API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project
```

### 2. Install Dependencies

#### Root Dependencies
```bash
npm install
```

#### Client Dependencies
```bash
cd Client
npm install
```

#### Server Dependencies
```bash
cd Server
npm install
```

### 3. Environment Configuration

Create `.env` file in Server directory:
```env
# Database
MONGO_URI=mongodb://localhost:27017/ai-chatbot

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# OpenRouter API
OPENROUTER_API_KEY=your_openrouter_api_key

# Email Configuration (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start the Application

#### Start Backend Server
```bash
cd Server
npm run dev
# Server will run on http://localhost:5000
```

#### Start Frontend Client
```bash
cd Client
npm start
# Client will run on http://localhost:3000
```

## 📡 API Endpoints

### Authentication Routes
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Password reset request
- `POST /api/users/reset-password/:token` - Password reset

### Chat Routes (Socket.IO)
- `user-message` - Send message to AI
- `get-chat-history` - Retrieve user's chat history
- `create-chat` - Create new chat session
- `delete-chat` - Delete chat session
- `update-chat-title` - Update chat title

## 🎯 Key Components

### Frontend Components
- **LandingPage** - Marketing homepage with 3D robot
- **ChatPage** - Main chat interface with streaming
- **LoginPage/RegisterPage** - Authentication forms
- **Navbar** - Navigation component
- **ChatBox** - Message display component
- **ProtectedRoute** - Route protection wrapper

### Backend Models
- **User** - User authentication and profile
- **Chat** - Chat session management
- **Message** - Individual message storage

## 🔧 Configuration

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in `.env` file
3. Database will be created automatically

### OpenRouter API Setup
1. Sign up at [OpenRouter](https://openrouter.ai/)
2. Get your API key
3. Add to `.env` file as `OPENROUTER_API_KEY`

### Email Configuration (Optional)
For password reset functionality:
1. Enable 2-factor authentication on Gmail
2. Generate app-specific password
3. Add credentials to `.env` file

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd Client
npm run build

# Start production server
cd Server
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production email settings
- Set secure JWT secret

## 📱 Features in Detail

### Real-time Chat
- **Streaming Responses** - AI responses stream in real-time
- **Message History** - All conversations are saved
- **Multiple Chats** - Users can create multiple chat sessions
- **Typing Indicators** - Visual feedback during AI processing

### User Experience
- **Responsive Design** - Works on mobile, tablet, desktop
- **Dark/Light Theme** - User preference-based theming
- **3D Avatar** - Interactive 3D robot model
- **Smooth Animations** - Enhanced visual experience

### Security Features
- **JWT Authentication** - Secure session management
- **Password Hashing** - bcrypt encryption
- **Rate Limiting** - API abuse prevention
- **CORS Protection** - Cross-origin security

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email your-email@example.com or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Voice message support
- [ ] File upload capabilities
- [ ] Multi-language support
- [ ] Advanced AI model selection
- [ ] Chat export functionality
- [ ] User profile customization
- [ ] Team collaboration features

---

**Made with ❤️ using React, Node.js, and AI**