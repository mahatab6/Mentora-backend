-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "course_name" TEXT NOT NULL,
    "course_price" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "review" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);
