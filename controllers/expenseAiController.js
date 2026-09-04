/**
 * Expense AI Controller
 * Handles predictive expense alerts, anomaly detection, and financial tips.
 * Integrates alerts into the HisabDo Expenses module response shape.
 */

const aiClient = require("../services/aiClient");

const DEFAULT_EXPENSES_SUMMARY = {
  totalExpenses: 90000.0,
  budget: 95000.0,
  projectedMonthEnd: 104000.0,
  status: "warning",
  currency: "PKR",
  categories: [
    { name: "Inventory", current: 58500.0, average: 48000.0, status: "high" },
    { name: "Utilities", current: 18000.0, average: 17500.0, status: "medium" },
    { name: "Transport & Logistics", current: 13500.0, average: 14000.0, status: "low" },
  ],
};

const DEFAULT_SMART_ALERTS = [
  {
    id: "alert-1",
    type: "high",
    icon: "⚠️",
    title: "High expense detected",
    text: "Inventory spending is above your normal range.",
    category: "Inventory",
    timestamp: new Date().toISOString(),
  },
  {
    id: "alert-2",
    type: "medium",
    icon: "🔔",
    title: "Payment approaching",
    text: "A recurring payment may be due soon.",
    category: "Utilities",
    timestamp: new Date().toISOString(),
  },
  {
    id: "alert-3",
    type: "low",
    icon: "✨",
    title: "Monthly review available",
    text: "Your latest monthly business insights are ready.",
    category: "General",
    timestamp: new Date().toISOString(),
  },
];

const FINANCE_TIPS = [
  "Inventory costs rose 21% this month. Inquire about wholesale advance discounts with your primary distributor.",
  "Set a weekly budget cap of Rs. 22,000 to keep end-of-month operational expenses within safe margins.",
  "Export weekly expense ledger summaries to track recurring utility bills before due dates.",
];

/**
 * POST /api/ai/expenses/predict-alerts
 * Calls AI endpoint with specific category spending data to generate prediction
 */
async function predictExpenseAlert(req, res, next) {
  try {
    const { category, historical_monthly_spending, current_spending } = req.body || {};

    if (!category || typeof category !== "string") {
      return res.status(400).json({ error: "Category name is required." });
    }

    if (!Array.isArray(historical_monthly_spending) || historical_monthly_spending.length < 2) {
      return res.status(400).json({
        error: "At least two historical monthly values are required in historical_monthly_spending.",
      });
    }

    if (current_spending === undefined || isNaN(Number(current_spending))) {
      return res.status(400).json({ error: "Valid current_spending number is required." });
    }

    const aiPayload = {
      category,
      historical_monthly_spending: historical_monthly_spending.map(Number),
      current_spending: Number(current_spending),
    };

    const aiResult = await aiClient.fetchPredictiveExpenseAlert(aiPayload);

    return res.json({
      status: "success",
      source: aiResult._source,
      data: {
        category,
        currentSpending: Number(current_spending),
        historicalAverage: aiResult.historical_average,
        percentageChange: aiResult.percentage_change,
        alert: aiResult.alert || {
          type: "medium",
          icon: "🔔",
          title: `Expense alert for ${category}`,
          text: `Spending is currently at Rs. ${Number(current_spending).toLocaleString()}`,
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/expenses/alerts
 * Returns full expense overview integrated with AI predictions and financial tips
 */
async function getExpenseAlerts(req, res, next) {
  try {
    // Generate fresh alert for top category
    const inventoryPrediction = await aiClient.fetchPredictiveExpenseAlert({
      category: "Inventory",
      historical_monthly_spending: [45000.0, 48000.0],
      current_spending: 58500.0,
    });

    const dynamicAlerts = [...DEFAULT_SMART_ALERTS];
    if (inventoryPrediction.alert) {
      dynamicAlerts[0] = {
        id: "alert-1",
        type: inventoryPrediction.alert.type || "high",
        icon: inventoryPrediction.alert.icon || "⚠️",
        title: inventoryPrediction.alert.title || "High expense detected",
        text: inventoryPrediction.alert.text || "Inventory spending is above your normal range.",
        category: "Inventory",
        timestamp: new Date().toISOString(),
      };
    }

    return res.json({
      status: "success",
      summary: DEFAULT_EXPENSES_SUMMARY,
      alerts: dynamicAlerts,
      tips: FINANCE_TIPS,
      meta: {
        totalAlerts: dynamicAlerts.length,
        highPriorityCount: dynamicAlerts.filter((a) => a.type === "high").length,
        lastEvaluated: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  predictExpenseAlert,
  getExpenseAlerts,
};
