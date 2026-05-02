import { prisma } from "../../lib/prisma";
import { EmbeddingService } from "./embedding.service";

export class IndexingService {
  private embeddingService: EmbeddingService;

  constructor() {
    this.embeddingService = new EmbeddingService();
  }
  async indexDocument(
    chunkKey: string,
    chunkIndex: number,
    sourceType: string,
    sourceId: string,
    content: string,
    sourceLabel?: string,
    metadata?: Record<string, unknown>,
  ) {
    try {
      // ১. কন্টেন্টের জন্য এমবেডিং জেনারেট করা
      const embedding = await this.embeddingService.generateEmbedding(content);
      
      // ২. pgvector এর ফরম্যাট অনুযায়ী স্ট্রিং তৈরি [0.1, 0.2, ...]
      const vectorString = `[${embedding.join(",")}]`;

      // ৩. টাইপ-সেফ SQL কুয়েরি রান করা
      await prisma.$executeRaw`
        INSERT INTO "DocumentEmbedding" (
          "chunkKey",
          "chunkIndex",
          "sourceType",
          "sourceId",
          "sourceLabel",
          "content",
          "metadata",
          "embedding",
          "updatedAt"
        )
        VALUES (
          ${chunkKey},
          ${chunkIndex},
          ${sourceType},
          ${sourceId},
          ${sourceLabel || null},
          ${content},
          ${JSON.stringify(metadata || {})}::jsonb,
          CAST(${vectorString} AS vector),
          NOW()
        )
        ON CONFLICT ("chunkKey")
        DO UPDATE SET
          "content" = EXCLUDED."content",
          "metadata" = EXCLUDED."metadata",
          "embedding" = EXCLUDED."embedding",
          "isDeleted" = false,
          "deletedAt" = null,
          "updatedAt" = NOW();
      `;
    } catch (error) {
      console.error("❌ Indexing Error for Key:", chunkKey, error);
      throw new Error("Index document failed due to database or embedding error.");
    }
  }

  
  async indexTutors() {
    const tutors = await prisma.tutor.findMany({
      include: { reviews: true },
    });

    let count = 0;
    for (const tutor of tutors) {
      const reviewText = tutor.reviews
        .map((r) => `Rating: ${r.rating}, Review: ${r.reviewContent}`)
        .join("\n");

      const content = `
Name: ${tutor.fullName}
Subjects: ${tutor.subjects.join(", ")}
Bio: ${tutor.shortBio}
About: ${tutor.aboutMe}
Education: ${tutor.education}
Hourly Rate: ${tutor.hourlyRate}
Rating: ${tutor.averageRating}
Reviews:
${reviewText || "No reviews"}
`.trim();

      await this.indexDocument(
        `tutor-${tutor.id}`,
        0,
        "TUTOR",
        tutor.tutor_id,
        content,
        tutor.fullName,
        { tutorId: tutor.tutor_id, rating: tutor.averageRating }
      );
      count++;
    }
    return { message: `${count} tutors indexed successfully`, count };
  }

  
  async indexCourses() {
    const courses = await prisma.course.findMany();

    let count = 0;
    for (const course of courses) {
      const content = `
Course Name: ${course.course_name}
Subject: ${course.subject}
Price: ${course.course_price}
Review: ${course.review}
`.trim();

      await this.indexDocument(
        `course-${course.id}`,
        0,
        "COURSE",
        String(course.id),
        content,
        course.course_name,
        { courseId: course.id, subject: course.subject }
      );
      count++;
    }
    return { message: `${count} courses indexed successfully`, count };
  }

 
  async indexReviews() {
    const reviews = await prisma.review.findMany({
      include: { tutor: true, student: true },
    });

    let count = 0;
    for (const review of reviews) {
      const content = `
Tutor: ${review.tutor.fullName}
Student: ${review.student.name}
Rating: ${review.rating}
Review: ${review.reviewContent}
Reply: ${review.replyContent || "No reply"}
`.trim();

      await this.indexDocument(
        `review-${review.id}`,
        0,
        "REVIEW",
        String(review.id),
        content,
        review.tutor.fullName,
        { rating: review.rating, tutorId: review.tutor_id }
      );
      count++;
    }
    return { message: `${count} reviews indexed successfully`, count };
  }
}