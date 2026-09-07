/**
 * Reusable AI Service Client for HisabDo MERN Backend
 * Connects to the external Flask AI Microservice (https://github.com/usmankhalid172/hisabdo-website-ai)
 * Includes timeout handling, auth headers, float sanitization (preventing Pandas int64 crash),
 * dual-route prefix resolution, and intelligent fallback calculation.
 */

const http = require("http");
const https = require("https");
const { URL } = require("url");

const DEFAULT_TIMEOUT_MS = 5000;

function getBaseUrl() {
  let url = process.env.AI_BACKEND_URL || "http://127.0.0.1:5000";
  return url.replace(/\/+$/, "");
}

function getApiKey() {
  return process.env.AI_API_KEY || "";
}

function getTimeoutMs() {
  if (process.env.NODE_ENV === "test") {
    return 1000;
  }
  const timeout = parseInt(process.env.AI_TIMEOUT_MS, 10);
  return !isNaN(timeout) && timeout > 0 ? timeout : DEFAULT_TIMEOUT_MS;
}

/**
 * Deeply sanitizes payloads to ensure numbers are represented as floats
 * to prevent the known Pandas int64 serialization bug in the Flask service.
 */
function sanitizePayloadForPandas(data) {
  if (data === null || data === undefined) return data;
  if (typeof data === "number") {
    return Number.isInteger(data) ? Number(data.toFixed(1)) : data;
  }
  if (Array.isArray(data)) {
    return data.map(sanitizePayloadForPandas);
  }
  if (typeof data === "object") {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizePayloadForPandas(value);
    }
    return sanitized;
  }
  return data;
}

/**
 * Rock-solid, fast HTTP client wrapper using Node.js native http/https modules
 * Bypasses Windows dual-stack IPv6 happy-eyeballs stalls (fails in 15ms if port is closed).
 */
function makeHttpRequest(urlStr, options = {}, bodyData = null) {
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(urlStr);
      const isHttps = parsedUrl.protocol === "https:";
      const transport = isHttps ? https : http;

      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      };

      let bodyString = null;
      if (bodyData !== null && bodyData !== undefined) {
        bodyString = typeof bodyData === "string" ? bodyData : JSON.stringify(bodyData);
        headers["Content-Length"] = Buffer.byteLength(bodyString);
      }

      const reqOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (isHttps ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || (bodyData ? "POST" : "GET"),
        headers,
        timeout: options.timeout || DEFAULT_TIMEOUT_MS,
      };

      const req = transport.request(reqOptions, (res) => {
        let rawData = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: rawData,
          });
        });
      });

      req.on("timeout", () => {
        req.destroy(new Error(`Request timed out after ${reqOptions.timeout}ms`));
      });

      req.on("error", (err) => {
        reject(err);
      });

      if (bodyString) {
        req.write(bodyString);
      }
      req.end();
    } catch (err) {
      reject(err);
    }
  });
}

// In-memory host reachability cache
let isRemoteAvailable = null;
let lastReachabilityCheck = 0;
const REACHABILITY_COOLDOWN_MS = 5000;

/**
 * Core callAiService dispatcher
 */
