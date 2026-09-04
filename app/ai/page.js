"use client";

import { useState, useEffect } from "react";
import styles from "./ai.module.css";

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("");

  // Data states
  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerSummary, setCustomerSummary] = useState(null);
  const [monthly, setMonthly] = useState(null);

  // Chat states
  const [chatQuery, setChatQuery] = useState("");
  const [chatReply, setChatReply] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  // ========== FETCH ALL DATA ==========
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Business Health / Overview
      const overviewRes = await fetch("http://localhost:4000/api/ai/overview");
      const overviewData = await overviewRes.json();

      if (overviewData?.data) {
        setSummary(overviewData.data.summaryCard || null);
        setStats(overviewData.data.stats || null);
        setRecommendations(overviewData.data.recommendations || []);
        setSource(overviewData.source || "");
      }

      // 2. Monthly Insights
      const monthlyRes = await fetch("http://localhost:4000/api/ai/monthly-insights");
      const monthlyData = await monthlyRes.json();
      if (monthlyData?.data) {
        setMonthly(monthlyData.data);
      }

      // 3. Expense Alerts
      const alertsRes = await fetch("http://localhost:4000/api/expenses/alerts");
      const alertsData = await alertsRes.json();
      if (alertsData?.alerts) {
        setAlerts(alertsData.alerts);
      }

      // 4. Customers with Risk
      const customersRes = await fetch("http://localhost:4000/api/customers");
      const customersData = await customersRes.json();
      if (customersData?.customers) {
        setCustomers(customersData.customers);
        setCustomerSummary(customersData.summary || null);
      }
    } catch (err) {
      console.error("AI data fetch error:", err);
      setError("Failed to load AI insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ========== AI CHAT ==========
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    setChatLoading(true);
    setChatReply(null);

    try {
      const res = await fetch("http://localhost:4000/api/ai/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: chatQuery }),
      });

      const data = await res.json();
      if (data?.data?.reply) {
        setChatReply(data.data.reply);
      } else {
        setChatReply("Sorry, I could not find an answer. Please try again.");
      }
    } catch (err) {
      setChatReply("Something went wrong. Please try again later.");
    } finally {
      setChatLoading(false);
    }
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container} style={{ textAlign: "center", paddingTop: "120px" }}>
          <div className={styles.aiLabel}>
            <span className={styles.aiDot} />
            HISABDO AI
          </div>
          <h2 style={{ marginTop: "20px" }}>Loading AI Insights...</h2>
          <p style={{ color: "#94a3b8" }}>Please wait while we fetch your business intelligence.</p>
        </div>
      </main>
    );
  }

  // ========== ERROR STATE ==========
  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container} style={{ textAlign: "center", paddingTop: "120px" }}>
          <h2>Something went wrong</h2>
          <p style={{ color: "#94a3b8", margin: "16px 0" }}>{error}</p>
          <button className={styles.primaryButton} onClick={fetchAllData}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        {/* HEADER */}
        <header className={styles.header}>
          <div>
            <div className={styles.aiLabel}>
              <span className={styles.aiDot} />
              HISABDO AI
              {source && (
                <span style={{ marginLeft: "12px", fontSize: "10px", color: "#64748b" }}>
                  ({source === "remote_ai" ? "Live AI" : "Fallback"})
                </span>
              )}
            </div>

            <h1>Business intelligence, made simple.</h1>

            <p>
              Get smarter insights from your business activity and make
              better financial decisions with HisabDo AI.
            </p>
          </div>

          <button className={styles.refreshButton} onClick={fetchAllData}>
            ↻ Refresh insights
          </button>
        </header>

        {/* TABS */}
        <nav className={styles.tabs}>
          {[
            ["overview", "Overview"],
            ["insights", "Insights"],
            ["customers", "Customers"],
            ["chat", "AI Assistant"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={activeTab === key ? styles.activeTab : ""}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ==================== OVERVIEW TAB ==================== */}
        {(activeTab === "overview" || activeTab === "insights") && (
          <>
            {/* AI SUMMARY */}
            {summary && (
              <section className={styles.summaryCard}>
                <div className={styles.summaryIcon}>✦</div>
                <div className={styles.summaryContent}>
                  <span className={styles.eyebrow}>
                    {summary.eyebrow || "AI BUSINESS SUMMARY"}
                  </span>
                  <h2>{summary.headline || "Your business overview"}</h2>
                  <p>{summary.text || ""}</p>
                  <div className={styles.summaryActions}>
                    <button className={styles.primaryButton}>
                      View recommendations
                    </button>
                    <button className={styles.secondaryButton}>
                      See monthly insights
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* STATS */}
            {stats && (
              <section className={styles.statsGrid}>
                <article className={styles.statCard}>
                  <div className={styles.statTop}>
                    <span>Business Health</span>
                    <span className={styles.greenIcon}>♥</span>
                  </div>
                  <strong>
                    {stats.businessHealth?.score ?? "--"}
                    <span>/100</span>
                  </strong>
                  <div className={styles.progress}>
                    <div style={{ width: `${stats.businessHealth?.score || 0}%` }} />
                  </div>
                  <small>{stats.businessHealth?.statusText || "—"}</small>
                </article>

                <article className={styles.statCard}>
                  <div className={styles.statTop}>
                    <span>Monthly Profit</span>
                    <span className={styles.greenIcon}>↗</span>
                  </div>
                  <strong>
                    Rs. {(stats.monthlyProfit?.amount || 0).toLocaleString()}
                  </strong>
                  <div className={styles.changePositive}>
                    {stats.monthlyProfit?.trend === "positive" ? "↑ Positive trend" : "→ Stable"}
                  </div>
                  <small>Based on your latest records</small>
                </article>

                <article className={styles.statCard}>
                  <div className={styles.statTop}>
                    <span>Customer Activity</span>
                    <span className={styles.blueIcon}>●</span>
                  </div>
                  <strong>
                    {stats.customerActivity?.displayValue ||
                      `${stats.customerActivity?.score || 0}%`}
                  </strong>
                  <div className={styles.progress}>
                    <div style={{ width: `${stats.customerActivity?.score || 0}%` }} />
                  </div>
                  <small>Healthy customer activity</small>
                </article>

                <article className={styles.statCard}>
                  <div className={styles.statTop}>
                    <span>Pending Payments</span>
                    <span className={styles.orangeIcon}>!</span>
                  </div>
                  <strong>
                    Rs. {(stats.pendingPayments?.amount || 0).toLocaleString()}
                  </strong>
                  <div className={styles.changeWarning}>
                    {stats.pendingPayments?.count || 0} payments need attention
                  </div>
                  <small>Review outstanding balances</small>
                </article>
              </section>
            )}

            {/* MAIN GRID */}
            <section className={styles.mainGrid}>
              {/* RECOMMENDATIONS */}
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>PERSONALIZED</span>
                    <h3>AI Recommendations</h3>
                  </div>
                  <span className={styles.sparkle}>✦</span>
                </div>

                <div className={styles.recommendationList}>
                  {recommendations.length > 0 ? (
                    recommendations.map((item, index) => (
                      <div className={styles.recommendation} key={index}>
                        <div className={styles.itemIcon}>{item.icon || "💡"}</div>
                        <div className={styles.itemContent}>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                          <button>{item.action || "View insight"} →</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#94a3b8" }}>No recommendations available right now.</p>
                  )}
                </div>
              </article>

              {/* ALERTS */}
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>ATTENTION</span>
                    <h3>Smart Alerts</h3>
                  </div>
                  <span className={styles.alertCount}>{alerts.length}</span>
                </div>

                <div className={styles.alertList}>
                  {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                      <div
                        className={`${styles.alert} ${styles[alert.type] || styles.medium}`}
                        key={index}
                      >
                        <div className={styles.alertIcon}>{alert.icon || "⚠️"}</div>
                        <div>
                          <h4>{alert.title}</h4>
                          <p>{alert.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#94a3b8" }}>No alerts at the moment.</p>
                  )}
                </div>

                <button className={styles.fullButton}>View all alerts →</button>
              </article>
            </section>

            {/* CUSTOMER INSIGHTS */}
            <section className={styles.mainGrid}>
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>CUSTOMER INTELLIGENCE</span>
                    <h3>Customer Insights</h3>
                  </div>
                  <span className={styles.customerIcon}>👥</span>
                </div>

                {customerSummary && (
                  <div className={styles.customerSummary}>
                    <div>
                      <strong>{customerSummary.needFollowUp ?? 0}</strong>
                      <span>Need follow-up</span>
                    </div>
                    <div>
                      <strong>{customerSummary.activeCustomers ?? 0}</strong>
                      <span>Active customers</span>
                    </div>
                    <div>
                      <strong>{customerSummary.activityScore ?? 0}%</strong>
                      <span>Activity score</span>
                    </div>
                  </div>
                )}

                {customers.slice(0, 3).map((cust) => (
                  <div className={styles.customerRow} key={cust.id}>
                    <div className={styles.avatar}>{cust.initials || "CU"}</div>
                    <div>
                      <h4>{cust.name}</h4>
                      <p>
                        {cust.followUpRequired
                          ? "Follow-up recommended"
                          : `Last purchase ${cust.lastPurchaseDaysAgo || "—"} days ago`}
                      </p>
                    </div>
                    <span
                      className={
                        cust.riskBadge === "High"
                          ? styles.highBadge
                          : styles.mediumBadge
                      }
                    >
                      {cust.riskBadge || "Low"}
                    </span>
                  </div>
                ))}

                <button className={styles.fullButton}>
                  View customer insights →
                </button>
              </article>

              {/* MONTHLY INSIGHTS */}
              {monthly && (
                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.eyebrow}>
                        {monthly.eyebrow || "MONTHLY INSIGHTS"}
                      </span>
                      <h3>{monthly.title || "Business Overview"}</h3>
                    </div>
                  </div>
                  <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
                    {monthly.overview}
                  </p>
                  <div className={styles.monthlyStats}>
                    <div>
                      <span>Income</span>
                      <strong>{monthly.metrics?.income?.display || "—"}</strong>
                    </div>
                    <div>
                      <span>Expenses</span>
                      <strong>{monthly.metrics?.expenses?.display || "—"}</strong>
                    </div>
                    <div>
                      <span>Profit</span>
                      <strong>{monthly.metrics?.profit?.display || "—"}</strong>
                    </div>
                  </div>
                </article>
              )}
            </section>
          </>
        )}

        {/* ==================== AI CHAT TAB ==================== */}
        {activeTab === "chat" && (
          <section className={styles.card} style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>AI ASSISTANT</span>
                <h3>Ask HisabDo AI</h3>
              </div>
              <span className={styles.sparkle}>✦</span>
            </div>

            <form onSubmit={handleChatSubmit}>
              <input
                type="text"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                placeholder="Ask anything about HisabDo... (e.g. How do I export PDF reports?)"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  color: "white",
                  marginBottom: "14px",
                  fontSize: "15px",
                }}
              />
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={chatLoading}
                style={{ width: "100%" }}
              >
                {chatLoading ? "Thinking..." : "Ask AI Assistant"}
              </button>
            </form>

            {chatReply && (
              <div
                style={{
                  marginTop: "24px",
                  padding: "18px",
                  borderRadius: "14px",
                  background: "rgba(34, 197, 94, 0.08)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                <strong style={{ color: "#22c55e" }}>AI Reply:</strong>
                <p style={{ marginTop: "10px", lineHeight: "1.6", color: "#e2e8f0" }}>
                  {chatReply}
                </p>
              </div>
            )}
          </section>
        )}

        {/* FOOTER NOTE */}
        <div className={styles.disclaimer}>
          <span>✦</span>
          HisabDo AI provides business insights to support your decisions.
          Always review important financial decisions before taking action.
        </div>
      </div>
    </main>
  );
}