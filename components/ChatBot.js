"use client";

import { useState } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Assalamualaikum! I am HisabDo AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await res.json();
      const reply = data?.data?.reply || "Sorry, I could not understand. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#22c55e",
          color: "white",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 8px 25px rgba(34, 197, 94, 0.4)",
          zIndex: 9999,
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        💬
      </button>

      {/* Centered Chat Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "16px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "560px",
              background: "#0f172a",
              borderRadius: "18px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 18px",
                background: "#166534",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong style={{ color: "white" }}>HisabDo AI Assistant</strong>
                <p style={{ margin: 0, fontSize: "12px", color: "#bbf7d0" }}>Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "16px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                    background: msg.role === "user" ? "#22c55e" : "#1e293b",
                    color: "white",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    maxWidth: "80%",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div style={{ color: "#94a3b8", fontSize: "13px" }}>Thinking...</div>
              )}
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#1e293b",
                  color: "white",
                  outline: "none",
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  background: "#22c55e",
                  border: "none",
                  color: "white",
                  padding: "0 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}