const express = require("express");
const router = express.Router();
const { predictExpenseAlert, getExpenseAlerts } = require("../controllers/expenseAiController");

// @route   GET /api/expenses/alerts
// @desc    Get expense summary, predictive AI alerts, and financial tips
// @access  Public
router.get("/alerts", getExpenseAlerts);

// @route   POST /api/expenses/predict-alerts
// @desc    Calculate predictive alerts for specific expense category
// @access  Public
router.post("/predict-alerts", predictExpenseAlert);

// @route   GET /api/expenses
// @desc    Default expense overview with embedded alerts
// @access  Public
router.get("/", getExpenseAlerts);

module.exports = router;