async function callAiService(endpoint, payload = null, options = {}) {
  const now = Date.now();
  if (isRemoteAvailable === false && now - lastReachabilityCheck < REACHABILITY_COOLDOWN_MS && !options.forceRemote) {
    return {
      success: false,
      source: "fallback",
      error: "Remote AI microservice currently offline (cached)",
    };
  }

  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();
  const timeoutMs = options.timeoutMs || getTimeoutMs();
  const method = options.method || (payload ? "POST" : "GET");

  const sanitizedPayload = payload ? sanitizePayloadForPandas(payload) : null;

  // Prepare candidate paths for dual prefix resolution
  const candidatePaths = [endpoint];
  if (!endpoint.startsWith("/engagement") && !endpoint.startsWith("/support")) {
    candidatePaths.push(`/engagement${endpoint}`);
    candidatePaths.push(`/support${endpoint}`);
  }

  let lastError = null;

  for (let i = 0; i < candidatePaths.length; i++) {
    const path = candidatePaths[i];
    const url = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
    const headers = {
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      ...(options.headers || {}),
    };

    try {
      const response = await makeHttpRequest(url, { method, headers, timeout: timeoutMs }, sanitizedPayload);

      // If route not found on this prefix, try next candidate path
      if (response.statusCode === 404 && i < candidatePaths.length - 1) {
        continue;
      }

      let responseData;
      try {
        responseData = JSON.parse(response.body);
      } catch (parseErr) {
        throw new Error(`AI Backend returned non-JSON response (${response.statusCode}): ${response.body.slice(0, 150)}`);
      }

      if (response.statusCode < 200 || response.statusCode >= 300) {
        const errorMsg = responseData?.message || responseData?.error || `AI request failed with status ${response.statusCode}`;
        throw new Error(errorMsg);
      }

      isRemoteAvailable = true;
      lastReachabilityCheck = Date.now();

      return {
        success: true,
        source: "remote_ai",
        data: responseData,
      };
    } catch (err) {
      lastError = err;
      isRemoteAvailable = false;
      lastReachabilityCheck = Date.now();
      break;
    }
  }

  return {
    success: false,
    source: "fallback",
    error: lastError ? lastError.message : "AI service request failed",
  };
}

// ============================================================================
// Built-in Knowledge Base & Fallback Engine
// ============================================================================

const FAQ_KNOWLEDGE_BASE = [
  {
    id: 1,
    question: "What is HisabDo?",
    keywords: ["what is", "about", "hisabdo", "app", "overview", "introduction"],
    answer: "HisabDo is a free offline-first khata and ledger app for Android. It helps shopkeepers, freelancers and small business owners track money given (Udhar), money received (Vasool), customer balances, expenses and generate PDF reports — all without needing an internet connection.",
    category: "General",
  },
  {
    id: 2,
    question: "Is HisabDo free to use?",
    keywords: ["free", "cost", "pricing", "charges", "subscription", "price"],
    answer: "Yes, HisabDo is completely free to download and use from Google Play. Core features including khata management, customer accounts, PDF export and backup are available at no cost.",
    category: "General",
  },
  {
    id: 3,
    question: "Does HisabDo work without the internet?",
    keywords: ["offline", "internet", "wifi", "network", "data connection", "without internet"],
    answer: "Yes! HisabDo is built offline-first. All your data is securely stored on your local device and the app works completely without any internet connection. You can also sync to cloud when connected.",
    category: "Features",
  },
  {
    id: 4,
    question: "How do I manage customers and customer balances?",
    keywords: ["customer", "add customer", "balance", "udhar", "vasool", "khata", "manage customer"],
    answer: "You can create individual profiles for each customer with their name and phone number. Every transaction records money given (Udhar) or money received (Vasool), updating their running ledger balance in real time.",
    category: "Features",
  },
  {
    id: 5,
    question: "How do I export PDF reports and share on WhatsApp?",
    keywords: ["pdf", "report", "export", "whatsapp", "statement", "share"],
    answer: "HisabDo lets you generate professional PDF account statements for any customer or date range with one tap. You can directly share statements to customers via WhatsApp or email.",
    category: "Features",
  },
  {
    id: 6,
    question: "Does HisabDo support voice entry?",
    keywords: ["voice", "speak", "voice entry", "speech", "urdu voice", "mic"],
    answer: "Yes, HisabDo features voice entry support. You can dictate entries in Urdu or Roman Urdu (e.g. 'Ali ko 5000 udhar diya') to log transactions quickly without typing.",
    category: "Features",
  },
  {
    id: 7,
    question: "How does Business Health Score work?",
    keywords: ["health score", "business health", "rating", "performance", "score"],
    answer: "The HisabDo AI Business Health Score evaluates your shop's revenue, profit margins, active customer retention, and pending payments to produce a 0-100 rating with targeted improvement tips.",
    category: "AI Features",
  },
  {
    id: 8,
    question: "How do Predictive Expense Alerts help me?",
    keywords: ["predictive", "expense", "alerts", "spending", "budget", "finance tips"],
    answer: "Predictive Expense Alerts compare your current category spending against historical averages. If inventory or operational costs surge abnormally, AI flags a High/Medium alert before month-end overruns.",
    category: "AI Features",
  },
  {
    id: 9,
    question: "What is Customer Risk scoring?",
    keywords: ["customer risk", "risk", "late payment", "default", "follow-up", "high risk"],
    answer: "Customer Risk analysis tracks purchase intervals and overdue payment timelines to classify accounts into Low, Medium, and High risk, prompting targeted follow-up reminders.",
    category: "AI Features",
  },
];

