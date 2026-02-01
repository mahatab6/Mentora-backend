/*
  Warnings:

  - You are about to drop the column `booking_created` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `course_info` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `student_info` on the `booking` table. All the data in the column will be lost.
  - Added the required column `durationMinutes` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tutorId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_course_info_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_student_info_fkey";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "booking_created",
DROP COLUMN "course_info",
DROP COLUMN "student_info",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "durationMinutes" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "studentId" TEXT NOT NULL,
ADD COLUMN     "tutorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
