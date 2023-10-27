-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Active', 'InProgress', 'Done', 'Closed', 'Cancelled');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'New',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
