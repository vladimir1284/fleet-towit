import { createCompanyUser } from "$lib/actions/admin";
import { Role } from "@prisma/client";

const seedCompanyUsers = async (prisma) => {
  const existingAdminCompany = await prisma.company.findFirst({
    where: {
      name: 'admin'
    }
  });

  if (!existingAdminCompany) {
    const admin_company = await prisma.company.create({
      data: {
        name: 'admin',
        email: 'gissell111284@gmail.com',
        isAdmin: true
      }
    });
    await createCompanyUser({ email: 'gissell1184@gmail.com', userRole: Role.ADMIN, companyId: admin_company.id }) //admin_user_0
    await createCompanyUser({ email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN, companyId: admin_company.id }) //admin_user_1
  } else {
    await createCompanyUser({ email: 'gissell1184@gmail.com', userRole: Role.ADMIN, companyId: existingAdminCompany.id }) //admin_user_0
    await createCompanyUser({ email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN, companyId: existingAdminCompany.id }) //admin_user_1
  }
}

export default seedCompanyUsers