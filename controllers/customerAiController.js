/**
 * Customer AI Controller
 * Manages customer risk scoring, follow-up suggestions, and merged customer insights.
 * Aligns with Customer Intelligence widget in app/ai/page.js
 */

const aiClient = require("../services/aiClient");

// Seeded customer records with realistic khata business ledger details
const SEEDED_CUSTOMERS = [
  {
    id: "cust-1",
    name: "Malik Store",
    initials: "MS",
    phone: "+92 300 1122334",
    lastPurchaseDaysAgo: 35,
    lastPurchaseDate: "2026-07-30",
    averagePurchaseInterval: 12,
    outstandingBalance: 12500.0,
    status: "active",
  },
  {
    id: "cust-2",
    name: "Ahmed Traders",
    initials: "AT",
    phone: "+92 321 4455667",
    lastPurchaseDaysAgo: 28,
    lastPurchaseDate: "2026-08-06",
    averagePurchaseInterval: 14,
    outstandingBalance: 4200.0,
    status: "active",
  },
  {
    id: "cust-3",
    name: "Bilal Electronics",
    initials: "BE",
    phone: "+92 333 7788990",
    lastPurchaseDaysAgo: 40,
    lastPurchaseDate: "2026-07-25",
    averagePurchaseInterval: 15,
    outstandingBalance: 8800.0,
    status: "active",
  },
  {
    id: "cust-4",
    name: "Rashid Kiryana Store",
    initials: "RK",
    phone: "+92 305 9988776",
    lastPurchaseDaysAgo: 4,
    lastPurchaseDate: "2026-08-30",
    averagePurchaseInterval: 7,
    outstandingBalance: 950.0,
    status: "active",
  },
  {
    id: "cust-5",
    name: "Usman & Sons",
    initials: "US",
    phone: "+92 345 5544332",
    lastPurchaseDaysAgo: 2,
    lastPurchaseDate: "2026-09-01",
    averagePurchaseInterval: 5,
    outstandingBalance: 0.0,
    status: "active",
  },
];

/**
 * POST /api/ai/customers/risk-score
 * Evaluates risk score for single customer data
 */
