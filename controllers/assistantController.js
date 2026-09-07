/**
 * AI Assistant Controller
 * Conversational Help & FAQ assistant for HisabDo.
 * Connects to AI microservice FAQ search and HisabDo 30+ FAQ knowledge base.
 */

const aiClient = require("../services/aiClient");

/**
 * POST /api/ai/assistant/chat
 * Primary query -> response endpoint for AI help and FAQs
 */
async function chatWithAssistant(req, res, next) {
  try {
    const { query, history } = req.body || {};

    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Query text is required." });
    }

    const trimmedQuery = query.trim();

    // Query external AI service or fallback knowledge base
    const assistantResult = await aiClient.fetchFaqAssistantReply(trimmedQuery);

    return res.json({
      status: "success",
      source: assistantResult._source,
      data: {
        query: trimmedQuery,
        reply: assistantResult.reply,
        matchedQuestion: assistantResult.matchedQuestion || null,
        category: assistantResult.category || "HisabDo Help Center",
        confidence: assistantResult.confidence || 0.9,
        sources: assistantResult.sources || ["HisabDo Knowledge Base"],
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/ai/assistant/faqs
 * Returns list of popular HisabDo FAQs for quick suggestions in UI
 */
async function getFaqList(req, res, next) {
  try {
    return res.json({
      status: "success",
      count: aiClient.FAQ_KNOWLEDGE_BASE.length,
      faqs: aiClient.FAQ_KNOWLEDGE_BASE.map((f) => ({
        id: f.id,
        question: f.question,
        category: f.category,
        answer: f.answer,
      })),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  chatWithAssistant,
  getFaqList,
};
