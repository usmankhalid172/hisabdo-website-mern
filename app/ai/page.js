"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./ai.module.css";

// Live deployment:
// NEXT_PUBLIC_API_URL = your live Node/Express backend URL
//
// Local development:
// http://localhost:4000
const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // API states
  const [healthData, setHealthData] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);

  const [insightsData, setInsightsData] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(true);

  const [alertsData, setAlertsData] = useState([]);
  const [alertsLoading, setAlertsLoading] = useState(true);

  const [recsData, setRecsData] = useState([]);
  const [recsLoading, setRecsLoading] = useState(true);

  const [goalData, setGoalData] = useState(null);
  const [goalLoading, setGoalLoading] = useState(true);

  const [customerData, setCustomerData] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(true);

  const [error, setError] = useState(null);

  // Chat states
  const [chatQuery, setChatQuery] = useState("");
  const [chatReply, setChatReply] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);

  // =========================================================
  // FETCH ALL AI DATA
  // =========================================================
  const fetchAllAI = useCallback(async () => {
    setError(null);

    setHealthLoading(true);
    setInsightsLoading(true);
    setAlertsLoading(true);
    setRecsLoading(true);
    setGoalLoading(true);
    setCustomerLoading(true);

    try {
      const requests = [
        fetch(`${API_BASE}/api/ai/business-health`),
        fetch(`${API_BASE}/api/ai/monthly-insights`),
        fetch(`${API_BASE}/api/ai/alerts`),
        fetch(`${API_BASE}/api/ai/recommendations`),
        fetch(`${API_BASE}/api/ai/goals`),
        fetch(`${API_BASE}/api/ai/customers`),
      ];

      const [
        healthRes,
        insightsRes,
        alertsRes,
        recsRes,
        goalRes,
        customerRes,
      ] = await Promise.all(requests);

      if (!healthRes.ok) {
        throw new Error("Business health API failed");
      }

      if (!insightsRes.ok) {
        throw new Error("Monthly insights API failed");
      }

      if (!alertsRes.ok) {
        throw new Error("Alerts API failed");
      }

      if (!recsRes.ok) {
        throw new Error("Recommendations API failed");
      }

      if (!goalRes.ok) {
        throw new Error("Goals API failed");
      }

      if (!customerRes.ok) {
        throw new Error("Customers API failed");
      }

      const [
        health,
        insights,
        alerts,
        recommendations,
        goal,
        customer,
      ] = await Promise.all([
        healthRes.json(),
        insightsRes.json(),
        alertsRes.json(),
        recsRes.json(),
        goalRes.json(),
        customerRes.json(),
      ]);

      setHealthData(health);
      setInsightsData(insights);
      setAlertsData(Array.isArray(alerts) ? alerts : []);
      setRecsData(Array.isArray(recommendations) ? recommendations : []);
      setGoalData(goal);
      setCustomerData(customer);
    } catch (err) {
      console.error("AI API Fetch Error:", err);
      setError(
        "Failed to load AI insights. Please check the backend connection and try again."
      );
    } finally {
      setHealthLoading(false);
      setInsightsLoading(false);
      setAlertsLoading(false);
      setRecsLoading(false);
      setGoalLoading(false);
      setCustomerLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllAI();
  }, [fetchAllAI]);

  // =========================================================
  // AI CHAT
  // =========================================================
  const handleChatSubmit = async (e) => {
    e.preventDefault();

    if (!chatQuery.trim()) return;

    setChatLoading(true);
    setChatReply(null);

    try {
      const res = await fetch(`${API_BASE}/api/ai/assistant/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: chatQuery.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Assistant API failed");
      }

      const data = await res.json();

      if (data?.data?.reply) {
        setChatReply(data.data.reply);
      } else if (data?.reply) {
        setChatReply(data.reply);
      } else {
        setChatReply(
          "Sorry, I could not find an answer. Please try again."
        );
      }
    } catch (err) {
      console.error("AI Assistant Error:", err);
      setChatReply("Something went wrong. Please try again later.");
    } finally {
      setChatLoading(false);
    }
  };

  // =========================================================
  // LOADING STATE
  // =========================================================
  const isInitialLoading =
    healthLoading &&
    insightsLoading &&
    alertsLoading &&
    recsLoading &&
    goalLoading &&
    customerLoading;

  if (isInitialLoading) {
  if (loading) {
    return (
      <main className={styles.page}>
        <div
          className={styles.container}
          style={{
            textAlign: "center",
            paddingTop: "120px",
          }}
        >
          <div className={styles.aiLabel}>
            <span className={styles.aiDot} />
            HISABDO AI
          </div>

          <h2 style={{ marginTop: "20px" }}>
            Loading AI Insights...
          </h2>

          <p style={{ color: "#94a3b8" }}>
            Please wait while we fetch your business intelligence.
          </p>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR STATE
  // =========================================================
  if (error && !healthData && !insightsData) {
  if (error) {
    return (
      <main className={styles.page}>
        <div
          className={styles.container}
          style={{
            textAlign: "center",
            paddingTop: "120px",
          }}
        >
          <div className={styles.aiLabel}>
            <span className={styles.aiDot} />
            HISABDO AI
          </div>

          <h2 style={{ marginTop: "20px" }}>
            Something went wrong
          </h2>

          <p
            style={{
              color: "#94a3b8",
              margin: "16px 0",
            }}
          >
            {error}
          </p>

          <button
            className={styles.primaryButton}
            onClick={fetchAllAI}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================
  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} />

      <div className={styles.container}>
        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className={styles.header}>
          <div>
            <div className={styles.aiLabel}>
              <span className={styles.aiDot} />
              HISABDO AI
            </div>

            <h1>Business intelligence, made simple.</h1>

            <p>
              Get smarter insights from your business activity and
              make better financial decisions with HisabDo AI.
            </p>
          </div>

          <button
            className={styles.refreshButton}
            onClick={fetchAllAI}
          >
          <button className={styles.refreshButton} onClick={fetchAllData}>
            ↻ Refresh insights
          </button>
        </header>

        {/* =====================================================
            TABS
        ====================================================== */}
        <nav className={styles.tabs}>
          {[
            ["overview", "Overview"],
            ["insights", "Insights"],
            ["customers", "Customers"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={
                activeTab === key ? styles.activeTab : ""
              }
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* =====================================================
            OVERVIEW TAB
        ====================================================== */}
        {activeTab === "overview" && (
          <>
            {/* AI SUMMARY */}
            <section className={styles.summaryCard}>
              <div className={styles.summaryIcon}>✦</div>

              <div className={styles.summaryContent}>
                <span className={styles.eyebrow}>
                  AI BUSINESS SUMMARY
                </span>

                <h2>
                  {healthData?.status
                    ? `Your business is ${healthData.status.toLowerCase()}.`
                    : "Your business is performing well this month."}
                </h2>

                <p>
                  {healthData?.message ||
                    "Revenue and customer activity are looking healthy. Review your latest insights to make better financial decisions."}
                </p>

                <div className={styles.summaryActions}>
                  <button
                    className={styles.primaryButton}
                    onClick={() => setActiveTab("insights")}
                  >
                    View recommendations
                  </button>

                  <button
                    className={styles.secondaryButton}
                    onClick={() => setActiveTab("insights")}
                  >
                    See monthly insights
                  </button>
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className={styles.statsGrid}>
              {/* Business Health */}
              <article className={styles.statCard}>
                <div className={styles.statTop}>
                  <span>Business Health</span>
                  <span className={styles.greenIcon}>♥</span>
                </div>

                {healthLoading ? (
                  <p style={{ color: "#888" }}>
                    Loading...
                  </p>
                ) : (
                  <>
                    <strong>
                      {healthData?.score ?? 0}
                      <span>/100</span>
                    </strong>

                    <div className={styles.progress}>
                      <div
                        style={{
                          width: `${healthData?.score ?? 0}%`,
                        }}
                      />
                    </div>

                    <small>
                      {healthData?.message ||
                        "Data unavailable"}
                    </small>
                  </>
                )}
              </article>

              {/* Monthly Profit */}
              <article className={styles.statCard}>
                <div className={styles.statTop}>
                  <span>Monthly Profit</span>
                  <span className={styles.greenIcon}>↗</span>
                </div>

                {insightsLoading ? (
                  <p style={{ color: "#888" }}>
                    Loading...
                  </p>
                ) : (
                  <>
                    <strong>
                      Rs. {insightsData?.profit ?? "—"}
                    </strong>

                    <div className={styles.changePositive}>
                      Positive monthly performance
                    </div>

                    <small>
                      Based on your latest records
                    </small>
                  </>
                )}
              </article>

              {/* Customer Activity */}
              <article className={styles.statCard}>
                <div className={styles.statTop}>
                  <span>Customer Activity</span>
                  <span className={styles.blueIcon}>●</span>
                </div>

                {customerLoading ? (
                  <p style={{ color: "#888" }}>
                    Loading...
                  </p>
                ) : (
                  <>
                    <strong>
                      {customerData?.activityScore ?? "—"}
                    </strong>

                    <div className={styles.progress}>
                      <div
                        style={{
                          width: `${
                            parseInt(
                              customerData?.activityScore,
                              10
                            ) || 0
                          }%`,
                        }}
                      />
                    </div>

                    <small>
                      Healthy customer activity
                    </small>
                  </>
                )}
              </article>

              {/* Alerts */}
              <article className={styles.statCard}>
                <div className={styles.statTop}>
                  <span>Smart Alerts</span>
                  <span className={styles.orangeIcon}>!</span>
                </div>

                {alertsLoading ? (
                  <p style={{ color: "#888" }}>
                    Loading...
                  </p>
                ) : (
                  <>
                    <strong>{alertsData.length}</strong>

                    <div className={styles.changeWarning}>
                      Items need attention
                    </div>

                    <small>
                      Review your latest business alerts
                    </small>
                  </>
                )}
              </article>
            </section>

            {/* MAIN GRID */}
            <section className={styles.mainGrid}>
              {/* RECOMMENDATIONS */}
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>
                      PERSONALIZED
                    </span>

                    <h3>AI Recommendations</h3>
                  </div>

                  <span className={styles.sparkle}>✦</span>
                </div>

                <div className={styles.recommendationList}>
                  {recsLoading ? (
                    <p
                      style={{
                        color: "#888",
                        padding: "10px",
                      }}
                    >
                      Loading recommendations...
                    </p>
                  ) : recsData.length > 0 ? (
                    recsData.map((item, index) => (
                      <div
                        className={styles.recommendation}
                        key={item.title || index}
                      >
                        <div className={styles.itemIcon}>
                          {item.icon || "💡"}
                        </div>

                        <div className={styles.itemContent}>
                          <h4>
                            {item.title ||
                              "Business recommendation"}
                          </h4>

                          <p>
                            {item.text ||
                              "Review this recommendation for better business performance."}
                          </p>

                          <button>
                            {item.action || "View insight"} →
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      style={{
                        color: "#888",
                        padding: "10px",
                      }}
                    >
                      No recommendations available.
                    </p>
                  )}
                </div>
              </article>

              {/* ALERTS */}
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>
                      ATTENTION
                    </span>

                    <h3>Smart Alerts</h3>
                  </div>

                  <span className={styles.alertCount}>
                    {alertsData.length}
                  </span>
                </div>

                <div className={styles.alertList}>
                  {alertsLoading ? (
                    <p
                      style={{
                        color: "#888",
                        padding: "10px",
                      }}
                    >
                      Loading alerts...
                    </p>
                  ) : alertsData.length > 0 ? (
                    alertsData.map((alert, index) => (
                      <div
                        className={`${styles.alert} ${
                          styles[alert.type] || ""
                        }`}
                        key={alert.title || index}
                      >
                        <div className={styles.alertIcon}>
                          {alert.icon || "🔔"}
                        </div>

                        <div>
                          <h4>
                            {alert.title || "Business alert"}
                          </h4>

                          <p>
                            {alert.text ||
                              "Review this alert for more information."}
                          </p>
        {/* OVERVIEW / INSIGHTS TABS */}
        {(activeTab === "overview" || activeTab === "insights") && (
          <>
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
                    <button className={styles.primaryButton}>View recommendations</button>
                    <button className={styles.secondaryButton}>See monthly insights</button>
                  </div>
                </div>
              </section>
            )}

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

            <section className={styles.mainGrid}>
              {/* Recommendations */}
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
                    <p style={{ color: "#94a3b8" }}>No recommendations available.</p>
                  )}
                </div>
              </article>

              {/* Alerts */}
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
                    <p
                      style={{
                        color: "#888",
                        padding: "10px",
                      }}
                    >
                      No alerts at the moment.
                    </p>
                  )}
                </div>

                <button
                  className={styles.fullButton}
                  onClick={() => setActiveTab("insights")}
                >
                  View all alerts →
                </button>
              </article>
            </section>

            {/* SECOND ROW */}
            <section className={styles.mainGrid}>
              {/* GOALS */}
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>
                      FINANCIAL PLANNING
                    </span>

                    <h3>Your Financial Goal</h3>
                    <p style={{ color: "#94a3b8" }}>No alerts at the moment.</p>
                  )}
                </div>
                <button className={styles.fullButton}>View all alerts →</button>
              </article>
            </section>

            {/* Monthly Insights */}
            {monthly && (
              <section className={styles.mainGrid}>
                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.eyebrow}>
                        {monthly.eyebrow || "MONTHLY INSIGHTS"}
                      </span>
                      <h3>{monthly.title || "Business Overview"}</h3>
                    </div>
                  </div>

                  <span className={styles.goalIcon}>
                    🎯
                  </span>
                </div>

                {goalLoading ? (
                  <p
                    style={{
                      color: "#888",
                      padding: "10px",
                    }}
                  >
                    Loading goal...
                  </p>
                ) : (
                  <>
                    <div className={styles.goalHeader}>
                      <div>
                        <h4>
                          {goalData?.title || "Financial Goal"}
                        </h4>

                        <p>
                          Rs. {goalData?.saved ?? "—"} saved of
                          Rs. {goalData?.target ?? "—"}
                        </p>
                      </div>

                      <strong>
                        {goalData?.percentage ?? 0}%
                      </strong>
                    </div>

                    <div className={styles.goalProgress}>
                      <div
                        style={{
                          width: `${
                            goalData?.percentage ?? 0
                          }%`,
                        }}
                      />
                    </div>

                    <div className={styles.goalFooter}>
                      <span>
                        Rs. {goalData?.remaining ?? "—"}{" "}
                        remaining
                      </span>

                      <span>
                        {goalData?.status || "On track"}
                      </span>
                    </div>
                  </>
                )}

                <button className={styles.fullButton}>
                  View action plan →
                </button>
              </article>

              {/* CUSTOMERS */}
              <article className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.eyebrow}>
                      CUSTOMER INTELLIGENCE
                    </span>

                    <h3>Customer Insights</h3>
                  </div>

                  <span className={styles.customerIcon}>
                    👥
                  </span>
                </div>

                {customerLoading ? (
                  <p
                    style={{
                      color: "#888",
                      padding: "10px",
                    }}
                  >
                    Loading customers...
                  </p>
                ) : (
                  <>
                    <div className={styles.customerSummary}>
                      <div>
                        <strong>
                          {customerData?.followUpCount ?? 0}
                        </strong>

                        <span>Need follow-up</span>
                      </div>

                      <div>
                        <strong>
                          {customerData?.activeCount ?? 0}
                        </strong>

                        <span>Active customers</span>
                      </div>

                      <div>
                        <strong>
                          {customerData?.activityScore ?? "—"}
                        </strong>

                        <span>Activity score</span>
                      </div>
                    </div>

                    {customerData?.list?.length > 0 ? (
                      customerData.list
                        .slice(0, 3)
                        .map((cust) => (
                          <div
                            className={styles.customerRow}
                            key={cust.id}
                          >
                            <div className={styles.avatar}>
                              {cust.initials || "CU"}
                            </div>

                            <div>
                              <h4>
                                {cust.name ||
                                  "Customer"}
                              </h4>

                              <p>
                                {cust.desc ||
                                  "Customer activity available"}
                              </p>
                            </div>

                            <span
                              className={
                                cust.badge === "High"
                                  ? styles.highBadge
                                  : styles.mediumBadge
                              }
                            >
                              {cust.badge || "Low"}
                            </span>
                          </div>
                        ))
                    ) : (
                      <p
                        style={{
                          color: "#888",
                          padding: "10px",
                        }}
                      >
                        No customer insights available.
                      </p>
                    )}
                  </>
                )}

                <button
                  className={styles.fullButton}
                  onClick={() => setActiveTab("customers")}
                >
                  View customer insights →
                </button>
              </article>
            </section>
          </>
        )}

        {/* =====================================================
            INSIGHTS TAB
        ====================================================== */}
        {activeTab === "insights" && (
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>
                  MONTHLY INSIGHTS
                </span>

                <h3>
                  {insightsData?.month || "Current Month"}{" "}
                  Business Overview
                </h3>
              </div>
            </div>

            {insightsLoading ? (
              <p
                style={{
                  padding: "20px",
                  color: "#888",
                }}
              >
                Fetching AI Monthly Insights...
              </p>
            ) : (
              <>
                <p
                  style={{
                    color: "#94a3b8",
                    marginBottom: "20px",
                  }}
                >
                  {insightsData?.summary ||
                    "Your latest financial activity shows a positive trend."}
                </p>

                <div className={styles.monthlyStats}>
                  <div>
                    <span>Income</span>
                    <strong>
                      Rs. {insightsData?.income ?? "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Expenses</span>
                    <strong>
                      Rs. {insightsData?.expenses ?? "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Profit</span>
                    <strong>
                      Rs. {insightsData?.profit ?? "—"}
                    </strong>
                  </div>
                </div>
              </>
            )}
          </section>
        )}

        {/* =====================================================
            CUSTOMERS TAB
        ====================================================== */}
        {activeTab === "customers" && (
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>
                  CUSTOMER INTELLIGENCE
                </span>

                <h3>Customer Insights</h3>
              </div>

              <span className={styles.customerIcon}>
                👥
              </span>
            </div>

            {customerLoading ? (
              <p
                style={{
                  color: "#888",
                  padding: "10px",
                }}
              >
                Loading customers...
              </p>
            ) : (
              <>
                <div className={styles.customerSummary}>
                  <div>
                    <strong>
                      {customerData?.followUpCount ?? 0}
                    </strong>

                </article>
              </section>
            )}
          </>
        )}

        {/* CUSTOMERS TAB */}
        {activeTab === "customers" && (
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

                  <div>                    <strong>
                      {customerData?.activeCount ?? 0}
                    </strong>

                    <strong>{customerSummary.activeCustomers ?? 0}</strong>
                    <span>Active customers</span>
                  </div>

                  <div>
                    <strong>
                      {customerData?.activityScore ?? "—"}
                    </strong>

                    <span>Activity score</span>
                  </div>
                </div>

                {customerData?.list?.length > 0 ? (
                  customerData.list.map((cust) => (
                    <div
                      className={styles.customerRow}
                      key={cust.id}
                    >
                      <div className={styles.avatar}>
                        {cust.initials || "CU"}
                      </div>

                      <div>
                        <h4>
                          {cust.name || "Customer"}
                        </h4>

                        <p>
                          {cust.desc ||
                            "Customer activity available"}
                        </p>
                      </div>

                      <span
                        className={
                          cust.badge === "High"
                            ? styles.highBadge
                            : styles.mediumBadge
                        }
                      >
                        {cust.badge || "Low"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      color: "#888",
                      padding: "10px",
                    }}
                  >
                    No customer insights available.
                  </p>
                )}
              </>
            )}
          </section>
        )}

        {/* =====================================================
            AI ASSISTANT TAB
        ====================================================== */}
        {activeTab === "chat" && (
          <section
            className={styles.card}
            style={{
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>
                  AI ASSISTANT
                </span>

                <h3>Ask HisabDo AI</h3>
              </div>

              <span className={styles.customerIcon}>
                ✦
              </span>
            </div>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px",
              }}
            >
              Ask questions about your business and financial
              activity.
            </p>

            <form onSubmit={handleChatSubmit}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  value={chatQuery}
                  onChange={(e) =>
                    setChatQuery(e.target.value)
                  }
                  placeholder="Ask something about your business..."
                  style={{
                    flex: 1,
                    minWidth: "220px",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    background: "rgba(15, 23, 42, 0.5)",
                    color: "inherit",
                    outline: "none",
                  }}
                  disabled={chatLoading}
                />

                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={chatLoading}
                >
                  {chatLoading
                    ? "Thinking..."
                    : "Ask AI"}
                </button>
              </div>
            </form>

            {chatReply && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  borderRadius: "12px",
                  background: "rgba(148, 163, 184, 0.08)",
                }}
              >
                <span className={styles.eyebrow}>
                  AI RESPONSE
                </span>

                <p
                  style={{
                    marginTop: "8px",
                    lineHeight: 1.6,
                  }}
                >
                  {chatReply}
                </p>
              </div>
            )}

            <button
              className={styles.fullButton}
              style={{ marginTop: "20px" }}
              onClick={() => setActiveTab("customers")}
            >
              View customer insights →
            </button>
          </section>
        )}

        {/* =====================================================
            MONTHLY INSIGHTS SUMMARY
        ====================================================== */}
        {activeTab === "overview" && (
          <section className={styles.monthlyCard}>
            {insightsLoading ? (
              <p
                style={{
                  padding: "20px",
                  color: "#888",
                }}
              >
                Fetching AI Monthly Insights...
              </p>
            ) : (
              <>
                <div>
                  <span className={styles.eyebrow}>
                    MONTHLY INSIGHTS
                  </span>

                  <h3>
                    {insightsData?.month ||
                      "Current Month"}{" "}
                    Business Overview
                  </h3>

                  <p>
                    {insightsData?.summary ||
                      "Your latest financial activity shows a positive trend."}
                  </p>
                </div>

                <div className={styles.monthlyStats}>
                  <div>
                    <span>Income</span>

                    <strong>
                      Rs. {insightsData?.income ?? "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Expenses</span>

                    <strong>
                      Rs. {insightsData?.expenses ?? "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Profit</span>

                    <strong>
                      Rs. {insightsData?.profit ?? "—"}
                    </strong>
                  </div>
                </div>

                <button
                  className={styles.primaryButton}
                  onClick={() => setActiveTab("insights")}
                >
                  View full report →
                </button>
              </>
            )}
          </section>
        )}

        {/* =====================================================
            FOOTER NOTE
        ====================================================== */}
                    <strong>{customerSummary.activityScore ?? 0}%</strong>
                    <span>Activity score</span>
                  </div>
                </div>
              )}

              {customers.slice(0, 3).map((cust) => (
                <div className={styles.customerRow} key={cust.id || cust.name}>
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
                      cust.riskBadge === "High" ? styles.highBadge : styles.mediumBadge
                    }
                  >
                    {cust.riskBadge || "Low"}
                  </span>
                </div>
              ))}

              <button className={styles.fullButton}>View customer insights →</button>
            </article>
          </section>
        )}

        <div className={styles.disclaimer}>
          <span>✦</span>

          HisabDo AI provides business insights to support your
          decisions. Always review important financial decisions
          before taking action.
        </div>
      </div>
    </main>
  );
}
