const express = require("express");
const router = express.Router();
const {
  scoreCustomerRisk,
  suggestCustomerFollowUps,
  getCustomersWithAiInsights,
  getCustomerByIdWithAi,
} = require("../controllers/customerAiController");

// @route   GET /api/customers
// @desc    Get customers merged with AI risk signals and follow-up flags
// @access  Public
router.get("/", getCustomersWithAiInsights);

// @route   GET /api/customers/insights
// @desc    Get summary customer intelligence stats for AI section
// @access  Public
router.get("/insights", getCustomersWithAiInsights);

// @route   POST /api/customers/risk-score
// @desc    Evaluate risk score for customer metrics
// @access  Public
router.post("/risk-score", scoreCustomerRisk);

// @route   POST /api/customers/follow-up
// @desc    Generate actionable customer follow-up recommendations
// @access  Public
router.post("/follow-up", suggestCustomerFollowUps);

// @route   GET /api/customers/:id
// @desc    Get individual customer details with AI risk assessment
// @access  Public
router.get("/:id", getCustomerByIdWithAi);

module.exports = router;
