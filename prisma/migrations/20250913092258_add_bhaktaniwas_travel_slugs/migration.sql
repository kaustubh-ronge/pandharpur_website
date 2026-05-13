-- DropForeignKey
ALTER TABLE "public"."Inquiry" DROP CONSTRAINT "Inquiry_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Inquiry" ADD COLUMN     "bhaktaniwasSlug" TEXT,
ADD COLUMN     "travelSlug" TEXT,
ALTER COLUMN "hotelSlug" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Lead" ALTER COLUMN "entityId" DROP NOT NULL,
ALTER COLUMN "entityType" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Inquiry" ADD CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
