-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Client_phoneNumber_key" ON "Client"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyUser" ADD CONSTRAINT "CompanyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- RLS
ALTER TABLE "CompanyUser" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Client" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "Company" ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON "CompanyUser" USING ("companyId" = current_setting('app.current_company_id', TRUE)::text);

CREATE POLICY tenant_isolation_policy ON "Client" USING ("companyId" = current_setting('app.current_company_id', TRUE)::text);

CREATE POLICY tenant_isolation_policy ON "Company" USING ("id" = current_setting('app.current_company_id', TRUE)::text);

CREATE POLICY bypass_rls_policy ON "CompanyUser" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY bypass_rls_policy ON "Client" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY bypass_rls_policy ON "Company" USING (current_setting('app.bypass_rls', TRUE)::text = 'on');

CREATE POLICY user_company_isolation_policy ON "CompanyUser" USING ("userId" = current_setting('app.current_user_id', TRUE)::text)