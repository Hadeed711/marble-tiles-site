// Tiny client-side retriever (RAG-style, no server, no cost).
// Tokenizes the question and scores each knowledge-base doc by keyword
// overlap; returns the best doc if it clears the confidence threshold.

import knowledgeBase from "./knowledgeBase";

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "am", "was", "were", "do", "does", "did",
  "i", "you", "we", "they", "he", "she", "it", "my", "your", "our", "me",
  "of", "in", "on", "at", "to", "for", "from", "with", "and", "or", "but",
  "can", "could", "will", "would", "should", "have", "has", "had", "what",
  "which", "how", "please", "tell", "about", "any", "some", "there", "hai",
  "ka", "ki", "ke", "mein", "ho", "kya",
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

export function retrieve(question) {
  const tokens = tokenize(question);
  if (tokens.length === 0) return null;

  let best = null;
  let bestScore = 0;

  for (const doc of knowledgeBase) {
    let score = 0;
    for (const token of tokens) {
      for (const keyword of doc.keywords) {
        if (keyword === token) {
          score += 3; // exact keyword match
        } else if (keyword.includes(" ") && question.toLowerCase().includes(keyword)) {
          score += 4; // multi-word phrase match
        } else if (keyword.startsWith(token) || token.startsWith(keyword)) {
          if (Math.min(keyword.length, token.length) >= 4) score += 1.5; // prefix match (plurals etc.)
        }
      }
      if (doc.answer.toLowerCase().includes(token)) score += 0.5;
    }
    if (score > bestScore) {
      bestScore = score;
      best = doc;
    }
  }

  // Threshold: require at least one solid keyword match
  if (bestScore < 3) return null;
  return { doc: best, score: bestScore };
}

// Detect explicit "contact a human" intents typed by the user
export function detectIntent(question) {
  const q = question.toLowerCase();
  if (/\b(whats\s?app|wapp|wa)\b/.test(q) && /\b(send|msg|message|bhej|contact|karo)\b/.test(q))
    return "whatsapp";
  if (/\bwhatsapp\b/.test(q)) return "whatsapp";
  if (/\b(send|write|bhej)\b/.test(q) && /\b(email|mail|e-mail)\b/.test(q)) return "email";
  if (/\b(email|mail)\b/.test(q) && /\b(owner|karo|send)\b/.test(q)) return "email";
  if (/\b(human|person|agent|owner|talk|speak|baat)\b/.test(q) && /\b(talk|speak|contact|connect|baat)\b/.test(q))
    return "human";
  return null;
}
