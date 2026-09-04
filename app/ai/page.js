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

  // --- ALL API STATES ---
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

  // --- FETCH ALL AI DATA ---
  useEffect(() => {
    const fetchAllAI = async () => {
      try {
        // 1. Health
        const hRes = await fetch("http://localhost:4000/api/ai/business-health");
        setHealthData(await hRes.json());
        setHealthLoading(false);

        // 2. Insights
        const iRes = await fetch("http://localhost:4000/api/ai/monthly-insights");
        setInsightsData(await iRes.json());
        setInsightsLoading(false);

        // 3. Alerts
        const aRes = await fetch("http://localhost:4000/api/ai/alerts");
        setAlertsData(await aRes.json());
        setAlertsLoading(false);

        // 4. Recommendations
        const rRes = await fetch("http://localhost:4000/api/ai/recommendations");
        setRecsData(await rRes.json());
        setRecsLoading(false);

        // 5. Goals
        const gRes = await fetch("http://localhost:4000/api/ai/goals");
        setGoalData(await gRes.json());
        setGoalLoading(false);

        // 6. Customers
        const cRes = await fetch("http://localhost:4000/api/ai/customers");
        setCustomerData(await cRes.json());
        setCustomerLoading(false);

      } catch (error) {
        console.error("AI API Fetch Error:", error);
      }
    };

    fetchAllAI();
  }, []);

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
          <button className={styles.refreshButton}>↻ Refresh insights</button>
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

        {/* AI SUMMARY */}
        <section className={styles.summaryCard}>
          <div className={styles.summaryIcon}>✦</div>
          <div className={styles.summaryContent}>
            <span className={styles.eyebrow}>AI BUSINESS SUMMARY</span>
            <h2>Your business is performing well this month.</h2>
            <p>
              Revenue and customer activity are looking healthy. However,
              inventory spending has increased and may need your attention.
            </p>
            <div className={styles.summaryActions}>
              <button className={styles.primaryButton}>View recommendations</button>
              <button className={styles.secondaryButton}>See monthly insights</button>
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
              <p style={{ color: '#888' }}>Loading...</p>
            ) : (
              <>
                <strong>{healthData?.score || 0}<span>/100</span></strong>
                <div className={styles.progress}>
                  <div style={{ width: `${healthData?.score || 0}%` }} />
                </div>
                <small>{healthData?.message || "Data unavailable"}</small>
              </>
            )}
          </article>

          <article className={styles.statCard}>
            <div className={styles.statTop}>
              <span>Monthly Profit</span>
              <span className={styles.greenIcon}>↗</span>
            </div>
            <strong>Rs. 60,000</strong>
            <div className={styles.changePositive}>↑ 8.4% from last month</div>
            <small>Based on your latest records</small>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statTop}>
              <span>Customer Activity</span>
              <span className={styles.blueIcon}>●</span>
            </div>
            <strong>84%</strong>
            <div className={styles.progress}>
              <div style={{ width: "84%" }} />
            </div>
            <small>Healthy customer activity</small>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statTop}>
              <span>Pending Payments</span>
              <span className={styles.orangeIcon}>!</span>
            </div>
            <strong>Rs. 15,000</strong>
            <div className={styles.changeWarning}>4 payments need attention</div>
            <small>Review outstanding balances</small>
          </article>
        </section>

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
              {recsLoading ? (
                <p style={{ color: '#888', padding: '10px' }}>Loading recommendations...</p>
              ) : (
                (Array.isArray(recsData) ? recsData : []).map((item) => (
                  <div className={styles.recommendation} key={item.title}>
                    <div className={styles.itemIcon}>{item.icon}</div>
                    <div className={styles.itemContent}>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                      <button>{item.action} →</button>
                    </div>
                  </div>
                ))
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
              <span className={styles.alertCount}>{alertsData.length}</span>
            </div>
            <div className={styles.alertList}>
              {alertsLoading ? (
                <p style={{ color: '#888', padding: '10px' }}>Loading alerts...</p>
              ) : (
                (Array.isArray(alertsData) ? alertsData : []).map((alert) => (
                  <div className={`${styles.alert} ${styles[alert.type]}`} key={alert.title}>
                    <div className={styles.alertIcon}>{alert.icon}</div>
                    <div>
                      <h4>{alert.title}</h4>
                      <p>{alert.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className={styles.fullButton}>View all alerts →</button>
          </article>
        </section>

        {/* SECOND ROW */}
        <section className={styles.mainGrid}>
          {/* GOALS */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>FINANCIAL PLANNING</span>
                <h3>Your Financial Goal</h3>
              </div>
              <span className={styles.goalIcon}>🎯</span>
            </div>
            {goalLoading ? (
              <p style={{ color: '#888', padding: '10px' }}>Loading goal...</p>
            ) : (
              <>
                <div className={styles.goalHeader}>
                  <div>
                    <h4>{goalData?.title || "Goal"}</h4>
                    <p>Rs. {goalData?.saved} saved of Rs. {goalData?.target}</p>
                  </div>
                  <strong>{goalData?.percentage}%</strong>
                </div>
                <div className={styles.goalProgress}>
                  <div style={{ width: `${goalData?.percentage || 0}%` }} />
                </div>
                <div className={styles.goalFooter}>
                  <span>Rs. {goalData?.remaining} remaining</span>
                  <span>{goalData?.status}</span>
                </div>
              </>
            )}
            <button className={styles.fullButton}>View action plan →</button>
          </article>

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
                <span className={styles.eyebrow}>CUSTOMER INTELLIGENCE</span>
                <h3>Customer Insights</h3>
              </div>
              <span className={styles.customerIcon}>👥</span>
            </div>
            {customerLoading ? (
              <p style={{ color: '#888', padding: '10px' }}>Loading customers...</p>
            ) : (
              <>
                <div className={styles.customerSummary}>
                  <div>
                    <strong>{customerData?.followUpCount}</strong>
                    <span>Need follow-up</span>
                  </div>
                  <div>
                    <strong>{customerData?.activeCount}</strong>
                    <span>Active customers</span>
                  </div>
                  <div>
                    <strong>{customerData?.activityScore}</strong>
                    <span>Activity score</span>
                  </div>
                </div>
                {customerData?.list?.map((cust) => (
                  <div className={styles.customerRow} key={cust.id}>
                    <div className={styles.avatar}>{cust.initials}</div>
                    <div>
                      <h4>{cust.name}</h4>
                      <p>{cust.desc}</p>
                    </div>
                    <span className={cust.badge === "High" ? styles.highBadge : styles.mediumBadge}>
                      {cust.badge}
                    </span>
                  </div>
                ))}
              </>
            )}
            <button className={styles.fullButton}>View customer insights →</button>
          </article>
        </section>

        {/* MONTHLY INSIGHTS */}
        <section className={styles.monthlyCard}>
          {insightsLoading ? (
            <p style={{ padding: "20px", color: "#888" }}>Fetching AI Monthly Insights...</p>
          ) : (
            <>
              <div>
                <span className={styles.eyebrow}>MONTHLY INSIGHTS</span>
                <h3>{insightsData?.month || "Current Month"} Business Overview</h3>
                <p>{insightsData?.summary}</p>
              </div>
              <div className={styles.monthlyStats}>
                <div>
                  <span>Income</span>
                  <strong>Rs. {insightsData?.income}</strong>
                </div>
                <div>
                  <span>Expenses</span>
                  <strong>Rs. {insightsData?.expenses}</strong>
                </div>
                <div>
                  <span>Profit</span>
                  <strong>Rs. {insightsData?.profit}</strong>
                </div>
              </div>
              <button className={styles.primaryButton}>View full report →</button>
            </>
          )}
        </section>

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