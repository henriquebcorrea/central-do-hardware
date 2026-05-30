import { type NextRequest } from "next/server";
import { products } from "@/data/products";

// ===== TF-IDF SEMANTIC SEARCH ENGINE =====
// Implementação completa de busca semântica usando TF-IDF
// (Term Frequency - Inverse Document Frequency) em JavaScript puro.
// Não depende de APIs externas.

// Stopwords em português brasileiro
const STOPWORDS = new Set([
  "a", "o", "e", "de", "do", "da", "dos", "das", "em", "no", "na", "nos", "nas",
  "um", "uma", "uns", "umas", "por", "para", "com", "sem", "sob", "sobre",
  "que", "se", "como", "mais", "mas", "ou", "ao", "aos", "à", "às",
  "seu", "sua", "seus", "suas", "meu", "minha", "meus", "minhas",
  "este", "esta", "estes", "estas", "esse", "essa", "esses", "essas",
  "aquele", "aquela", "aqueles", "aquelas", "isto", "isso", "aquilo",
  "ele", "ela", "eles", "elas", "nós", "vós", "eu", "tu", "você", "vocês",
  "me", "te", "nos", "vos", "lhe", "lhes",
  "não", "sim", "já", "ainda", "muito", "pouco", "bem", "mal",
  "até", "entre", "após", "antes", "durante", "desde",
  "ser", "estar", "ter", "haver", "ir", "vir", "fazer", "poder",
  "foi", "era", "será", "são", "foram", "é",
  "tem", "tinha", "terá", "têm",
  "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "can", "shall",
  "and", "or", "but", "if", "of", "at", "by", "for", "with",
  "in", "on", "to", "from", "up", "out", "off", "into"
]);

// Sinônimos e expansões para melhorar a busca semântica
const SYNONYMS: Record<string, string[]> = {
  "presente": ["gift", "presente", "presentes", "aniversario", "aniversário", "natal", "dia"],
  "aniversario": ["presente", "aniversário", "presentes", "gift"],
  "aniversário": ["presente", "aniversario", "presentes", "gift"],
  "gamer": ["gaming", "jogo", "jogar", "jogos", "game", "games"],
  "gaming": ["gamer", "jogo", "jogar", "jogos", "game", "games"],
  "jogo": ["jogos", "jogar", "gaming", "gamer", "game"],
  "rapido": ["rápido", "velocidade", "veloz", "desempenho", "performance", "rapida"],
  "rápido": ["rapido", "velocidade", "veloz", "desempenho", "performance"],
  "lento": ["travando", "devagar", "lentidão", "demora"],
  "travando": ["lento", "travado", "lag", "freeze"],
  "fps": ["frame", "frames", "desempenho", "performance", "gpu", "placa"],
  "upgrade": ["melhorar", "trocar", "atualizar", "melhoramento"],
  "melhorar": ["upgrade", "trocar", "atualizar", "melhoramento"],
  "barato": ["econômico", "economico", "custo", "benefício", "beneficio", "acessível", "acessivel"],
  "armazenamento": ["storage", "disco", "hd", "ssd", "guardar", "salvar"],
  "memoria": ["ram", "memória", "ddr4", "ddr5"],
  "memória": ["ram", "memoria", "ddr4", "ddr5"],
  "placa": ["gpu", "video", "vídeo", "gráfica", "grafica"],
  "video": ["vídeo", "gpu", "placa", "gráfica", "grafica"],
  "monitor": ["tela", "display", "screen"],
  "tela": ["monitor", "display", "screen"],
  "teclado": ["keyboard", "digitar", "digitação"],
  "mouse": ["rato", "clique", "clicar"],
  "setup": ["montar", "configuração", "configuracao", "pc", "computador"],
  "montar": ["setup", "construir", "build", "montagem"],
  "pc": ["computador", "desktop", "máquina", "maquina"],
  "computador": ["pc", "desktop", "máquina", "maquina"],
  "refrigeracao": ["refrigeração", "resfriar", "esfriar", "cooler", "ventilador", "fan"],
  "cooler": ["refrigeração", "refrigeracao", "resfriar", "ventilador", "fan"],
  "fonte": ["psu", "alimentação", "alimentacao", "energia", "power"],
  "gabinete": ["case", "caixa", "torre", "tower"],
};

