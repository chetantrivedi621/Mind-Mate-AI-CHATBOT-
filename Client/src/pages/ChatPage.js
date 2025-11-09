import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

import styles from "../styles/ChatPage.module.css";

function ChatPage() {
  const { isAuthenticated } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const streamingMessageRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const streamingTimeoutRef = useRef(null);
  const [recentChats, setRecentChats] = useState([]);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  // Sync ref with streamingMessage
  useEffect(() => {
    streamingMessageRef.current = streamingMessage;
  }, [streamingMessage]);

  // Theme persistence
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Socket listeners with fixed streaming logic
  useEffect(() => {
    if (!socket) return;

    console.log("Socket connected:", socket.id);

    socket.on("bot-response-chunk", (chunk) => {
      console.log("Chunk received:", chunk);
      setStreamingMessage((prev) => prev + chunk);
      setIsLoading(true);
      
      // Clear any existing timeout
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
      
      // Set a timeout to handle incomplete streaming
      streamingTimeoutRef.current = setTimeout(() => {
        console.log("Streaming timeout - forcing completion");
        const finalContent = streamingMessageRef.current.trim();
        if (finalContent !== "") {
          setMessages((prev) => [...prev, { role: "assistant", content: finalContent }]);
        }
        setStreamingMessage("");
        setIsLoading(false);
      }, 30000); // 30 second timeout
    });

    socket.on("bot-response-complete", () => {
      console.log("Bot response complete");
      
      // Clear the timeout since we got a proper completion
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }
      
      const finalContent = streamingMessageRef.current.trim();
      if (finalContent !== "") {
        setMessages((prev) => [...prev, { role: "assistant", content: finalContent }]);
      }
      setStreamingMessage("");
      setIsLoading(false);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
      setIsLoading(false);
      setStreamingMessage(""); // Clear streaming message on error
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ]);
    });

    // Listen only for assistant messages to add (avoid duplicates from user)
    socket.on("message", (msg) => {
      if (msg.role === "user") return; // skip adding user messages again
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("bot-response-chunk");
      socket.off("bot-response-complete");
      socket.off("error");
      socket.off("message");
      
      // Clear any pending timeout
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }
    };
  }, [socket]);

  // Auto scroll down on new messages or streaming updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streamingMessage]);

  // Send message handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStreamingMessage(""); // Clear any previous streaming message
    setIsLoading(true);
    socket.emit("user-message", input);
  };

  // Theme toggle
  const handleThemeToggle = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // Start new chat handler
  const handleNewChat = () => {
    const firstUserMsg = messages.find((m) => m.role === "user");
    if (firstUserMsg) {
      setRecentChats((prev) => [
        (firstUserMsg.content.length > 20
          ? firstUserMsg.content.slice(0, 20) + "..."
          : firstUserMsg.content),
        ...prev,
      ].slice(0, 5));
    }
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI assistant. How can I help you today? You can ask me questions, request creative content, or just chat about any topic.",
      },
    ]);
    setInput("");
    setStreamingMessage(""); // Clear streaming message on new chat
    setIsLoading(false); // Reset loading state
  };

  // Copy button for code blocks
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      const copyCode = () => {
        navigator.clipboard.writeText(codeString);
      };

      return !inline && match ? (
        <div style={{ position: "relative" }}>
          <button
            onClick={copyCode}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "#333",
              color: "#fff",
              border: "none",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
              borderRadius: "4px",
              zIndex: 10,
            }}
          >
            Copy
          </button>
          <pre>
            <code className={className} {...props}>
              {codeString}
            </code>
          </pre>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const renderMessageContent = (content) => {
    if (typeof content !== "string") return content;
    return (
      <div className={styles.messageContent}>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={renderers}>
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  // Feature cards (your original UI, no changes here)
  const renderFeatureCards = () => (
    <div className={styles.featureCardsContainer}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>✏️</div>
        <div className={styles.featureTitle}>Ask complex questions</div>
        <div className={styles.featureDesc}>
          "Who won the Academy Award for Best Original Song in the year 2023?"
        </div>
      </div>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>🎨</div>
        <div className={styles.featureTitle}>Create digital artwork</div>
        <div className={styles.featureDesc}>
          "Create an HD wallpaper of a super cool sports car racing on the track."
        </div>
      </div>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>🎤</div>
        <div className={styles.featureTitle}>Give voice commands</div>
        <div className={styles.featureDesc}>
          "Hey Chatsonic, compare the iPhone 14 Pro with the iPhone 13 Pro."
        </div>
      </div>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>📝</div>
        <div className={styles.featureTitle}>Generate professional content</div>
        <div className={styles.featureDesc}>
          "Write a high-converting landing page headline and sub headline for Chatsonic."
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.chatContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logo}>
              <div className={styles.logoPlaceholder}></div>
              <span>Mind Mate</span>
            </div>
          </div>
          <button className={styles.outlineButton}>Try out 100+ other features</button>
          <button className={styles.primaryButton} onClick={handleNewChat}>
            + New Chat
          </button>
          <div className={styles.chatHistorySection}>
            <div className={styles.chatHistoryHeader}>Chat history</div>
            <input className={styles.chatSearch} placeholder="Search..." />
            <ul className={styles.chatList}>
              {recentChats.length === 0 ? (
                <li className={styles.chatItemEmpty}>No chats yet</li>
              ) : (
                recentChats.map((chat, idx) => (
                  <li key={idx} className={styles.chatItem}>
                    <span className={styles.chatIcon}>💬</span>
                    {chat}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <button
          className={styles.themeTogglebtn}
          onClick={handleThemeToggle}
          aria-label="Toggle day/night mode"
        >
          {theme === "dark" ? (
            <span role="img" aria-label="Sun">
              🌞
            </span>
          ) : (
            <span role="img" aria-label="Moon">
              🌙
            </span>
          )}
        </button>
        <button className={styles.clearConversations}>
          <span className={styles.trashIcon}>🗑️</span> Clear conversations
        </button>
      </aside>

      {/* Main Chat Area */}
      <main className={styles.mainContent}>
        <header className={styles.chatHeader}>
          <div className={styles.upgradeBtn}>
            <button>Upgrade</button>
          </div>
          <div className={styles.avatarCircle}></div>
        </header>

        <section className={styles.messagesContainer}>
          {messages.length === 0 && (
            <div className={styles.greetingSection}>
              <h1 className={styles.greetingText}>Mind Mate</h1>
              <p className={styles.greetingSubtext}>Your personalised AI-powered chatbot</p>
              {renderFeatureCards()}
            </div>
          )}
          {messages.length === 1 &&
            messages[0].role === "assistant" &&
            messages[0].content.includes("Hello! I'm your AI assistant") && (
              <div className={styles.greetingSection}>
                <p className={styles.greetingText}>
                  Hi there! <span role="img" aria-label="Smiling face with smiling eyes">😊</span>{" "}
                  How can I help you today?
                </p>
              </div>
            )}

          {messages.map((message, index) => {
            if (
              index === 0 &&
              message.role === "assistant" &&
              message.content.includes("Hello! I'm your AI assistant")
            ) {
              return null;
            }
            return (
              <div
                key={index}
                className={`${styles.messageWrapper} ${
                  message.role === "user" ? styles.userMessage : styles.assistantMessage
                }`}
              >
                <div className={styles.messageAvatar}>
                  {message.role === "user" ? (
                    <div className={styles.userAvatar}></div>
                  ) : (
                    <div className={styles.assistantSmallAvatar}></div>
                  )}
                </div>
                <div className={styles.messageBubble}>{renderMessageContent(message.content)}</div>
              </div>
            );
          })}

          {/* Streaming live AI response */}
          {streamingMessage && (
            <div className={`${styles.messageWrapper} ${styles.assistantMessage}`}>
              <div className={styles.messageAvatar}>
                <div className={styles.assistantSmallAvatar}></div>
              </div>
              <div className={styles.messageBubble}>
                <div className={styles.messageContent}>{streamingMessage}</div>
              </div>
            </div>
          )}

          {isLoading && !streamingMessage && (
            <div className={`${styles.messageWrapper} ${styles.assistantMessage}`}>
              <div className={styles.messageAvatar}>
                <div className={styles.assistantSmallAvatar}></div>
              </div>
              <div className={styles.messageBubble}>
                <div className={styles.messageContent}>
                  <span>Thinking...</span>
                  <span className={styles.threeDots}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        <form className={styles.inputForm} onSubmit={handleSubmit}>
          <input
            className={styles.messageInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Anything Here"
            disabled={isLoading}
          />
          <button className={styles.sendButton} type="submit" disabled={isLoading || !input.trim()}>
            <span role="img" aria-label="send">
              🚀
            </span>
          </button>
        </form>
      </main>
    </div>
  );
}

export default ChatPage;
