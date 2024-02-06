/*
  Warnings:

  - You are about to drop the column `userId` on the `CustomFieldResponse` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CustomForm` table. All the data in the column will be lost.
  - Added the required column `tenantUserId` to the `CustomFieldResponse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantUserId` to the `CustomForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomFieldResponse" DROP CONSTRAINT "CustomFieldResponse_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomForm" DROP CONSTRAINT "CustomForm_userId_fkey";

-- AlterTable
ALTER TABLE "CustomFieldResponse" DROP COLUMN "userId",
ADD COLUMN     "tenantUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CustomForm" DROP COLUMN "userId",
ADD COLUMN     "tenantUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomForm" ADD CONSTRAINT "CustomForm_tenantUserId_fkey" FOREIGN KEY ("tenantUserId") REFERENCES "TenantUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomFieldResponse" ADD CONSTRAINT "CustomFieldResponse_tenantUserId_fkey" FOREIGN KEY ("tenantUserId") REFERENCES "TenantUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