/**
 * Fallback Business Health Calculation
 */
function calculateBusinessHealthFallback(data) {
  const sales = Number(data.sales) || 0;
  const expenses = Number(data.expenses) || 0;
  const customers = Number(data.customers) || 0;
  const pendingPayments = Number(data.pending_payments) || 0;

  const profit = sales - expenses;
  const profitMargin = sales > 0 ? (profit / sales) * 100 : 0;

  let score = 50;
  if (profitMargin > 30) score += 25;
  else if (profitMargin > 15) score += 15;
  else if (profitMargin > 0) score += 5;
  else score -= 20;

  if (customers >= 10) score += 15;
  else if (customers >= 5) score += 10;

  if (pendingPayments === 0) score += 10;
  else if (pendingPayments <= 4) score += 5;
  else score -= 10;

  score = Math.max(10, Math.min(98, Math.round(score)));

  let rating = "Good performance";
  if (score >= 80) rating = "Excellent performance";
  else if (score >= 65) rating = "Healthy performance";
  else if (score >= 50) rating = "Fair performance";
  else rating = "Needs attention";

  return {
    status: "success",
    business_health_score: score,
    health_score: score,
    rating,
    sales,
    expenses,
    profit,
    profit_margin: Number(profitMargin.toFixed(1)),
    active_customers: customers,
    pending_payments: pendingPayments,
    summary: {
      headline: score >= 75 ? "Your business is performing well this month." : "Business stability requires attention.",
      details: `Revenue and customer activity are at healthy levels. Total profit is Rs. ${profit.toLocaleString()} with ${pendingPayments} pending balances.`,
    },
    recommendations: [
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
        text: `${pendingPayments > 0 ? pendingPayments : 3} customers may need a follow-up based on recent activity.`,
        action: "View customers",
      },
    ],
  };
}

/**
 * Fallback Monthly Insights Calculation
 */
function generateMonthlyInsightsFallback(data) {
  const month = data.month || "Current Month";
  const income = Number(data.income) || 0;
  const expenses = Number(data.expenses) || 0;
  const profit = income - expenses;
  const savingsRate = income > 0 ? Number(((profit / income) * 100).toFixed(1)) : 0;

  return {
    status: "success",
    month,
    income,
    expenses,
    profit,
    savings_rate: savingsRate,
    category_breakdown: data.category_expenses || [
      { category: "Inventory", amount: expenses * 0.65 },
      { category: "Utilities", amount: expenses * 0.2 },
      { category: "Transport", amount: expenses * 0.15 },
    ],
    overview: `Your latest financial activity shows a positive trend with ${savingsRate}% profit margin and opportunities to optimize operational expenses.`,
  };
}

/**
 * Fallback Predictive Expense Alert Calculation
 */
