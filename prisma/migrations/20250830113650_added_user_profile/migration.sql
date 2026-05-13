/*
  Warnings:

  - You are about to drop the column `clerkUserId` on the `AiSuggestion` table. All the data in the column will be lost.
  - You are about to drop the column `accommodationDetails` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `clerkUserId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `dailyNotes` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `transportationDetails` on the `Trip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[aiSuggestionId]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `AiSuggestion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `prompt` on the `AiSuggestion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AiSuggestion" DROP CONSTRAINT "AiSuggestion_clerkUserId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Trip" DROP CONSTRAINT "Trip_clerkUserId_fkey";

-- DropIndex
DROP INDEX "public"."AiSuggestion_clerkUserId_idx";

-- DropIndex
DROP INDEX "public"."AiSuggestion_clerkUserId_key";

-- DropIndex
DROP INDEX "public"."Trip_clerkUserId_idx";

-- AlterTable
ALTER TABLE "public"."AiSuggestion" DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "prompt",
ADD COLUMN     "prompt" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "accommodationDetails",
DROP COLUMN "clerkUserId",
DROP COLUMN "dailyNotes",
DROP COLUMN "transportationDetails",
ADD COLUMN     "aiSuggestionId" TEXT,
ADD COLUMN     "isAiGenerated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "selectedLocations" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "budget" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "people" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "AiSuggestion_userId_idx" ON "public"."AiSuggestion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_aiSuggestionId_key" ON "public"."Trip"("aiSuggestionId");

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_aiSuggestionId_fkey" FOREIGN KEY ("aiSuggestionId") REFERENCES "public"."AiSuggestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AiSuggestion" ADD CONSTRAINT "AiSuggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
