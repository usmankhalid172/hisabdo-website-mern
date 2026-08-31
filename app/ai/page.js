"use client";

import { useState } from "react";
import styles from "./ai.module.css";

const recommendations = [
  {
    icon: "💡",
    title: "Review inventory spending",
    text: "Your inventory expenses are higher than your recent average.",
    action: "View insight",
  },
  {
    icon: "📊",
    title: "Check monthly performance",
    text: "Your business performance has improved compared with last month.",
    action: "View report",
  },
  {
    icon: "👥",
    title: "Follow up with customers",
    text: "3 customers may need a follow-up based on recent activity.",
    action: "View customers",
  },
];

const alerts = [
  {
    type: "high",
    icon: "⚠️",
    title: "High expense detected",
    text: "Inventory spending is above your normal range.",
  },
  {
    type: "medium",
    icon: "🔔",
    title: "Payment approaching",
    text: "A recurring payment may be due soon.",
  },
  {
    type: "low",
    icon: "✨",
    title: "Monthly review available",
    text: "Your latest monthly business insights are ready.",
  },
];

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("overview");

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
            </div>

            <h1>Business intelligence, made simple.</h1>

            <p>
              Get smarter insights from your business activity and make
              better financial decisions with HisabDo AI.
            </p>
          </div>

          <button className={styles.refreshButton}>
            ↻ Refresh insights
          </button>
        </header>

        {/* TABS */}
        <nav className={styles.tabs}>
          {[
            ["overview", "Overview"],
            ["insights", "Insights"],
            ["customers", "Customers"],
            ["goals", "Goals"],
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
              <button className={styles.primaryButton}>
                View recommendations
              </button>

              <button className={styles.secondaryButton}>
                See monthly insights
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className={styles.statsGrid}>
          <article className={styles.statCard}>
            <div className={styles.statTop}>
              <span>Business Health</span>
              <span className={styles.greenIcon}>♥</span>
            </div>

            <strong>82<span>/100</span></strong>

            <div className={styles.progress}>
              <div style={{ width: "82%" }} />
            </div>

            <small>Excellent performance</small>
          </article>

          <article className={styles.statCard}>
            <div className={styles.statTop}>
              <span>Monthly Profit</span>
              <span className={styles.greenIcon}>↗</span>
            </div>

            <strong>Rs. 60,000</strong>

            <div className={styles.changePositive}>
              ↑ 8.4% from last month
            </div>

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

            <div className={styles.changeWarning}>
              4 payments need attention
            </div>

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
              {recommendations.map((item) => (
                <div className={styles.recommendation} key={item.title}>
                  <div className={styles.itemIcon}>{item.icon}</div>

                  <div className={styles.itemContent}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>

                    <button>{item.action} →</button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* ALERTS */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>ATTENTION</span>
                <h3>Smart Alerts</h3>
              </div>

              <span className={styles.alertCount}>3</span>
            </div>

            <div className={styles.alertList}>
              {alerts.map((alert) => (
                <div
                  className={`${styles.alert} ${styles[alert.type]}`}
                  key={alert.title}
                >
                  <div className={styles.alertIcon}>{alert.icon}</div>

                  <div>
                    <h4>{alert.title}</h4>
                    <p>{alert.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.fullButton}>
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
                <span className={styles.eyebrow}>FINANCIAL PLANNING</span>
                <h3>Your Financial Goal</h3>
              </div>

              <span className={styles.goalIcon}>🎯</span>
            </div>

            <div className={styles.goalHeader}>
              <div>
                <h4>New Shop</h4>
                <p>Rs. 200,000 saved of Rs. 500,000</p>
              </div>

              <strong>40%</strong>
            </div>

            <div className={styles.goalProgress}>
              <div style={{ width: "40%" }} />
            </div>

            <div className={styles.goalFooter}>
              <span>Rs. 300,000 remaining</span>
              <span>On track</span>
            </div>

            <button className={styles.fullButton}>
              View action plan →
            </button>
          </article>

          {/* CUSTOMER INSIGHTS */}
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <span className={styles.eyebrow}>CUSTOMER INTELLIGENCE</span>
                <h3>Customer Insights</h3>
              </div>

              <span className={styles.customerIcon}>👥</span>
            </div>

            <div className={styles.customerSummary}>
              <div>
                <strong>3</strong>
                <span>Need follow-up</span>
              </div>

              <div>
                <strong>12</strong>
                <span>Active customers</span>
              </div>

              <div>
                <strong>84%</strong>
                <span>Activity score</span>
              </div>
            </div>

            <div className={styles.customerRow}>
              <div className={styles.avatar}>AT</div>

              <div>
                <h4>Ahmed Traders</h4>
                <p>Last purchase 28 days ago</p>
              </div>

              <span className={styles.mediumBadge}>Medium</span>
            </div>

            <div className={styles.customerRow}>
              <div className={styles.avatar}>MS</div>

              <div>
                <h4>Malik Store</h4>
                <p>Follow-up recommended</p>
              </div>

              <span className={styles.highBadge}>High</span>
            </div>

            <button className={styles.fullButton}>
              View customer insights →
            </button>
          </article>
        </section>

        {/* MONTHLY INSIGHTS */}
        <section className={styles.monthlyCard}>
          <div>
            <span className={styles.eyebrow}>MONTHLY INSIGHTS</span>
            <h3>August 2026 Business Overview</h3>
            <p>
              Your latest financial activity shows a positive trend with
              opportunities to improve expense control.
            </p>
          </div>

          <div className={styles.monthlyStats}>
            <div>
              <span>Income</span>
              <strong>Rs. 150K</strong>
            </div>

            <div>
              <span>Expenses</span>
              <strong>Rs. 90K</strong>
            </div>

            <div>
              <span>Profit</span>
              <strong>Rs. 60K</strong>
            </div>
          </div>

          <button className={styles.primaryButton}>
            View full report →
          </button>
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