/**
 * Tokeniza um texto: normaliza, remove acentos, divide em palavras e filtra stopwords
 */
function tokenize(text: string): string[] {
  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s]/g, " ") // remove special chars
    .trim();

  return normalized
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
}

/**
 * Expande uma query com sinônimos para melhorar recall
 */
function expandQuery(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    const syns = SYNONYMS[token];
    if (syns) {
      for (const syn of syns) {
        expanded.add(syn.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      }
    }
  }
  return Array.from(expanded);
}

/**
 * Calcula Term Frequency (TF) para um documento
 */
function computeTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  // Normalize by max frequency
  const maxFreq = Math.max(...tf.values());
  for (const [term, freq] of tf) {
    tf.set(term, freq / maxFreq);
  }
  return tf;
}

/**
 * Calcula Inverse Document Frequency (IDF) para todos os termos
 */
function computeIDF(documents: string[][]): Map<string, number> {
  const idf = new Map<string, number>();
  const N = documents.length;

  for (const doc of documents) {
    const uniqueTerms = new Set(doc);
    for (const term of uniqueTerms) {
      idf.set(term, (idf.get(term) || 0) + 1);
    }
  }

  for (const [term, df] of idf) {
    idf.set(term, Math.log(1 + N / df));
  }

  return idf;
}

/**
 * Calcula a similaridade de cosseno entre dois vetores TF-IDF
 */
function cosineSimilarity(
  queryTFIDF: Map<string, number>,
  docTFIDF: Map<string, number>
): number {
  let dotProduct = 0;
  let queryMag = 0;
  let docMag = 0;

  for (const [term, qWeight] of queryTFIDF) {
    const dWeight = docTFIDF.get(term) || 0;
    dotProduct += qWeight * dWeight;
    queryMag += qWeight * qWeight;
  }

  for (const [, dWeight] of docTFIDF) {
    docMag += dWeight * dWeight;
  }

  queryMag = Math.sqrt(queryMag);
  docMag = Math.sqrt(docMag);

  if (queryMag === 0 || docMag === 0) return 0;
  return dotProduct / (queryMag * docMag);
}

/**
 * Busca semântica principal
 */
function semanticSearch(query: string) {
  // Tokenize all product corpora
  const documents = products.map((p) =>
    tokenize(`${p.name} ${p.description} ${p.category} ${p.tags.join(" ")} ${p.searchCorpus}`)
  );

  // Tokenize and expand query
  const queryTokens = tokenize(query);
  const expandedQuery = expandQuery(queryTokens);

  // Compute IDF across all documents + query
  const allDocs = [...documents, expandedQuery];
  const idf = computeIDF(allDocs);

  // Compute TF-IDF for query
  const queryTF = computeTF(expandedQuery);
  const queryTFIDF = new Map<string, number>();
  for (const [term, tf] of queryTF) {
    queryTFIDF.set(term, tf * (idf.get(term) || 0));
  }

  // Compute TF-IDF for each document and calculate similarity
  const results = products.map((product, i) => {
    const docTF = computeTF(documents[i]);
    const docTFIDF = new Map<string, number>();
    for (const [term, tf] of docTF) {
      docTFIDF.set(term, tf * (idf.get(term) || 0));
    }

    const score = cosineSimilarity(queryTFIDF, docTFIDF);
    return { product, score };
  });

  // Filter and sort by score
  return results
    .filter((r) => r.score > 0.01)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return Response.json({ results: [], query: "" });
  }

  const results = semanticSearch(query.trim());

  return Response.json({
    query: query.trim(),
    results: results.map((r) => ({
      product: r.product,
      score: Math.round(r.score * 10000) / 10000,
    })),
    meta: {
      engine: "TF-IDF",
      totalProducts: products.length,
      matchedProducts: results.length,
    },
  });
}
