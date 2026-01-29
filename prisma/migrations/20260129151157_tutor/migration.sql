/*
  Warnings:

  - A unique constraint covering the columns `[tutor_id]` on the table `Tutor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tutor_tutor_id_key" ON "Tutor"("tutor_id");
