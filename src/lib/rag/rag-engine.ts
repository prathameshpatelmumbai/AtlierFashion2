import { KNOWLEDGE_BASE, KnowledgeDocument } from "./knowledge-base";

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't",
  "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during",
  "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
  "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i",
  "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's",
  "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought",
  "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she",
  "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
  "than", "that", "that's", "the", "their", "theirs", "them", "themselves",
  "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
  "they've", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
  "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would",
  "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
  "yourself", "yourselves"
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

export interface SearchResult {
  document: KnowledgeDocument;
  score: number;
  matchedKeywords: string[];
}

export class RAGEngine {
  private documents: KnowledgeDocument[];
  private idfMap: Map<string, number> = new Map();
  private docVectors: Map<string, Map<string, number>> = new Map();

  constructor(documents: KnowledgeDocument[] = KNOWLEDGE_BASE) {
    this.documents = documents;
    this.computeIDFAndVectors();
  }

  private computeIDFAndVectors() {
    const totalDocs = this.documents.length;
    const docFrequency: Map<string, number> = new Map();

    // Calculate document frequency for each token
    this.documents.forEach((doc) => {
      const tokens = new Set<string>();
      
      tokenize(doc.title).forEach((t) => tokens.add(t));
      tokenize(doc.content).forEach((t) => tokens.add(t));
      doc.keywords.forEach((k) => tokenize(k).forEach((t) => tokens.add(t)));

      tokens.forEach((term) => {
        docFrequency.set(term, (docFrequency.get(term) || 0) + 1);
      });
    });

    // Compute IDF
    docFrequency.forEach((count, term) => {
      this.idfMap.set(term, Math.log((totalDocs + 1) / (count + 0.5)) + 1);
    });

    // Compute TF-IDF vector for each document
    this.documents.forEach((doc) => {
      const termWeights = new Map<string, number>();

      // Keyword terms get 3.0x weight
      doc.keywords.forEach((kw) => {
        tokenize(kw).forEach((t) => {
          const idf = this.idfMap.get(t) || 1;
          termWeights.set(t, (termWeights.get(t) || 0) + 3.0 * idf);
        });
      });

      // Title terms get 2.0x weight
      tokenize(doc.title).forEach((t) => {
        const idf = this.idfMap.get(t) || 1;
        termWeights.set(t, (termWeights.get(t) || 0) + 2.0 * idf);
      });

      // Content terms get standard weight
      tokenize(doc.content).forEach((t) => {
        const idf = this.idfMap.get(t) || 1;
        termWeights.set(t, (termWeights.get(t) || 0) + 1.0 * idf);
      });

      this.docVectors.set(doc.id, termWeights);
    });
  }

  /**
   * Performs semantic similarity and BM25 keyword-augmented retrieval
   */
  public search(query: string, limit = 4, preferredCategory?: string): SearchResult[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) {
      return this.documents.slice(0, limit).map((doc) => ({
        document: doc,
        score: 1.0,
        matchedKeywords: []
      }));
    }

    const results: SearchResult[] = [];

    this.documents.forEach((doc) => {
      const docVector = this.docVectors.get(doc.id);
      if (!docVector) return;

      let score = 0;
      const matchedKeywords: string[] = [];

      queryTokens.forEach((token) => {
        // Direct term match
        if (docVector.has(token)) {
          const weight = docVector.get(token) || 1;
          score += weight;
          matchedKeywords.push(token);
        } else {
          // Partial substring or prefix matching
          for (const [docTerm, weight] of docVector.entries()) {
            if (docTerm.includes(token) || token.includes(docTerm)) {
              score += weight * 0.6;
              matchedKeywords.push(docTerm);
              break;
            }
          }
        }
      });

      // Boost if category matches preferred portal context
      if (preferredCategory && doc.category === preferredCategory) {
        score *= 1.35;
      }

      // Boost for high-relevance intent words
      const lowerQuery = query.toLowerCase();
      if ((lowerQuery.includes("best") || lowerQuery.includes("top") || lowerQuery.includes("recommend")) && doc.category === "rankings") {
        score *= 1.5;
      }
      if ((lowerQuery.includes("trend") || lowerQuery.includes("popular") || lowerQuery.includes("latest")) && doc.category === "trending") {
        score *= 1.5;
      }
      if ((lowerQuery.includes("list") || lowerQuery.includes("how to list") || lowerQuery.includes("publish")) && doc.id === "guide-designer-list-product") {
        score *= 1.8;
      }
      if ((lowerQuery.includes("escrow") || lowerQuery.includes("safe") || lowerQuery.includes("payment")) && doc.id === "faq-escrow-security") {
        score *= 1.8;
      }
      if ((lowerQuery.includes("how to buy") || lowerQuery.includes("order") || lowerQuery.includes("commission")) && doc.category === "customer-guide") {
        score *= 1.4;
      }

      if (score > 0) {
        results.push({
          document: doc,
          score,
          matchedKeywords: Array.from(new Set(matchedKeywords))
        });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
  }

  /**
   * Formats retrieved documents into high-clarity context dossier for the AI prompt
   */
  public formatContextForPrompt(results: SearchResult[]): string {
    if (results.length === 0) return "No specific dossier snippet retrieved.";

    return results
      .map((r, i) => {
        return `[DOCUMENT ${i + 1}] Title: ${r.document.title}\nCategory: ${r.document.category}\nContent:\n${r.document.content}\n`;
      })
      .join("\n---\n");
  }
}

export const ragEngine = new RAGEngine();

