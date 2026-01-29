/*
  Warnings:

  - Added the required column `tutor_id` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'TUTOR');

-- AlterTable
ALTER TABLE "course" ADD COLUMN     "tutor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "booking_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "course_info" INTEGER NOT NULL,
    "student_info" TEXT NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "review_content" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    "student_id" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_course_info_fkey" FOREIGN KEY ("course_info") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_student_info_fkey" FOREIGN KEY ("student_info") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
