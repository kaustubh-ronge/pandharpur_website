/*
  Warnings:

  - You are about to drop the column `suggestions` on the `AiSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AiSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AiSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `itinerary` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Trip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `AiSuggestion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkUserId` to the `AiSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `AiSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `response` to the `AiSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budget` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AiSuggestion" DROP CONSTRAINT "AiSuggestion_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- DropIndex
DROP INDEX "public"."AiSuggestion_userId_key";

-- DropIndex
DROP INDEX "public"."Trip_userId_idx";

-- AlterTable
ALTER TABLE "public"."AiSuggestion" DROP COLUMN "suggestions",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "response" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "coverImage",
DROP COLUMN "destination",
DROP COLUMN "itinerary",
DROP COLUMN "userId",
ADD COLUMN     "accommodationDetails" TEXT,
ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD COLUMN     "dailyNotes" JSONB,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "people" INTEGER NOT NULL,
ADD COLUMN     "preferences" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "transportationDetails" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AiSuggestion_clerkUserId_key" ON "public"."AiSuggestion"("clerkUserId");

-- CreateIndex
CREATE INDEX "AiSuggestion_clerkUserId_idx" ON "public"."AiSuggestion"("clerkUserId");

-- CreateIndex
CREATE INDEX "Trip_clerkUserId_idx" ON "public"."Trip"("clerkUserId");

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "public"."User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AiSuggestion" ADD CONSTRAINT "AiSuggestion_clerkUserId_fkey" FOREIGN KEY ("clerkUserId") REFERENCES "public"."User"("clerkUserId") ON DELETE RESTRICT ON UPDATE CASCADE;
