-- DropForeignKey
ALTER TABLE "CustomFieldResponse" DROP CONSTRAINT "CustomFieldResponse_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomForm" DROP CONSTRAINT "CustomForm_userId_fkey";

-- AddForeignKey
ALTER TABLE "CustomForm" ADD CONSTRAINT "CustomForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TenantUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomFieldResponse" ADD CONSTRAINT "CustomFieldResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TenantUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
