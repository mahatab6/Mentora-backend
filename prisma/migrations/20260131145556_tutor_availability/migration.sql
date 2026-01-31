-- CreateTable
CREATE TABLE "tutorAvailability" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,
    "status" VARCHAR(40) NOT NULL DEFAULT 'available',
    "tutor_id" TEXT NOT NULL,

    CONSTRAINT "tutorAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tutorAvailability" ADD CONSTRAINT "tutorAvailability_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
