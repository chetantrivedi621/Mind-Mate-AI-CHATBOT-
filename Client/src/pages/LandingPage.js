import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      {/* Hero Section */}
      <section className="Hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
          MIND MATE – Your Smartest AI Companion,
            <span className="gradient-text"> 24/7 Available</span>
          </h1>
          <p className="hero-subtitle">
          Chat instantly on any topic, ask questions, and get lightning-fast answers — anytime, anywhere. MIND MATE is designed to make every conversation smarter, easier, and more intuitive.
          </p>
          <div className="features">
          <div className="feature-div">
            <p>🧠 Intelligent & Fast Responses</p>
          </div>
          
          <div className="feature-div">
            <p>🌐 Available Anytime – 24/7</p>
            
          </div>
          <div className="feature-div">
          <p>🤖 Built for All Your Questions</p>
            
          </div>

          </div>
          

          <div className="cta-buttons">
            <Link to="/register" className="cta-button primary">
              Register For Free
            </Link>
            <Link to="/login" className="cta-button secondary">
              Log In
            </Link>
          </div>
        </div>
        <div className="hero-image">
        <model-viewer
            src="/3d-robot.glb"
            alt="Logo"
            class="landing-image"
            auto-rotate
            auto-rotate-delay="0"
            camera-controls
            ar
            style={{ width: '30rem', height: '30rem' }}>
          </model-viewer>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Powerful Features Built for Performance</h2>
        <p className="features-section-subtitle">Experience cutting-edge capabilities designed to deliver speed, security, and seamless cross-platform functionality.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><span role="img" aria-label="robot">🤖</span></div>
            <h3>Smart Responses</h3>
            <h5>Conversational AI Powered by NLP</h5>
            <p>Leverage advanced natural language processing for human-like, context-aware conversations that adapt to user intent in real time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><span role="img" aria-label="lightning bolt">⚡</span></div>
            <h3>Instant Replies</h3>
            <h5>Lightning-Fast Processing</h5>
            <p>Backed by high-speed AI inference, responses are generated within milliseconds to ensure smooth and uninterrupted interactions.

</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><span role="img" aria-label="lock">🔒</span></div>
            <h3>Secure Chat</h3>
            <h5>End-to-End Encryption</h5>
            <p>All conversations are protected with industry-grade encryption protocols to ensure complete privacy and data security.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><span role="img" aria-label="mobile phone">📱</span></div>
            <h3>Cross-Platform Access</h3>
            <h5>Optimized for All Devices</h5>
            <p>Whether on mobile, desktop, or tablet, the chatbot runs flawlessly across platforms with responsive design and adaptive performance.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="how-it-works-section-title">How It Works </h2>
        <p className="how-it-works-section-subtitle" style={{ textAlign: "center" }}>Get started with our AI chatbot in just three simple steps</p>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Setup & Configure</h3>
            <p>Sign up and customize your chatbot with your brand colors, logo, and initial conversation flows in minutes.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3> Start the Conversation</h3>
            <p>Pick any topic and start chatting. Whether it's customer support, FAQs, or product queries, your chatbot is ready to engage.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Smart Answers</h3>
            <p>Receive intelligent, real-time replies tailored to your needs. Delight users with fast, accurate, and helpful answers—every time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Register for Free Today</h2>
          <p>Experience the power of our smart AI assistant — designed to simplify your life and boost productivity</p>
          <h4>Join Now and Unlock a World of Knowledge and Convenience!</h4>
          <Link to="/register" className="cta-button primary">
          Register for Free Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 