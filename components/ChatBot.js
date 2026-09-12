"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const QUICK_REPLIES = [
  "Explore Features",
  "Get Started",
  "Pricing",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Assalamualaikum! I am HisabDo AI Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendQuery = async (query) => {
    if (!query || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/ai/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      const reply = data?.data?.reply || "Sorry, I couldn't find an answer.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendQuery(input.trim());
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.floatingButton}
        aria-label={isOpen ? "Close AI Chatbot" : "Open AI Chatbot"}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className={styles.onlineDot} />
          </>
        )}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerAvatar}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <line x1="12" y1="7" x2="12" y2="11" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
            </div>
            <div className={styles.headerText}>
              <span className={styles.headerTitle}>HisabDo AI Assistant</span>
              <span className={styles.headerSubtitle}>Your AI guide to HisabDo</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.messageBubble} ${
                  msg.role === "user" ? styles.userBubble : styles.aiBubble
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className={styles.aiBubble}>Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          {error && <div className={styles.errorText}>{error}</div>}

          <div className={styles.quickReplies}>
            {QUICK_REPLIES.map((label) => (
              <button
                key={label}
                type="button"
                className={styles.pillButton}
                onClick={() => sendQuery(label)}
                disabled={loading}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about HisabDo..."
              className={styles.input}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={styles.sendButton}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}