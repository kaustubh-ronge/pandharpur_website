/*
  Warnings:

  - You are about to drop the column `budget` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `interest` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mobility` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `travelingWith` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "budget",
DROP COLUMN "interest",
DROP COLUMN "mobility",
DROP COLUMN "travelingWith";
