"use client";

import { useState, useEffect } from "react";
import styles from "./ai.module.css";

const API_BASE = "";

async function fetchJson(path, options) {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  return response.json();
}

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("");

  const [summary, setSummary] = useState(null);
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerSummary, setCustomerSummary] = useState(null);
  const [monthly, setMonthly] = useState(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [overviewResult, monthlyResult, alertsResult, customersResult] = await Promise.allSettled([
        fetchJson("/api/ai/overview"),
        fetchJson("/api/ai/monthly-insights"),
        fetchJson("/api/expenses/alerts"),
        fetchJson("/api/customers"),
      ]);

      const overviewData = overviewResult.status === "fulfilled" ? overviewResult.value : null;
      const monthlyData = monthlyResult.status === "fulfilled" ? monthlyResult.value : null;
      const alertsData = alertsResult.status === "fulfilled" ? alertsResult.value : null;
      const customersData = customersResult.status === "fulfilled" ? customersResult.value : null;

      if (overviewData?.data) {
        setSummary(overviewData.data.summaryCard || null);
        setStats(overviewData.data.stats || null);
        setRecommendations(overviewData.data.recommendations || []);
        setSource(overviewData.source || "");
      }

      if (monthlyData?.data) {
        setMonthly(monthlyData.data);
      }

      if (alertsData?.alerts) {
        setAlerts(alertsData.alerts);
      }

      if (customersData?.customers) {
        setCustomers(customersData.customers);
        setCustomerSummary(customersData.summary || null);
      }
      if ([overviewResult, monthlyResult, alertsResult, customersResult].every((result) => result.status === "rejected")) {
        throw overviewResult.reason;
      }
    } catch (err) {
      console.error("AI data fetch error:", err);
      setError("The AI service is unavailable. Start the API server or check NEXT_PUBLIC_API_BASE_URL, then try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

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
          HisabDo AI provides business insights to support your decisions.
          Always review important financial decisions before taking action.
        </div>
      </div>
    </main>
  );
}
