-- CreateTable
CREATE TABLE "public"."JoinUsInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "JoinUsInquiry_pkey" PRIMARY KEY ("id")
);
