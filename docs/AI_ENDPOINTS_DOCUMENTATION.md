# HisabDo AI Backend Integration — Endpoint Documentation

This document describes every AI-related endpoint exposed by the HisabDo MERN backend
(`hisabdo-website-mern`). It maps 1‑to‑1 to the FastAPI/Flask Python microservice in
[`hisabdo-website-ai`](https://github.com/usmankhalid172/hisabdo-website-ai).

The Express server fans out calls to the external AI microservice via
`services/aiClient.js`. If the microservice is offline the client returns a
deterministic **fallback** response so the UI always receives a stable payload.

## Configuration

All connection settings live in `.env`:

| Variable        | Required | Default                      | Purpose                                          |
| --------------- | -------- | ---------------------------- | ------------------------------------------------ |
| `AI_BACKEND_URL`| Yes      | `http://127.0.0.1:5000`      | Base URL of the Python AI microservice           |
| `AI_API_KEY`    | No       | empty                        | Bearer token if the AI backend requires auth     |
| `AI_TIMEOUT_MS` | No       | `5000` (tests: `1000`)       | Per-request timeout in ms                        |
| `GROQ_API_KEY`  | No       | empty                        | Reserved for direct LLM integrations             |

## Endpoints Overview

| #  | Method | Path                                      | Feature                              | Status   |
| -- | ------ | ----------------------------------------- | ------------------------------------ | -------- |
| 1  | GET    | `/api/ai/health`                          | AI microservice health check         | Done     |
| 2  | GET    | `/api/ai/business-health`                 | Business Health Score (UI analytics)  | Done     |
| 3  | GET    | `/api/ai/monthly-insights`                | Monthly Insights                     | Done     |
| 4  | GET    | `/api/ai/overview`                        | Aggregated dashboard payload         | Done     |
| 5  | POST   | `/api/ai/expenses/predict-alerts`         | Expense predictive alert evaluator    | Done     |
| 6  | GET    | `/api/expenses/alerts`                    | Expenses with embedded AI alerts    | Done     |
| 7  | POST   | `/api/ai/customers/risk-score`            | Single customer risk scorer          | Done     |
| 8  | POST   | `/api/ai/customers/follow-up`             | Follow-up suggestion generator      | Done     |
| 9  | GET    | `/api/customers`                          | Customers merged with AI insights    | Done     |
| 10 | GET    | `/api/customers/:id`                      | Single customer w/ AI risk           | Done     |
| 11 | POST   | `/api/ai/assistant/chat`                  | AI Help/FAQ assistant                | Done     |
| 12 | POST   | `/api/ai/faq`                             | FAQ alias route                      | Done     |
| 13 | GET    | `/api/ai/assistant/faqs`                  | FAQ knowledge base listing           | Done     |

---

## 1. AI Health Check

`GET /api/ai/health`

Response (200):
```json
{
  "service": "HisabDo AI Client",
  "aiMicroservice": { "status": "offline", "reason": "..." },
  "timestamp": "2026-09-03T14:00:00.000Z"
}
```

---

## 2. Business Health Score

`GET /api/ai/business-health`

Query params (optional, default sample values):
`sales=150000&expenses=90000&customers=12&pending_payments=4&pending_amount=15000`

Response (200):
```json
{
  "status": "success",
  "source": "remote_ai | fallback",
  "data": {
    "summaryCard": {
      "eyebrow": "AI BUSINESS SUMMARY",
      "headline": "...",
      "text": "...",
      "actions": [{ "label": "...", "target": "..." }]
    },
    "stats": {
      "businessHealth": { "score": 82, "maxScore": 100, "statusText": "Excellent performance" },
      "monthlyProfit": { "amount": 60000, "trend": "positive" },
      "customerActivity": { "score": 84, "displayValue": "84%" },
      "pendingPayments": { "amount": 15000, "count": 4 }
    },
    "recommendations": [
      { "icon": "💡", "title": "...", "text": "...", "action": "View insight" }
    ]
  }
}
```

Schema matches `app/ai/page.js` SummaryCard / StatsGrid / Recommendations.

---

## 3. Monthly Insights

`GET /api/ai/monthly-insights`

Query params: `month=...&income=...&expenses=...`

Response (200):
```json
{
  "status": "success",
  "source": "remote_ai | fallback",
  "data": {
    "eyebrow": "MONTHLY INSIGHTS",
    "title": "August 2026 Business Overview",
    "overview": "...",
    "metrics": {
      "income":    { "raw": 150000, "display": "Rs. 150K", "fullFormatted": "Rs. 150,000" },
      "expenses":  { "raw": 90000,  "display": "Rs. 90K",  "fullFormatted": "Rs. 90,000" },
      "profit":    { "raw": 60000,  "display": "Rs. 60K",  "fullFormatted": "Rs. 60,000" }
    },
    "savingsRate": 40.0,
    "categoryBreakdown": [{ "category": "Inventory", "amount": 58500 }]
  }
}
```

---

## 4. Aggregated AI Overview

`GET /api/ai/overview`

Response (200): single payload combining SummaryCard + Stats + MonthlyInsights +
Recommendations matching the full dashboard rendered by `app/ai/page.js`.

---

## 5. Predictive Expense Alert

`POST /api/ai/expenses/predict-alerts`

Request body:
```json
{
  "category": "Inventory",
  "historical_monthly_spending": [40000, 42000],
  "current_spending": 65000
}
```

Response (200):
```json
{
  "status": "success",
  "source": "remote_ai | fallback",
  "data": {
    "category": "Inventory",
    "currentSpending": 65000,
    "historicalAverage": 41000,
    "percentageChange": 58.5,
    "alert": {
      "type": "high",
      "icon": "⚠️",
      "title": "High expense detected in Inventory",
      "text": "..."
    }
  }
}
```

Validation:
- `category` must be a non-empty string.
- `historical_monthly_spending` must be an array of length ≥ 2.
- `current_spending` must be numeric.

---

## 6. Expenses (with embedded AI alerts)

`GET /api/expenses/alerts`

Response (200):
```json
{
  "status": "success",
  "summary": {
    "totalExpenses": 90000,
    "budget": 95000,
    "projectedMonthEnd": 104000,
    "status": "warning",
    "currency": "PKR",
    "categories": [
      { "name": "Inventory", "current": 58500, "average": 48000, "status": "high" }
    ]
  },
  "alerts": [
    { "id": "alert-1", "type": "high", "icon": "⚠️", "title": "...", "text": "...", "category": "Inventory" }
  ],
  "tips": ["..."],
  "meta": { "totalAlerts": 3, "highPriorityCount": 1, "lastEvaluated": "..." }
}
```

---

## 7. Customer Risk Score

`POST /api/ai/customers/risk-score`

Request body:
```json
{
  "customer_id": "cust-1",
  "average_purchase_interval": 10,
  "days_since_last_purchase": 35,
  "pending_payment": 12000
}
```

Response (200):
```json
{
  "status": "success",
  "source": "remote_ai | fallback",
  "data": {
    "customerId": "cust-1",
    "riskLevel": "High",
    "riskScore": 85,
    "delayRatio": 3.5,
    "pendingPayment": 12000,
    "daysSinceLastPurchase": 35,
    "recommendation": "Send WhatsApp PDF payment statement immediately."
  }
}
```

---

## 8. Customer Follow-up

`POST /api/ai/customers/follow-up`

Request body — array of transactions OR `{ "transactions": [...] }`:
```json
[
  { "customer_id": "cust-1", "purchase_date": "2026-07-20", "amount": 9500 }
]
```

Response (200):
```json
{
  "status": "success",
  "source": "remote_ai | fallback",
  "data": {
    "followUpCount": 1,
    "suggestions": [
      { "customer_id": "cust-1", "action": "...", "priority": "High" }
    ]
  }
}
```

---

## 9. Customer List (merged AI insights)

`GET /api/customers`

Response (200):
```json
{
  "status": "success",
  "summary": { "needFollowUp": 3, "activeCustomers": 12, "activityScore": 84 },
  "customers": [
    {
      "id": "cust-1",
      "name": "Malik Store",
      "initials": "MS",
      "lastPurchaseDaysAgo": 35,
      "outstandingBalance": 12500,
      "formattedBalance": "Rs. 12,500",
      "riskBadge": "High",
      "riskScore": 85,
      "followUpRequired": true,
      "recommendedAction": "..."
    }
  ]
}
```

---

## 10. Single Customer with AI Risk

`GET /api/customers/:id`

Response (200):
```json
{
  "status": "success",
  "customer": {
    "id": "cust-1",
    "name": "Malik Store",
    "risk": "High",
    "riskScore": 85,
    "recommendation": "..."
  }
}
```

---

## 11. AI Help / FAQ Assistant

`POST /api/ai/assistant/chat`

Request body:
```json
{ "query": "How do I export PDF reports?" }
```

Response (200):
```json
{
  "status": "success",
  "source": "remote_ai | fallback",
  "data": {
    "query": "How do I export PDF reports?",
    "reply": "HisabDo lets you generate professional PDF account statements...",
    "matchedQuestion": "How do I export PDF reports and share on WhatsApp?",
    "category": "Features",
    "confidence": 0.92,
    "sources": ["HisabDo Help & FAQ Center"],
    "timestamp": "2026-09-03T..."
  }
}
```

---

## 12. FAQ Alias

`POST /api/ai/faq` — identical contract to `/api/ai/assistant/chat`.

---

## 13. List FAQs

`GET /api/ai/assistant/faqs`

Response (200):
```json
{
  "status": "success",
  "count": 9,
  "faqs": [
    { "id": 1, "question": "...", "category": "General", "answer": "..." }
  ]
}
```

---

## Fallback Behaviour

Every endpoint falls back to a deterministic local calculation if the AI backend is
offline, times out, or returns a non-success status. The response includes a
`source` field (`remote_ai` or `fallback`) so the frontend can show a small
banner. A 5-second cache prevents repeated connection attempts when the backend
is unavailable.

## Pandas int64 Mitigation

All numeric payloads are converted to floats in `sanitizePayloadForPandas()`
before being sent to the AI backend to avoid the known Pandas int64 JSON
serialization bug in the Python service.