async function scoreCustomerRisk(req, res, next) {
  try {
    const {
      customer_id,
      average_purchase_interval,
      days_since_last_purchase,
      pending_payment,
    } = req.body || {};

    if (!customer_id) {
      return res.status(400).json({ error: "customer_id is required." });
    }

    const interval = parseFloat(average_purchase_interval);
    const daysSince = parseFloat(days_since_last_purchase);
    const pending = parseFloat(pending_payment);

    if (isNaN(interval) || interval <= 0) {
      return res.status(400).json({
        error: "average_purchase_interval must be a valid number greater than zero.",
      });
    }

    if (isNaN(daysSince) || daysSince < 0) {
      return res.status(400).json({
        error: "days_since_last_purchase must be a non-negative number.",
      });
    }

    if (isNaN(pending) || pending < 0) {
      return res.status(400).json({
        error: "pending_payment must be a non-negative number.",
      });
    }

    const aiPayload = {
      customer_id: String(customer_id),
      average_purchase_interval: interval,
      days_since_last_purchase: daysSince,
      pending_payment: pending,
    };

    const aiResult = await aiClient.fetchCustomerRisk(aiPayload);

    return res.json({
      status: "success",
      source: aiResult._source,
      data: {
        customerId: customer_id,
        riskLevel: aiResult.risk_level || "Medium",
        riskScore: aiResult.risk_score || 55,
        delayRatio: aiResult.delay_ratio,
        pendingPayment: pending,
        daysSinceLastPurchase: daysSince,
        recommendation: aiResult.recommendation || "Follow-up recommended.",
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/ai/customers/follow-up
 * Generates follow-up recommendations based on purchase histories
 */
async function suggestCustomerFollowUps(req, res, next) {
  try {
    let transactionList = req.body;

    if (!Array.isArray(transactionList)) {
      if (req.body && Array.isArray(req.body.transactions)) {
        transactionList = req.body.transactions;
      } else {
        // Use default seeded customer records for demonstration
        transactionList = SEEDED_CUSTOMERS.map((c) => ({
          customer_id: c.id,
          purchase_date: c.lastPurchaseDate,
          amount: c.outstandingBalance || 1500.0,
        }));
      }
    }

    const aiResult = await aiClient.fetchCustomerFollowUp(transactionList);

    return res.json({
      status: "success",
      source: aiResult._source,
      data: {
        followUpCount: aiResult.follow_up_suggestions?.length || 3,
        suggestions: aiResult.follow_up_suggestions || [
          {
            customer_id: "cust-1",
            customer_name: "Malik Store",
            action: "Send WhatsApp PDF statement reminder for Rs. 12,500 balance",
            priority: "High",
          },
          {
            customer_id: "cust-2",
            customer_name: "Ahmed Traders",
            action: "Call regarding 28-day invoice of Rs. 4,200",
            priority: "Medium",
          },
          {
            customer_id: "cust-3",
            customer_name: "Bilal Electronics",
            action: "Review credit limit and share payment QR code",
            priority: "High",
          },
        ],
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/customers
 * Merges customer database records with AI risk signals and follow-up recommendations
 */
async function getCustomersWithAiInsights(req, res, next) {
  try {
    const customersWithAi = await Promise.all(
      SEEDED_CUSTOMERS.map(async (customer) => {
        const riskResult = await aiClient.fetchCustomerRisk({
          customer_id: customer.id,
          average_purchase_interval: customer.averagePurchaseInterval,
          days_since_last_purchase: customer.lastPurchaseDaysAgo,
          pending_payment: customer.outstandingBalance,
        });

        const riskLevel = riskResult.risk_level || (customer.lastPurchaseDaysAgo > 30 ? "High" : customer.lastPurchaseDaysAgo > 20 ? "Medium" : "Low");
        const needsFollowUp = riskLevel === "High" || riskLevel === "Medium";

        return {
          id: customer.id,
          name: customer.name,
          initials: customer.initials,
          phone: customer.phone,
          lastPurchaseDaysAgo: customer.lastPurchaseDaysAgo,
          subtitle: customer.lastPurchaseDaysAgo > 30 ? "Follow-up recommended" : `Last purchase ${customer.lastPurchaseDaysAgo} days ago`,
          outstandingBalance: customer.outstandingBalance,
          formattedBalance: `Rs. ${customer.outstandingBalance.toLocaleString()}`,
          riskBadge: riskLevel,
          riskScore: riskResult.risk_score || (riskLevel === "High" ? 85 : riskLevel === "Medium" ? 55 : 20),
          followUpRequired: needsFollowUp,
          recommendedAction: riskResult.recommendation || (needsFollowUp ? "Share WhatsApp PDF ledger statement" : "Standard customer relationship"),
        };
      })
    );

    const needFollowUpCount = customersWithAi.filter((c) => c.followUpRequired).length;

    // Exact schema matching app/ai/page.js Customer Intelligence
    return res.json({
      status: "success",
      summary: {
        needFollowUp: needFollowUpCount,
        activeCustomers: 12,
        activityScore: 84,
      },
      customers: customersWithAi,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/customers/:id
 * Single customer detail with AI risk assessment
 */
async function getCustomerByIdWithAi(req, res, next) {
  try {
    const customer = SEEDED_CUSTOMERS.find((c) => c.id === req.params.id) || SEEDED_CUSTOMERS[0];
    const riskResult = await aiClient.fetchCustomerRisk({
      customer_id: customer.id,
      average_purchase_interval: customer.averagePurchaseInterval,
      days_since_last_purchase: customer.lastPurchaseDaysAgo,
      pending_payment: customer.outstandingBalance,
    });

    return res.json({
      status: "success",
      customer: {
        ...customer,
        risk: riskResult.risk_level || "Medium",
        riskScore: riskResult.risk_score || 55,
        recommendation: riskResult.recommendation || "Send polite WhatsApp payment follow-up",
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  scoreCustomerRisk,
  suggestCustomerFollowUps,
  getCustomersWithAiInsights,
  getCustomerByIdWithAi,
};
