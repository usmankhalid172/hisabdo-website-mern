const request = require("supertest");
const app = require("../app");
const aiClient = require("../services/aiClient");

describe("HisabDo AI Integration Endpoints", () => {
  // ==========================================================================
  // 1. AI System Health & Connection
  // ==========================================================================
  describe("GET /api/ai/health", () => {
    it("should return AI integration client status", async () => {
      const res = await request(app).get("/api/ai/health");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("service", "HisabDo AI Client");
      expect(res.body).toHaveProperty("aiMicroservice");
      expect(res.body.aiMicroservice).toHaveProperty("status");
    });
  });

  // ==========================================================================
  // 2. Business Health Score + Monthly Insights
  // ==========================================================================
  describe("Business Health & Insights", () => {
    it("GET /api/ai/business-health should return 200 and schema matching app/ai/page.js UI", async () => {
      const res = await request(app).get("/api/ai/business-health");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", "success");
      expect(res.body).toHaveProperty("data");

      const { data } = res.body;

      // Summary card assertions
      expect(data).toHaveProperty("summaryCard");
      expect(data.summaryCard).toHaveProperty("eyebrow", "AI BUSINESS SUMMARY");
      expect(data.summaryCard).toHaveProperty("headline");
      expect(data.summaryCard).toHaveProperty("text");

      // Stats grid assertions
      expect(data).toHaveProperty("stats");
      expect(data.stats).toHaveProperty("businessHealth");
      expect(data.stats.businessHealth.score).toBeGreaterThanOrEqual(0);
      expect(data.stats.businessHealth.score).toBeLessThanOrEqual(100);
      expect(data.stats.businessHealth).toHaveProperty("statusText");

      expect(data.stats).toHaveProperty("monthlyProfit");
      expect(data.stats.monthlyProfit).toHaveProperty("displayValue");
      expect(data.stats.monthlyProfit).toHaveProperty("trend");

      expect(data.stats).toHaveProperty("customerActivity");
      expect(data.stats.customerActivity).toHaveProperty("displayValue");

      expect(data.stats).toHaveProperty("pendingPayments");
      expect(data.stats.pendingPayments).toHaveProperty("displayValue");
      expect(data.stats.pendingPayments).toHaveProperty("count");

      // Recommendations list assertions
      expect(Array.isArray(data.recommendations)).toBe(true);
      expect(data.recommendations.length).toBeGreaterThan(0);
      expect(data.recommendations[0]).toHaveProperty("icon");
      expect(data.recommendations[0]).toHaveProperty("title");
      expect(data.recommendations[0]).toHaveProperty("text");
      expect(data.recommendations[0]).toHaveProperty("action");
    });

    it("GET /api/ai/business-health accepts query parameter overrides", async () => {
      const res = await request(app).get("/api/ai/business-health?sales=200000&expenses=80000&customers=20&pending_payments=2");
      expect(res.statusCode).toBe(200);
      expect(res.body.data.stats.monthlyProfit.amount).toBe(120000);
      expect(res.body.data.stats.pendingPayments.count).toBe(2);
    });

    it("GET /api/ai/monthly-insights should return 200 and monthly overview", async () => {
      const res = await request(app).get("/api/ai/monthly-insights");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", "success");
      expect(res.body.data).toHaveProperty("eyebrow", "MONTHLY INSIGHTS");
      expect(res.body.data).toHaveProperty("metrics");
      expect(res.body.data.metrics).toHaveProperty("income");
      expect(res.body.data.metrics).toHaveProperty("expenses");
      expect(res.body.data.metrics).toHaveProperty("profit");
    });

    it("GET /api/ai/overview should return unified dashboard payload", async () => {
      const res = await request(app).get("/api/ai/overview");
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("summary");
      expect(res.body.data).toHaveProperty("stats");
      expect(res.body.data).toHaveProperty("monthlyInsights");
      expect(res.body.data).toHaveProperty("recommendations");
    });
  });

  // ==========================================================================
  // 3. Predictive Expense Alerts
  // ==========================================================================
  describe("Predictive Expense Alerts", () => {
    it("POST /api/ai/expenses/predict-alerts should validate missing fields", async () => {
      const res = await request(app).post("/api/ai/expenses/predict-alerts").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("POST /api/ai/expenses/predict-alerts should require >= 2 historical values", async () => {
      const res = await request(app).post("/api/ai/expenses/predict-alerts").send({
        category: "Inventory",
        historical_monthly_spending: [45000],
        current_spending: 55000,
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/at least two historical/i);
    });

    it("POST /api/ai/expenses/predict-alerts should evaluate surge and return high alert", async () => {
      const res = await request(app).post("/api/ai/expenses/predict-alerts").send({
        category: "Inventory",
        historical_monthly_spending: [40000.0, 42000.0],
        current_spending: 65000.0,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("alert");
      expect(res.body.data.alert).toHaveProperty("type", "high");
      expect(res.body.data.alert).toHaveProperty("icon", "⚠️");
      expect(res.body.data.percentageChange).toBeGreaterThan(20);
    });

    it("GET /api/expenses/alerts should return integrated expenses format with tips", async () => {
      const res = await request(app).get("/api/expenses/alerts");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("summary");
      expect(res.body.summary).toHaveProperty("totalExpenses");
      expect(Array.isArray(res.body.alerts)).toBe(true);
      expect(res.body.alerts.length).toBeGreaterThan(0);
      expect(Array.isArray(res.body.tips)).toBe(true);
      expect(res.body.tips.length).toBeGreaterThan(0);
    });
  });

  // ==========================================================================
  // 4. Customer Risk + Customer Follow-up
  // ==========================================================================
  describe("Customer Risk & Intelligence", () => {
    it("POST /api/ai/customers/risk-score should validate required fields", async () => {
      const res = await request(app).post("/api/ai/customers/risk-score").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("POST /api/ai/customers/risk-score should evaluate overdue customer as high risk", async () => {
      const res = await request(app).post("/api/ai/customers/risk-score").send({
        customer_id: "cust-test-1",
        average_purchase_interval: 10,
        days_since_last_purchase: 35,
        pending_payment: 12000,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("riskLevel", "High");
      expect(res.body.data).toHaveProperty("riskScore");
      expect(res.body.data.riskScore).toBeGreaterThanOrEqual(70);
      expect(res.body.data).toHaveProperty("recommendation");
    });

    it("POST /api/ai/customers/follow-up should return actionable recommendations", async () => {
      const res = await request(app).post("/api/ai/customers/follow-up").send([
        { customer_id: "c-1", purchase_date: "2026-07-20", amount: 9500 },
      ]);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("suggestions");
      expect(Array.isArray(res.body.data.suggestions)).toBe(true);
    });

    it("GET /api/customers should return customer list merged with AI intelligence", async () => {
      const res = await request(app).get("/api/customers");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("summary");
      expect(res.body.summary).toHaveProperty("needFollowUp");
      expect(res.body.summary).toHaveProperty("activeCustomers");
      expect(res.body.summary).toHaveProperty("activityScore");

      expect(Array.isArray(res.body.customers)).toBe(true);
      expect(res.body.customers.length).toBeGreaterThan(0);

      const customer = res.body.customers[0];
      expect(customer).toHaveProperty("name");
      expect(customer).toHaveProperty("initials");
      expect(customer).toHaveProperty("riskBadge");
      expect(customer).toHaveProperty("formattedBalance");
      expect(customer).toHaveProperty("followUpRequired");
      expect(customer).toHaveProperty("recommendedAction");
    });
  });

  // ==========================================================================
  // 5. AI Help / FAQ Assistant
  // ==========================================================================
  describe("AI Help & FAQ Assistant", () => {
    it("POST /api/ai/assistant/chat should reject empty query with 400", async () => {
      const res = await request(app).post("/api/ai/assistant/chat").send({ query: "   " });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Query text is required.");
    });

    it("POST /api/ai/assistant/chat should answer general query accurately", async () => {
      const res = await request(app).post("/api/ai/assistant/chat").send({
        query: "What is HisabDo?",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status", "success");
      expect(res.body.data).toHaveProperty("reply");
      expect(res.body.data.reply).toMatch(/offline-first khata|ledger/i);
      expect(res.body.data.confidence).toBeGreaterThan(0.5);
    });

    it("POST /api/ai/assistant/chat should explain customer balance management", async () => {
      const res = await request(app).post("/api/ai/assistant/chat").send({
        query: "How do I manage customer balances and Udhar?",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.reply).toMatch(/Udhar|Vasool|customer/i);
    });

    it("POST /api/ai/faq alias route should return same chat response", async () => {
      const res = await request(app).post("/api/ai/faq").send({
        query: "Does HisabDo work without internet?",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.reply).toMatch(/offline-first|without any internet/i);
    });

    it("GET /api/ai/assistant/faqs should return list of popular FAQs", async () => {
      const res = await request(app).get("/api/ai/assistant/faqs");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("faqs");
      expect(Array.isArray(res.body.faqs)).toBe(true);
      expect(res.body.faqs.length).toBeGreaterThan(5);
    });
  });

  // ==========================================================================
  // 6. Direct Client Service Fallback Engine Unit Tests
  // ==========================================================================
  describe("AI Client Service Direct Fallback Calculations", () => {
    it("calculateBusinessHealthFallback returns safe bounds", () => {
      const res = aiClient.calculateBusinessHealthFallback({
        sales: 100000,
        expenses: 40000,
        customers: 15,
        pending_payments: 1,
      });
      expect(res.health_score).toBeGreaterThanOrEqual(0);
      expect(res.health_score).toBeLessThanOrEqual(100);
      expect(res.profit).toBe(60000);
    });

    it("generatePredictiveExpenseAlertFallback flags surge correctly", () => {
      const res = aiClient.generatePredictiveExpenseAlertFallback({
        category: "Rent",
        historical_monthly_spending: [10000, 10000],
        current_spending: 15000,
      });
      expect(res.alert.type).toBe("high");
      expect(res.percentage_change).toBe(50);
    });

    it("searchFaqFallback gracefully handles unknown questions", () => {
      const res = aiClient.searchFaqFallback("Random unrelated question about astrophysics");
      expect(res).toHaveProperty("reply");
      expect(res.reply).toMatch(/HisabDo/);
    });
  });
});
