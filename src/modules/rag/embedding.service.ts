export class EmbeddingService {
  private apikey: string;
  private apiUrl: string = "https://openrouter.ai/api/v1";
  private embeddingModel: string;

  constructor() {
    this.apikey = process.env.OPENROUTER_API_KEY || "";
    this.embeddingModel =
      process.env.OPENROUTER_EMBEDDING_MODEL ||
      "nvidia/llama-nemotron-embed-vl-1b-v2:free";

    if (!this.apikey) {
      throw new Error("OPENROUTER_API_KEY is not set in .env");
    }
  }

  async generateEmbedding(text: string) {
    if (!text || text.trim().length === 0) {
      throw new Error("Text is empty");
    }

    try {
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apikey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: text,
          model: this.embeddingModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        throw new Error("No embedding data returned");
      }

      const embedding = data.data[0].embedding;

      if (embedding.length !== 2048) {
        throw new Error(`Invalid embedding dimension: ${embedding.length}`);
      }

      return embedding;
    } catch (error: any) {
      console.error("Embedding error:", error);
      throw new Error(error.message || "Embedding generation failed");
    }
  }

  async generateEmbeddings(texts: string[]) {
    if (!texts || texts.length === 0) {
      throw new Error("Texts array is empty");
    }

    try {
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apikey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: texts,
          model: this.embeddingModel,
        }),
      });

      const data = await response.json();

      return data.data.map((item: any) => item.embedding);
    } catch (error: any) {
      console.error("Batch embedding error:", error);
      throw error;
    }
  }
}