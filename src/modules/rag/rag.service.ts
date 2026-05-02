import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { EmbeddingService } from "./embedding.service";
import { IndexingService } from "./indexing.service";
import { LLMService } from "./llm.service";

export class RagService {
  private embeddingService: EmbeddingService;
  private llmService: LLMService;
  private indexingService: IndexingService;

  constructor() {
    this.embeddingService = new EmbeddingService();
    this.indexingService = new IndexingService();
    this.llmService = new LLMService();
  }

  // Stats Logic
  async getStats() {
    const totalDocuments = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT COUNT(*)::int as count FROM "DocumentEmbedding" WHERE "isDeleted" = false;
    `);

    const sourceTypeCounts = await prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT "sourceType", COUNT(*)::int as count FROM "DocumentEmbedding" WHERE "isDeleted" = false GROUP BY "sourceType"
    `);

    return {
      totalActiveDocuments: totalDocuments[0]?.count ?? 0,
      sourceTypeBreakdown: sourceTypeCounts.reduce((acc, curr) => {
        acc[curr.sourceType] = curr.count;
        return acc;
      }, {} as Record<string, number>),
      timestamp: new Date(),
    };
  }

  // Trigger indexing from IndexingService
  async ingestTutors() { return await this.indexingService.indexTutors(); }
  async ingestCourses() { return await this.indexingService.indexCourses(); }
  async ingestReviews() { return await this.indexingService.indexReviews(); }

  // Vector Search Retrieval
  async retrieveRelevantDocuments(query: string, limit: number = 5, sourceType?: string) {
    try {
      const queryEmbedding = await this.embeddingService.generateEmbedding(query);
      const vectorLiteral = `[${queryEmbedding.join(",")}]`;

      // pgvector cosine similarity: 1 - (embedding <=> query)
      const results = await prisma.$queryRaw<any[]>(Prisma.sql`
        SELECT id, "chunkKey", "sourceType", "sourceId", "sourceLabel", content, metadata, 
        (1 - (embedding <=> CAST(${vectorLiteral} AS vector))) as similarity
        FROM "DocumentEmbedding"
        WHERE "isDeleted" = false
        ${sourceType ? Prisma.sql`AND "sourceType" = ${sourceType}` : Prisma.empty}
        ORDER BY embedding <=> CAST(${vectorLiteral} AS vector)
        LIMIT ${limit}
      `);

      return results;
    } catch (error) {
      console.error("Retrieval Error:", error);
      throw new Error("Failed to retrieve relevant documents");
    }
  }

  async generateAnswer(
  query: string,
  limit: number = 5,
  sourceType?: string,
  asJson: boolean = false,
) {
  try {
    const relevantDocs = await this.retrieveRelevantDocuments(
      query,
      limit,
      sourceType,
    );

    const context = (relevantDocs as any)
      .filter((doc: any) => doc.content)
      .map((doc: any) => doc.content);

    if (context.length === 0) {
      return { answer: "I don't have enough information.", sources: [] };
    }

    let answer = await this.llmService.generateResponse(
      query,
      context,
      asJson,
    );

    // সোর্স লিস্টে প্রোফাইল লিঙ্ক যোগ করা
    const sourcesWithLinks = (relevantDocs as any).map((doc: any) => {
      const baseUrl = process.env.FRONTEND_URL;
      let profileLink = null;

      // যদি সোর্স টাইপ TUTOR হয়, তবে লিঙ্ক তৈরি হবে
      if (doc.sourceType === "TUTOR" && doc.sourceId) {
        profileLink = `${baseUrl}/find-tutors/${doc.sourceId}`;
      } else if (doc.sourceType === "COURSE" && doc.sourceId) {
        profileLink = `${baseUrl}/courses/${doc.sourceId}`; 
      }

      return {
        id: doc.id,
        sourceType: doc.sourceType,
        sourceLabel: doc.sourceLabel,
        similarity: doc.similarity,
        profileLink: profileLink,
      };
    });

    return {
      answer: answer,
      sources: sourcesWithLinks,
      contextUsed: true,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

  async clearAll() {
      return await prisma.$executeRaw`
        DELETE FROM "DocumentEmbedding";
      `;
  }
}