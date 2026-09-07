/**
 * AI Controller for Business Health Score & Monthly Insights
 * Shapes responses according to the UI schema in app/ai/page.js
 */

const aiClient = require("../services/aiClient");

// Default business metrics for fallback / prototype demonstration
const DEFAULT_BUSINESS_DATA = {
  sales: 150000.0,
  expenses: 90000.0,
  customers: 12,
  pending_payments: 4,
  pending_amount: 15000.0,
  month: "August 2026",
  category_expenses: [
    { category: "Inventory", amount: 58500.0 },
    { category: "Utilities", amount: 18000.0 },
    { category: "Transport & Logistics", amount: 13500.0 },
  ],
};

/**
 * GET /api/ai/business-health
 * Fetches health score and shapes into UI stat cards schema
 */
async function getBusinessHealth(req, res, next) {
  try {
    const sales = req.query.sales ? parseFloat(req.query.sales) : DEFAULT_BUSINESS_DATA.sales;
    const expenses = req.query.expenses ? parseFloat(req.query.expenses) : DEFAULT_BUSINESS_DATA.expenses;
    const customers = req.query.customers ? parseInt(req.query.customers, 10) : DEFAULT_BUSINESS_DATA.customers;
    const pendingPayments = req.query.pending_payments ? parseInt(req.query.pending_payments, 10) : DEFAULT_BUSINESS_DATA.pending_payments;
    const pendingAmount = req.query.pending_amount ? parseFloat(req.query.pending_amount) : DEFAULT_BUSINESS_DATA.pending_amount;

    const aiPayload = {
      sales,
      expenses,
      customers,
      pending_payments: pendingPayments,
    };

    const aiResult = await aiClient.fetchBusinessHealth(aiPayload);

    const score = Number(aiResult.business_health_score || aiResult.health_score || 82);
    const profit = Number(aiResult.profit !== undefined ? aiResult.profit : sales - expenses);
    const rating = aiResult.rating || (score >= 80 ? "Excellent performance" : "Healthy performance");

    // Exact UI Schema matching app/ai/page.js
    const formattedResponse = {
      status: "success",
      source: aiResult._source,
      data: {
        summaryCard: {
          eyebrow: "AI BUSINESS SUMMARY",
          headline: score >= 75 ? "Your business is performing well this month." : "Business needs active cashflow management.",
          text: `Revenue and customer activity are looking healthy. However, inventory spending has increased and may need your attention. Total profit is Rs. ${profit.toLocaleString()}.`,
          actions: [
            { label: "View recommendations", target: "recommendations" },
            { label: "See monthly insights", target: "insights" },
          ],
        },
        stats: {
          businessHealth: {
            title: "Business Health",
            icon: "♥",
            score: score,
            maxScore: 100,
            displayValue: `${score}/100`,
            progressPercentage: score,
            statusText: rating,
          },
          monthlyProfit: {
            title: "Monthly Profit",
            icon: "↗",
            amount: profit,
            displayValue: `Rs. ${profit.toLocaleString()}`,
            change: "↑ 8.4% from last month",
            trend: "positive",
            subtitle: "Based on your latest records",
          },
          customerActivity: {
            title: "Customer Activity",
            icon: "●",
            score: 84,
            displayValue: "84%",
            progressPercentage: 84,
            statusText: "Healthy customer activity",
          },
          pendingPayments: {
            title: "Pending Payments",
            icon: "!",
            amount: pendingAmount,
            displayValue: `Rs. ${pendingAmount.toLocaleString()}`,
            count: pendingPayments,
            warningText: `${pendingPayments} payments need attention`,
            subtitle: "Review outstanding balances",
          },
        },
        recommendations: aiResult.recommendations || [
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
            text: `${pendingPayments} customers may need a follow-up based on recent activity.`,
            action: "View customers",
          },
        ],
      },
    };

    return res.json(formattedResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/ai/monthly-insights
 * Fetches monthly financial insights and formats for UI MonthlyCard
 */
async function getMonthlyInsights(req, res, next) {
  try {
    const month = req.query.month || DEFAULT_BUSINESS_DATA.month;
    const income = req.query.income ? parseFloat(req.query.income) : DEFAULT_BUSINESS_DATA.sales;
    const expenses = req.query.expenses ? parseFloat(req.query.expenses) : DEFAULT_BUSINESS_DATA.expenses;

    const aiPayload = {
      month,
      income,
      expenses,
      category_expenses: DEFAULT_BUSINESS_DATA.category_expenses,
    };

    const aiResult = await aiClient.fetchMonthlyInsights(aiPayload);
    const profit = aiResult.profit !== undefined ? aiResult.profit : income - expenses;

    const formattedResponse = {
      status: "success",
      source: aiResult._source,
      data: {
        eyebrow: "MONTHLY INSIGHTS",
        title: `${month} Business Overview`,
        overview: aiResult.overview || "Your latest financial activity shows a positive trend with opportunities to improve expense control.",
        metrics: {
          income: {
            raw: income,
            display: `Rs. ${Math.round(income / 1000)}K`,
            fullFormatted: `Rs. ${income.toLocaleString()}`,
          },
          expenses: {
            raw: expenses,
            display: `Rs. ${Math.round(expenses / 1000)}K`,
            fullFormatted: `Rs. ${expenses.toLocaleString()}`,
          },
          profit: {
            raw: profit,
            display: `Rs. ${Math.round(profit / 1000)}K`,
            fullFormatted: `Rs. ${profit.toLocaleString()}`,
          },
        },
        savingsRate: aiResult.savings_rate || Number(((profit / (income || 1)) * 100).toFixed(1)),
        categoryBreakdown: aiResult.category_breakdown || DEFAULT_BUSINESS_DATA.category_expenses,
      },
    };

    return res.json(formattedResponse);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/ai/overview
 * Combined overview aggregation matching full app/ai/page.js dashboard
 */
async function getAiOverview(req, res, next) {
  try {
    const healthResult = await aiClient.fetchBusinessHealth(DEFAULT_BUSINESS_DATA);
    const insightsResult = await aiClient.fetchMonthlyInsights({
      month: DEFAULT_BUSINESS_DATA.month,
      income: DEFAULT_BUSINESS_DATA.sales,
      expenses: DEFAULT_BUSINESS_DATA.expenses,
      category_expenses: DEFAULT_BUSINESS_DATA.category_expenses,
    });

    const score = Number(healthResult.business_health_score || healthResult.health_score || 82);
    const profit = DEFAULT_BUSINESS_DATA.sales - DEFAULT_BUSINESS_DATA.expenses;

    return res.json({
      status: "success",
      source: {
        health: healthResult._source,
        insights: insightsResult._source,
      },
      data: {
        summary: {
          eyebrow: "AI BUSINESS SUMMARY",
          headline: "Your business is performing well this month.",
          text: "Revenue and customer activity are looking healthy. However, inventory spending has increased and may need your attention.",
        },
        stats: {
          businessHealth: { score, rating: "Excellent performance", progress: score },
          monthlyProfit: { amount: profit, formatted: `Rs. ${profit.toLocaleString()}`, change: "↑ 8.4% from last month" },
          customerActivity: { score: 84, formatted: "84%", status: "Healthy customer activity" },
          pendingPayments: { amount: 15000, formatted: "Rs. 15,000", count: 4, warning: "4 payments need attention" },
        },
        monthlyInsights: {
          month: DEFAULT_BUSINESS_DATA.month,
          incomeDisplay: "Rs. 150K",
          expensesDisplay: "Rs. 90K",
          profitDisplay: "Rs. 60K",
          overview: insightsResult.overview || "Your latest financial activity shows a positive trend with opportunities to improve expense control.",
        },
        recommendations: healthResult.recommendations || [
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
        ],
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/ai/health
 * Connection check to the external AI service
 */
async function getAiHealth(req, res, next) {
  try {
    const health = await aiClient.checkAiBackendHealth();
    return res.json({
      service: "HisabDo AI Client",
      aiMicroservice: health,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getBusinessHealth,
  getMonthlyInsights,
  getAiOverview,
  getAiHealth,
};
