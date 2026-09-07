/**
 * Verification Script for HisabDo AI Endpoints
 * Tests every endpoint with realistic request bodies and validates response shape.
 */

const request = require("supertest");
const app = require("../app");

async function runVerification() {
  console.log("=================================================");
  console.log("🚀 Starting HisabDo AI Endpoints Verification");
  console.log("=================================================\n");

  const results = [];

  async function testEndpoint(name, fn) {
    const t0 = Date.now();
    try {
      await fn();
      const duration = Date.now() - t0;
      console.log(`✅ [PASS] ${name} (${duration}ms)`);
      results.push({ name, status: "PASS", duration });
    } catch (err) {
      const duration = Date.now() - t0;
      console.error(`❌ [FAIL] ${name} (${duration}ms): ${err.message}`);
      results.push({ name, status: "FAIL", duration, error: err.message });
    }
  }

  // 1. Health
  await testEndpoint("GET /api/ai/health", async () => {
    const res = await request(app).get("/api/ai/health");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${JSON.stringify(res.body)}`);
    if (res.body.service !== "HisabDo AI Client") throw new Error("Invalid service label");
  });

  // 2. Business Health
  await testEndpoint("GET /api/ai/business-health", async () => {
    const res = await request(app).get("/api/ai/business-health");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    const { summaryCard, stats, recommendations } = res.body.data;
    if (!summaryCard || !stats || !recommendations) throw new Error("Missing UI schema parts");
    if (typeof stats.businessHealth.score !== "number") throw new Error("Score not a number");
    if (stats.monthlyProfit.trend !== "positive") throw new Error("Missing trend in profit");
  });

  // 3. Monthly Insights
  await testEndpoint("GET /api/ai/monthly-insights", async () => {
    const res = await request(app).get("/api/ai/monthly-insights");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.data.metrics.income || !res.body.data.metrics.expenses) throw new Error("Missing metrics");
  });

  // 4. AI Overview
  await testEndpoint("GET /api/ai/overview", async () => {
    const res = await request(app).get("/api/ai/overview");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.data.summary || !res.body.data.stats) throw new Error("Missing overview sections");
  });

  // 5. Predictive Expense Alerts
  await testEndpoint("POST /api/ai/expenses/predict-alerts", async () => {
    const res = await request(app).post("/api/ai/expenses/predict-alerts").send({
      category: "Inventory",
      historical_monthly_spending: [40000.0, 42000.0],
      current_spending: 58500.0,
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}: ${JSON.stringify(res.body)}`);
    if (res.body.data.alert.type !== "high") throw new Error("Expected high alert on surge");
  });

  // 6. Integrated Expense Alerts
  await testEndpoint("GET /api/expenses/alerts", async () => {
    const res = await request(app).get("/api/expenses/alerts");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!Array.isArray(res.body.alerts) || res.body.alerts.length === 0) throw new Error("Missing alerts");
    if (!Array.isArray(res.body.tips) || res.body.tips.length === 0) throw new Error("Missing tips");
  });

  // 7. Customer Risk Scoring
  await testEndpoint("POST /api/ai/customers/risk-score", async () => {
    const res = await request(app).post("/api/ai/customers/risk-score").send({
      customer_id: "cust-test",
      average_purchase_interval: 12.0,
      days_since_last_purchase: 35.0,
      pending_payment: 12500.0,
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.body.data.riskLevel !== "High") throw new Error("Expected High risk");
  });

  // 8. Customer Follow-Up Suggestions
  await testEndpoint("POST /api/ai/customers/follow-up", async () => {
    const res = await request(app).post("/api/ai/customers/follow-up").send([
      { customer_id: "cust-1", purchase_date: "2026-07-25", amount: 12500.0 },
    ]);
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!Array.isArray(res.body.data.suggestions)) throw new Error("Missing suggestions array");
  });

  // 9. Merged Customers with AI Insights
  await testEndpoint("GET /api/customers", async () => {
    const res = await request(app).get("/api/customers");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.summary || res.body.summary.needFollowUp === undefined) throw new Error("Missing summary");
    if (!Array.isArray(res.body.customers) || res.body.customers.length === 0) throw new Error("Missing customers");
    const c1 = res.body.customers[0];
    if (!c1.initials || !c1.riskBadge || !c1.recommendedAction) throw new Error("Customer missing AI fields");
  });

  // 10. AI Assistant Chat (FAQ & conversational)
  await testEndpoint("POST /api/ai/assistant/chat", async () => {
    const res = await request(app).post("/api/ai/assistant/chat").send({
      query: "What is HisabDo?",
    });
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (!res.body.data.reply) throw new Error("Missing reply");
    if (!res.body.data.reply.includes("khata")) throw new Error("Reply does not mention khata");
  });

  // 11. AI Assistant Validation (reject empty query)
  await testEndpoint("POST /api/ai/assistant/chat (empty query validation)", async () => {
    const res = await request(app).post("/api/ai/assistant/chat").send({
      query: "   ",
    });
    if (res.statusCode !== 400) throw new Error(`Expected 400 but got ${res.statusCode}`);
    if (res.body.error !== "Query text is required.") throw new Error("Wrong error message");
  });

  // 12. Popular FAQs list
  await testEndpoint("GET /api/ai/assistant/faqs", async () => {
    const res = await request(app).get("/api/ai/assistant/faqs");
    if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
    if (res.body.count < 5) throw new Error("Insufficient FAQs returned");
  });

  console.log("\n=================================================");
  console.log(`🎉 Summary: ${results.filter((r) => r.status === "PASS").length} passed, ${results.filter((r) => r.status === "FAIL").length} failed.`);
  console.log("=================================================");

  const allPassed = results.every((r) => r.status === "PASS");
  process.exit(allPassed ? 0 : 1);
}

runVerification();