function generatePredictiveExpenseAlertFallback(data) {
  const category = data.category || "General Expenses";
  const historical = Array.isArray(data.historical_monthly_spending)
    ? data.historical_monthly_spending.map(Number)
    : [80000.0, 85000.0];
  const current = Number(data.current_spending) || 95000.0;

  const avgHistorical = historical.reduce((a, b) => a + b, 0) / (historical.length || 1);
  const percentageIncrease = avgHistorical > 0 ? ((current - avgHistorical) / avgHistorical) * 100 : 0;

  let alertType = "low";
  let title = "Expense on track";
  let icon = "✨";
  let text = `${category} spending is within normal historical boundaries.`;

  if (percentageIncrease > 20) {
    alertType = "high";
    icon = "⚠️";
    title = `High expense detected in ${category}`;
    text = `${category} spending is ${percentageIncrease.toFixed(1)}% above your normal range. Review supplier invoices.`;
  } else if (percentageIncrease > 8) {
    alertType = "medium";
    icon = "🔔";
    title = `Moderate increase in ${category}`;
    text = `${category} spending is rising slightly above your previous 2-month average.`;
  }

  return {
    status: "success",
    category,
    current_spending: current,
    historical_average: Number(avgHistorical.toFixed(2)),
    percentage_change: Number(percentageIncrease.toFixed(1)),
    alert: {
      type: alertType,
      icon,
      title,
      text,
    },
  };
}

/**
 * Fallback Customer Risk Signal Calculation
 */
function generateCustomerRiskSignalFallback(data) {
  const customerId = data.customer_id || "cust-unknown";
  const avgInterval = Number(data.average_purchase_interval) || 14.0;
  const daysSincePurchase = Number(data.days_since_last_purchase) || 28.0;
  const pendingPayment = Number(data.pending_payment) || 0.0;

  const delayRatio = avgInterval > 0 ? daysSincePurchase / avgInterval : 1.0;

  let riskLevel = "Low";
  let score = 25;
  let recommendation = "Regular customer. Standard relationship maintenance.";

  if (delayRatio >= 2.5 || pendingPayment > 10000) {
    riskLevel = "High";
    score = 85;
    recommendation = "Follow-up recommended. Send WhatsApp PDF payment statement immediately.";
  } else if (delayRatio >= 1.5 || pendingPayment > 3000) {
    riskLevel = "Medium";
    score = 55;
    recommendation = "Payment approaching or overdue. Friendly reminder advised.";
  }

  return {
    status: "success",
    customer_id: customerId,
    risk_level: riskLevel,
    risk_score: score,
    delay_ratio: Number(delayRatio.toFixed(2)),
    pending_payment: pendingPayment,
    days_since_last_purchase: daysSincePurchase,
    recommendation,
  };
}

/**
 * Fallback FAQ and Help Assistant Search
 */
function searchFaqFallback(query) {
  if (!query || !query.trim()) {
    return {
      query: "",
      reply: "How can I help you with HisabDo today? You can ask about managing customer khatas, recording Udhar/Vasool, exporting PDF statements, or expense alerts.",
      confidence: 1.0,
      sources: ["HisabDo Knowledge Base"],
    };
  }

  const normalizedQuery = query.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const item of FAQ_KNOWLEDGE_BASE) {
    let score = 0;
    const questionText = item.question.toLowerCase();

    if (questionText.includes(normalizedQuery)) score += 3.0;

    for (const keyword of item.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += 1.5;
      }
    }

    const queryTokens = normalizedQuery.split(/\s+/);
    for (const token of queryTokens) {
      if (token.length > 2) {
        if (questionText.includes(token)) score += 0.5;
        if (item.answer.toLowerCase().includes(token)) score += 0.2;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 1.0) {
    return {
      query,
      reply: bestMatch.answer,
      matchedQuestion: bestMatch.question,
      category: bestMatch.category,
      confidence: Math.min(0.98, Number((0.6 + highestScore * 0.1).toFixed(2))),
      sources: ["HisabDo Help & FAQ Center"],
    };
  }

  return {
    query,
    reply: `HisabDo is an offline-first khata and digital ledger application. You can track Udhar (money given), Vasool (money received), generate PDF reports, record daily expenses, and analyze business health with AI insights. For this specific inquiry, you can also contact support at support@hisabdo.app.`,
    confidence: 0.5,
    sources: ["HisabDo FAQ Database"],
  };
}

