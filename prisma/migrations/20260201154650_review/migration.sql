/*
  Warnings:

  - You are about to drop the column `studentId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `tutorId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutor_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_tutorId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "studentId",
DROP COLUMN "tutorId",
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "tutor_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
