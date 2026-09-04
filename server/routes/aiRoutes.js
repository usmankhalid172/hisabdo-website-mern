const express = require("express");
const router = express.Router();

// 1. Business Health Endpoint
router.get("/business-health", (req, res) => {
    res.json({
        score: 85,
        status: "Good",
        message: "Your business is performing well with healthy cash flow."
    });
});

// 2. Monthly Insights Endpoint
router.get("/monthly-insights", (req, res) => {
    res.json({
        month: "August 2026",
        summary: "Your latest financial activity shows a positive trend.",
        income: "150,000",
        expenses: "90,000",
        profit: "60,000"
    });
});

// 3. Smart Alerts Endpoint
router.get("/alerts", (req, res) => {
    res.json([
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
    ]);
});

// 4. AI Recommendations Endpoint
router.get("/recommendations", (req, res) => {
    res.json([
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
    ]);
});

// 5. Financial Goals Endpoint
router.get("/goals", (req, res) => {
    res.json({
        title: "New Shop",
        saved: "200,000",
        target: "500,000",
        percentage: 40,
        remaining: "300,000",
        status: "On track"
    });
});

// 6. Customer Insights Endpoint
router.get("/customers", (req, res) => {
    res.json({
        followUpCount: 3,
        activeCount: 12,
        activityScore: "84%",
        list: [
            { id: 1, initials: "AT", name: "Ahmed Traders", desc: "Last purchase 28 days ago", badge: "Medium" },
            { id: 2, initials: "MS", name: "Malik Store", desc: "Follow-up recommended", badge: "High" }
        ]
    });
});

module.exports = router;