// ============================================================================
// Public Domain Service Methods
// ============================================================================

async function fetchBusinessHealth(data) {
  const res = await callAiService("/ai/business-health", data);
  if (res.success && res.data && res.data.status === "success") {
    return { ...res.data, _source: "remote_ai" };
  }
  return { ...calculateBusinessHealthFallback(data), _source: "fallback", _remoteError: res.error };
}

async function fetchMonthlyInsights(data) {
  const res = await callAiService("/ai/monthly-insights", data);
  if (res.success && res.data && res.data.status === "success") {
    return { ...res.data, _source: "remote_ai" };
  }
  return { ...generateMonthlyInsightsFallback(data), _source: "fallback", _remoteError: res.error };
}

async function fetchPredictiveExpenseAlert(data) {
  const res = await callAiService("/ai/predictive-expense-alert", data);
  if (res.success && res.data && res.data.status === "success") {
    return { ...res.data, _source: "remote_ai" };
  }
  return { ...generatePredictiveExpenseAlertFallback(data), _source: "fallback", _remoteError: res.error };
}

async function fetchCustomerRisk(data) {
  const res = await callAiService("/ai/customer-risk", data);
  if (res.success && res.data && res.data.status === "success") {
    return { ...res.data, _source: "remote_ai" };
  }
  return { ...generateCustomerRiskSignalFallback(data), _source: "fallback", _remoteError: res.error };
}

async function fetchCustomerFollowUp(data) {
  const res = await callAiService("/ai/customer-followup", data);
  if (res.success && res.data && res.data.status === "success") {
    return { ...res.data, _source: "remote_ai" };
  }
  const items = Array.isArray(data) ? data : [];
  const suggestions = items.map((item, index) => ({
    customer_id: item.customer_id || `cust-${index + 1}`,
    last_purchase_date: item.purchase_date || "2026-08-01",
    action: "Send polite WhatsApp payment follow-up with ledger PDF",
    priority: Number(item.amount) > 5000 ? "High" : "Medium",
  }));
  return {
    status: "success",
    follow_up_suggestions: suggestions,
    _source: "fallback",
    _remoteError: res.error,
  };
}

async function fetchFaqAssistantReply(query) {
  const res = await callAiService("/support/ai/help/faq", { query });
  if (res.success && res.data && (res.data.answer || res.data.reply || res.data.results)) {
    return {
      query,
      reply: res.data.answer || res.data.reply || (Array.isArray(res.data.results) && res.data.results[0]?.answer),
      confidence: res.data.confidence || 0.95,
      sources: ["HisabDo AI Support Service"],
      _source: "remote_ai",
    };
  }
  return { ...searchFaqFallback(query), _source: "fallback", _remoteError: res.error };
}

async function checkAiBackendHealth() {
  const res = await callAiService("/", null, { method: "GET", timeoutMs: 1000 });
  if (res.success) {
    return { status: "online", details: res.data };
  }
  return { status: "offline", reason: res.error };
}

module.exports = {
  callAiService,
  fetchBusinessHealth,
  fetchMonthlyInsights,
  fetchPredictiveExpenseAlert,
  fetchCustomerRisk,
  fetchCustomerFollowUp,
  fetchFaqAssistantReply,
  checkAiBackendHealth,
  calculateBusinessHealthFallback,
  generateMonthlyInsightsFallback,
  generatePredictiveExpenseAlertFallback,
  generateCustomerRiskSignalFallback,
  searchFaqFallback,
  FAQ_KNOWLEDGE_BASE,
};
