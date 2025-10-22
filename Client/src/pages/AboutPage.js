import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About us</h1>
          <p>Founded in 2022, we're building on our award-winning reputation for our market-leading low-cost trading service. We've grown from a team of 10 dedicated staff to over 120 across multiple locations worldwide. We're proud to serve users worldwide from a global company with teams in the US, Australia, South Africa, Singapore, Malaysia and the Bahamas.</p>
        </div>
        <div className="hero-image">
          <img src="/hero-abstract-svg.svg" alt="Abstract colorful design" />
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <div className="section-content">
          <p>We've been in the conversational AI industry for over 3 years. In that time we've listened to what our users need to thrive – particularly, we are committed to improved user experience through an intuitive interface that delivers intelligent responses that outperform most that of its competitors.</p>
          <p>At our customer core, they find transparency over trading costs and conditions is what matters most. We believe in providing a service that represents some of the best value in the local marketplace in the global industry.</p>
          <p>We believe this is how trading should be for everyone, and we welcome all who make our space.</p>
        </div>
        <div className="accent-diamond">
          <img src="/orange-diamond-svg.svg" alt="Orange diamond accent" />
        </div>
      </section>

      {/* Regulation Section */}
      <section className="regulation-section">
        <div className="regulation-header">
          <h2>Regulation</h2>
          <p>We know the value of good quality regulation. We don't fear it, we embrace it, and understand the importance of our responsibility to keep our service secure, our practices transparent, and our users protected. You can use the regulation's register and read all about Trade Nation by following the links to the Financial Conduct Authority below:</p>
        </div>
        
        <div className="regulation-background">
          <img src="/city-background-svg.svg" alt="City skyline at night" className="background-image" />
          <div className="regulation-list">
            <ul>
              <li>
                <span className="flag-icon flag-bahamas"></span>
                <span className="regulation-name">Securities Commission of the Bahamas</span>
              </li>
              <li>
                <span className="flag-icon flag-uk"></span>
                <span className="regulation-name">Financial Conduct Authority</span>
              </li>
              <li>
                <span className="flag-icon flag-australia"></span>
                <span className="regulation-name">Australian Securities and Investments Commission</span>
              </li>
              <li>
                <span className="flag-icon flag-seychelles"></span>
                <span className="regulation-name">Financial Services Authority</span>
              </li>
              <li>
                <span className="flag-icon flag-south-africa"></span>
                <span className="regulation-name">Financial Sector Conduct Authority</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="community-section">
        <h2>Our community</h2>
        <div className="community-content">
          <div className="community-text">
            <p>We have a busy presence across all the big social media platforms (come find us <a href="https://twitter.com/aichatbotapp" className="highlight">@aichatbotapp</a>), plus what we like to call 'social support' through our weekly blog and webinars that include interesting commentary, useful help articles of benefit, 'early looks'.</p>
            <p>At the heart of our social community, you'll find our resident trading expert, David Cranpton, knowledgeable, experienced and passionate about helping new users to succeed. He has a unique talent of making topics from getting the most out of our chatbot and finding your trading style to money management that is your go-to guide (for novice and not).</p>
            <p>Our traders like to get in on the act too. Our active online community regularly contributes to our blog, podcast and webinars. It's a great place to be part of and we're delighted we've a place many traders consider their true trading home.</p>
          </div>
          <div className="accent-diamond">
            <img src="/orange-diamond-svg.svg" alt="Orange diamond accent" />
          </div>
        </div>
      </section>

      {/* Our Values Section (From original About page) */}
      <section className="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon"><span role="img" aria-label="target">🎯</span></div>
            <h3>Innovation</h3>
            <p>Constantly pushing the boundaries of AI technology</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><span role="img" aria-label="handshake">🤝</span></div>
            <h3>Accessibility</h3>
            <p>Making AI available to everyone, everywhere</p>
          </div>
          <div className="value-card">
            <div className="value-icon"><span role="img" aria-label="lock">🔒</span></div>
            <h3>Security</h3>
            <p>Protecting your data with advanced encryption</p>
          </div>
        </div>
      </section>

      {/* Team Section (From original About page) */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image">
              <img src="/rahul-sharma.svg" alt="Rahul Sharma - Founder & CEO" />
            </div>
            <h3>Chetan Trivedi</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <div className="member-image">
              <img src="/priya-patel.svg" alt="Priya Patel - Head of AI" />
            </div>
            <h3>Gagandeep Kaur</h3>
            <p>Head of AI</p>
          </div>
          <div className="team-member">
            <div className="member-image">
              <img src="/amit-kumar.svg" alt="Amit Kumar - Lead Developer" />
            </div>
            <h3>Sagar Kamboj</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Contact Section (From original About page) */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions? We'd love to hear from you.</p>
        <div className="contact-info">
          <div className="contact-item">
            <span className="icon"><span role="img" aria-label="envelope">📧</span></span>
            <p>contact@aichatbot.com</p>
          </div>
          <div className="contact-item">
            <span className="icon"><span role="img" aria-label="mobile phone">📱</span></span>
            <p>+91 98765 43210</p>
          </div>
          <div className="contact-item">
            <span className="icon"><span role="img" aria-label="round pushpin">📍</span></span>
            <p>123 Tech Park, Bangalore, India</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;