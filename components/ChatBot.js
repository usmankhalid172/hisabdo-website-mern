"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ChatBot.module.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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

  const handleSend = async (e) => {
    e.preventDefault();
    const query = input.trim();
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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.floatingButton}
          aria-label="Open AI Chatbot"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <span className={styles.headerTitle}>HisabDo AI Assistant</span>
              <span className={styles.headerStatus}>
                <span className={styles.statusDot} />
                Online
              </span>
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

          <form onSubmit={handleSend} className={styles.inputRow}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              className={styles.input}
            />
            <button type="submit" disabled={loading} className={styles.sendButton}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}