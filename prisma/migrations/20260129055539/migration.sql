-- CreateTable
CREATE TABLE "Tutor" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "languages" TEXT[],
    "subjects" TEXT[],
    "photoUrl" TEXT NOT NULL,
    "introVideoUrl" TEXT,
    "shortBio" VARCHAR(150) NOT NULL,
    "aboutMe" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "hourlyRate" INTEGER NOT NULL,
    "lessonDuration" TEXT NOT NULL,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "isProfileActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutor_id" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tutor" ADD CONSTRAINT "Tutor_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
