-- AlterTable
ALTER TABLE "public"."JoinUsInquiry" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."JoinUsInquiry" ADD CONSTRAINT "JoinUsInquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
