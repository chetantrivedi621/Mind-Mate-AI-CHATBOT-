import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/DocumentationPage.css';

const DocumentationPage = () => {
  const [activeCategory, setActiveCategory] = useState('overview');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="documentation-page">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="doc-hero-banner">
        <div className="doc-hero-content">
          <h1>AI Chatbot Project Documentation</h1>
          <p>Complete guide for understanding, implementing, and customizing your AI chatbot</p>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="doc-category-nav">
        <div className="doc-category-container">
          <button 
            className={activeCategory === 'overview' ? 'active' : ''} 
            onClick={() => handleCategoryClick('overview')}
          >
            Overview
          </button>
          <button 
            className={activeCategory === 'architecture' ? 'active' : ''} 
            onClick={() => handleCategoryClick('architecture')}
          >
            Architecture
          </button>
          <button 
            className={activeCategory === 'core-components' ? 'active' : ''} 
            onClick={() => handleCategoryClick('core-components')}
          >
            Components
          </button>
          <button 
            className={activeCategory === 'workflow' ? 'active' : ''} 
            onClick={() => handleCategoryClick('workflow')}
          >
            Workflow
          </button>
          <button 
            className={activeCategory === 'api-endpoints' ? 'active' : ''} 
            onClick={() => handleCategoryClick('api-endpoints')}
          >
            API
          </button>
          <button 
            className={activeCategory === 'customization' ? 'active' : ''} 
            onClick={() => handleCategoryClick('customization')}
          >
            Customization
          </button>
          <button 
            className={activeCategory === 'deployment' ? 'active' : ''} 
            onClick={() => handleCategoryClick('deployment')}
          >
            Deployment
          </button>
        </div>
      </div>

      <div className="documentation-container">
        <aside className="sidebar">
          <h3>Contents</h3>
          <ul>
            <li><a href="#overview" className={activeCategory === 'overview' ? 'active' : ''}>Overview</a></li>
            <li><a href="#architecture" className={activeCategory === 'architecture' ? 'active' : ''}>Architecture</a></li>
            <li><a href="#core-components" className={activeCategory === 'core-components' ? 'active' : ''}>Core Components</a></li>
            <li><a href="#workflow" className={activeCategory === 'workflow' ? 'active' : ''}>Workflow</a></li>
            <li><a href="#api-endpoints" className={activeCategory === 'api-endpoints' ? 'active' : ''}>API Endpoints</a></li>
            <li><a href="#customization" className={activeCategory === 'customization' ? 'active' : ''}>Customization & Extensibility</a></li>
            <li><a href="#deployment" className={activeCategory === 'deployment' ? 'active' : ''}>Deployment</a></li>
            <li><a href="#best-practices" className={activeCategory === 'best-practices' ? 'active' : ''}>Best Practices</a></li>
            <li><a href="#summary" className={activeCategory === 'summary' ? 'active' : ''}>Summary</a></li>
          </ul>
        </aside>
        
        <main className="content">
          <section id="overview" className="doc-section">
            <div className="section-header">
              <h2>Overview</h2>
              <div className="section-divider"></div>
            </div>
            <p>This project is a full-stack AI chatbot application that enables users to interact with an intelligent conversational agent through a modern web interface. The chatbot leverages Natural Language Processing (NLP) and Machine Learning (ML) to understand user queries, manage conversations, and generate human-like responses. The frontend is built with React.js, and the backend uses Node.js/Express with a MongoDB database.</p>
            
            <div className="feature-cards">
              <div className="feature-card">
                <div className="feature-icon"><span role="img" aria-label="robot">🤖</span></div>
                <h3>AI-Powered</h3>
                <p>Advanced natural language understanding capabilities powered by modern ML techniques</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><span role="img" aria-label="arrows rotating">🔄</span></div>
                <h3>Full-Stack</h3>
                <p>Complete solution with responsive frontend and scalable backend architecture</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><span role="img" aria-label="electric plug">🔌</span></div>
                <h3>Extensible</h3>
                <p>Easily customizable with various integration options and extension points</p>
              </div>
            </div>
          </section>

          <section id="architecture" className="doc-section">
            <div className="section-header">
              <h2>Architecture</h2>
              <div className="section-divider"></div>
            </div>
            <p>The application follows a layered architecture:</p>
            
            <div className="architecture-diagram">
              <div className="arch-layer">
                <div className="arch-box">
                  <h4>Frontend Layer</h4>
                  <p>User Interface, Routes, State Management, API Calls</p>
                </div>
              </div>
              <div className="arch-connector"></div>
              <div className="arch-layer">
                <div className="arch-box">
                  <h4>Backend Layer</h4>
                  <p>Authentication, Chat Logic, Database, AI Integration</p>
                </div>
              </div>
            </div>
            
            <h3>Chatbot Architecture Layers:</h3>
            <div className="layered-list">
              <div className="layer-item">
                <h4>User Interface (UI) Layer</h4>
                <p>React-based chat window for text input/output.</p>
              </div>
              <div className="layer-item">
                <h4>Front-End Systems Layer</h4>
                <p>Manages user sessions and routes messages to the backend.</p>
              </div>
              <div className="layer-item">
                <h4>Conversation Management Layer</h4>
                <p>Maintains dialogue and session context.</p>
              </div>
              <div className="layer-item">
                <h4>Integration Layer</h4>
                <p>Connects to backend APIs for authentication, chat, and user management.</p>
              </div>
              <div className="layer-item">
                <h4>Learning & LLM Layer</h4>
                <p>Uses ML models or external APIs (e.g., OpenAI GPT) for natural language understanding and generation.</p>
              </div>
            </div>
          </section>

          <section id="core-components" className="doc-section">
            <div className="section-header">
              <h2>Core Components</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="components-container">
              <div className="component-group">
                <h3>Frontend (client/)</h3>
                <div className="component-list">
                  <div className="component-card">
                    <div className="component-title">Pages</div>
                    <div className="component-details">
                      <ul>
                        <li>LoginPage.js</li>
                        <li>RegisterPage.js</li>
                        <li>ChatPage.js</li>
                      </ul>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Components</div>
                    <div className="component-details">
                      <ul>
                        <li>Navbar.js</li>
                        <li>ChatBox.js</li>
                        <li>LoadingSpinner.js</li>
                        <li>ErrorBoundary.js</li>
                      </ul>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Context</div>
                    <div className="component-details">
                      <ul>
                        <li>UserContext.js</li>
                        <li>ChatContext.js</li>
                      </ul>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Services</div>
                    <div className="component-details">
                      <ul>
                        <li>UserService.js</li>
                        <li>ChatService.js</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="component-group">
                <h3>Backend (server/)</h3>
                <div className="component-list">
                  <div className="component-card">
                    <div className="component-title">Entry Point</div>
                    <div className="component-details">
                      <ul>
                        <li>server.js - Express server, API routing, middleware setup</li>
                      </ul>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Routes</div>
                    <div className="component-details">
                      <ul>
                        <li>/api/users</li>
                        <li>/api/chat</li>
                      </ul>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Controllers</div>
                    <div className="component-details">
                      <p>Business logic for authentication and chat</p>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Models</div>
                    <div className="component-details">
                      <p>User and Chat schemas for MongoDB</p>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">Middleware</div>
                    <div className="component-details">
                      <p>CORS, JSON parsing, authentication, error handling</p>
                    </div>
                  </div>
                  <div className="component-card">
                    <div className="component-title">AI Integration</div>
                    <div className="component-details">
                      <p>Connects to NLP/LLM APIs for generating responses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="workflow" className="doc-section">
            <div className="section-header">
              <h2>Workflow</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="workflow-container">
              <div className="workflow-group">
                <h3>User Interaction Flow</h3>
                <div className="workflow-steps">
                  <div className="workflow-step">
                    <div className="step-number">1</div>
                    <div className="step-content">User registers or logs in</div>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">2</div>
                    <div className="step-content">JWT token stored in browser</div>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">3</div>
                    <div className="step-content">User sends message in chat</div>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">4</div>
                    <div className="step-content">Frontend sends message to backend</div>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">5</div>
                    <div className="step-content">Backend processes message and generates AI response</div>
                  </div>
                  <div className="workflow-step">
                    <div className="step-number">6</div>
                    <div className="step-content">Frontend displays response</div>
                  </div>
                </div>
              </div>
              
              <div className="workflow-cards">
                <div className="workflow-card">
                  <h3>Backend Processing Steps</h3>
                  <ul>
                    <li><span className="highlight-bullet">•</span> Tokenization</li>
                    <li><span className="highlight-bullet">•</span> Intent Classification</li>
                    <li><span className="highlight-bullet">•</span> Entity Recognition</li>
                    <li><span className="highlight-bullet">•</span> Knowledgebase/LLM Query</li>
                    <li><span className="highlight-bullet">•</span> Response Generation</li>
                    <li><span className="highlight-bullet">•</span> Continuous Learning</li>
                  </ul>
                </div>
                
                <div className="workflow-card">
                  <h3>Security Practices</h3>
                  <ul>
                    <li><span className="highlight-bullet">•</span> JWT authentication</li>
                    <li><span className="highlight-bullet">•</span> CORS configuration</li>
                    <li><span className="highlight-bullet">•</span> Environment variables</li>
                    <li><span className="highlight-bullet">•</span> HTTPS recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="api-endpoints" className="doc-section">
            <div className="section-header">
              <h2>API Endpoints</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="api-gallery">
              <div className="api-card">
                <div className="api-header">
                  <h3>User APIs</h3>
                </div>
                <div className="api-body">
                  <pre>
                    <code>
                      {`POST /api/users/register
POST /api/users/login`}
                    </code>
                  </pre>
                  <p>Handles user authentication and account management</p>
                </div>
              </div>
              
              <div className="api-card">
                <div className="api-header">
                  <h3>Chat APIs</h3>
                </div>
                <div className="api-body">
                  <pre>
                    <code>
                      {`POST /api/chat/send
GET /api/chat/history`}
                    </code>
                  </pre>
                  <p>Manages message sending and chat history retrieval</p>
                </div>
              </div>
            </div>
          </section>

          <section id="customization" className="doc-section">
            <div className="section-header">
              <h2>Customization & Extensibility</h2>
              <div className="section-divider"></div>
            </div>
            
            <p>The application can be customized and extended in several ways:</p>
            
            <div className="custom-features">
              <div className="custom-feature">
                <div className="feature-icon"><span role="img" aria-label="speech bubble">💬</span></div>
                <h3>Dialog Flows</h3>
                <p>Customize conversation paths and responses</p>
              </div>
              <div className="custom-feature">
                <div className="feature-icon"><span role="img" aria-label="brain">🧠</span></div>
                <h3>AI Provider</h3>
                <p>Switch between different AI providers or models</p>
              </div>
              <div className="custom-feature">
                <div className="feature-icon"><span role="img" aria-label="desktop computer">🖥️</span></div>
                <h3>Frontend Features</h3>
                <p>Add new UI components or pages</p>
              </div>
              <div className="custom-feature">
                <div className="feature-icon"><span role="img" aria-label="electric plug">🔌</span></div>
                <h3>Backend Integrations</h3>
                <p>Connect to additional services or databases</p>
              </div>
            </div>
          </section>

          <section id="deployment" className="doc-section">
            <div className="section-header">
              <h2>Deployment</h2>
              <div className="section-divider"></div>
            </div>
            
            <p>The application can be deployed using various platforms:</p>
            
            <div className="deployment-options">
              <div className="deployment-group">
                <h3>Frontend Deployment</h3>
                <div className="deployment-platforms">
                  <div className="platform-card">
                    <h4>Netlify</h4>
                    <p>Continuous deployment with GitHub integration</p>
                  </div>
                  <div className="platform-card">
                    <h4>Vercel</h4>
                    <p>Optimized for Next.js and React applications</p>
                  </div>
                </div>
              </div>
              
              <div className="deployment-group">
                <h3>Backend Deployment</h3>
                <div className="deployment-platforms">
                  <div className="platform-card">
                    <h4>Heroku</h4>
                    <p>Easy deployment with integrated database options</p>
                  </div>
                  <div className="platform-card">
                    <h4>Railway</h4>
                    <p>Simple infrastructure platform with automatic deployments</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="best-practices" className="doc-section">
            <div className="section-header">
              <h2>Best Practices & Recommendations</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="best-practices-grid">
              <div className="practice-card">
                <div className="practice-icon"><span role="img" aria-label="warning">⚠️</span></div>
                <h3>Error Handling</h3>
                <p>Implement comprehensive error handling throughout the application</p>
              </div>
              <div className="practice-card">
                <div className="practice-icon"><span role="img" aria-label="loading">⏳</span></div>
                <h3>Loading States</h3>
                <p>Provide visual feedback during API calls and processing</p>
              </div>
              <div className="practice-card">
                <div className="practice-icon"><span role="img" aria-label="lock">🔒</span></div>
                <h3>Security</h3>
                <p>Follow security best practices for authentication and data protection</p>
              </div>
              <div className="practice-card">
                <div className="practice-icon"><span role="img" aria-label="chart">📈</span></div>
                <h3>Continuous Improvement</h3>
                <p>Regularly update and improve the application based on user feedback</p>
              </div>
              <div className="practice-card">
                <div className="practice-icon"><span role="img" aria-label="test tube">🧪</span></div>
                <h3>Testing</h3>
                <p>Implement comprehensive testing for both frontend and backend</p>
              </div>
            </div>
          </section>

          <section id="summary" className="doc-section">
            <div className="section-header">
              <h2>Summary</h2>
              <div className="section-divider"></div>
            </div>
            
            <p>This AI chatbot application provides a scalable, secure, and extensible solution for building conversational interfaces. With its React frontend and Node.js backend, it offers a modern and efficient way to implement AI-powered chat functionality.</p>
            
            <div className="summary-cta">
              <a href="/register" className="cta-button">Get Started</a>
              <a href="https://github.com/your-repo" className="cta-link">View GitHub Repository</a>
            </div>
          </section>
        </main>
      </div>
      
      <footer className="doc-footer">
        <p>© {new Date().getFullYear()} AI Chatbot Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DocumentationPage;