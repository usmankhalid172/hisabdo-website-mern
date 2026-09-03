const express = require("express");
const router = express.Router();

const {
  getBusinessHealth,
  getMonthlyInsights,
  getAiOverview,
  getAiHealth,
} = require("../controllers/aiController");

const { predictExpenseAlert } = require("../controllers/expenseAiController");
const { scoreCustomerRisk, suggestCustomerFollowUps } = require("../controllers/customerAiController");
const { chatWithAssistant, getFaqList } = require("../controllers/assistantController");

// ============================================================================
// AI Health & System Status
// ============================================================================

// @route   GET /api/ai/health
// @desc    Check status of AI client and external microservice connection
// @access  Public
router.get("/health", getAiHealth);

// @route   GET /api/ai/overview
// @desc    Aggregated AI Dashboard overview matching app/ai/page.js
// @access  Public
router.get("/overview", getAiOverview);

// ============================================================================
// Business Health & Analytics
// ============================================================================

// @route   GET /api/ai/business-health
// @desc    Fetch business health score (0-100) and performance rating
// @access  Public
router.get("/business-health", getBusinessHealth);

// @route   GET /api/ai/monthly-insights
// @desc    Fetch monthly business overview and recommendations
// @access  Public
router.get("/monthly-insights", getMonthlyInsights);

// ============================================================================
// Predictive Expense Alerts
// ============================================================================

// @route   POST /api/ai/expenses/predict-alerts
// @desc    Evaluate predictive alerts for expense category spending
// @access  Public
router.post("/expenses/predict-alerts", predictExpenseAlert);

// ============================================================================
// Customer Risk & Follow-Up
// ============================================================================

// @route   POST /api/ai/customers/risk-score
// @desc    Evaluate risk score and rating for customer
// @access  Public
router.post("/customers/risk-score", scoreCustomerRisk);

// @route   POST /api/ai/customers/follow-up
// @desc    Generate customer follow-up recommendations
// @access  Public
router.post("/customers/follow-up", suggestCustomerFollowUps);

// ============================================================================
// AI Assistant & Help FAQ
// ============================================================================

// @route   POST /api/ai/assistant/chat
// @desc    Query conversational AI help and FAQ assistant
// @access  Public
router.post("/assistant/chat", chatWithAssistant);

// @route   POST /api/ai/faq
// @desc    Alias route for FAQ query
// @access  Public
router.post("/faq", chatWithAssistant);

// @route   GET /api/ai/assistant/faqs
// @desc    List popular HisabDo FAQs
// @access  Public
router.get("/assistant/faqs", getFaqList);

module.exports = router;
