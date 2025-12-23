-- CreateTable
CREATE TABLE "public"."KirtankarLead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "entityId" TEXT,
    "entityType" TEXT,
    "userId" TEXT,

    CONSTRAINT "KirtankarLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KirtankarInquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3),
    "eventType" TEXT,
    "kirtankarSlug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "KirtankarInquiry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."KirtankarLead" ADD CONSTRAINT "KirtankarLead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."KirtankarInquiry" ADD CONSTRAINT "KirtankarInquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
