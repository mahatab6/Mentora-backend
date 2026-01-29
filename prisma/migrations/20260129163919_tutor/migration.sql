/*
  Warnings:

  - The `languages` column on the `Tutor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subjects` column on the `Tutor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tutor" DROP COLUMN "languages",
ADD COLUMN     "languages" TEXT[],
DROP COLUMN "subjects",
ADD COLUMN     "subjects" TEXT[];
