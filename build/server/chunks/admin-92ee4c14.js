import { b as bypassPrisma } from './prisma-50863289.js';
import '@auth/core/providers/email';
import { Role } from '@prisma/client';
import './sentry-release-injection-file-4a7720ec.js';

const createCompany = async ({ name, email: email2 = null }) => {
  let obj = await bypassPrisma.company.create({ data: {
    name,
    email: email2
  } });
  return obj;
};
const createCompanyUser = async ({ email: email2, companyId, userRole = Role.STAFF }) => {
  let user = await bypassPrisma.user.findUnique({ where: { email: email2 } });
  if (!user) {
    user = await bypassPrisma.user.create({ data: { email: email2 } });
  }
  let companyUser = await bypassPrisma.companyUser.create({ data: {
    userId: user.id,
    companyId,
    role: userRole
  } });
  return companyUser;
};
const updateCompanyUser = async ({ companyUserId, email: email2, companyId, userRole }) => {
  let user = await bypassPrisma.user.findUnique({ where: { email: email2 } });
  if (!user) {
    user = await bypassPrisma.user.create({ data: { email: email2 } });
  }
  let companyUser = await bypassPrisma.companyUser.update({ where: { id: companyUserId }, data: { companyId, role: userRole, userId: user.id } });
  return companyUser;
};
const deleteUser = async ({ companyUserId }) => {
  await bypassPrisma.companyUser.delete({ where: { id: companyUserId } });
  return true;
};
const getCompanyUser = async ({ companyUserId }) => {
  let companyUser = await bypassPrisma.companyUser.findUnique({ where: { id: companyUserId } });
  let user = await bypassPrisma.user.findUnique({ where: { id: companyUser?.userId } });
  return { ...companyUser, user };
};
const listCompanies = async () => {
  let companies = await bypassPrisma.company.findMany();
  await Promise.all(companies.map(async (company) => {
    let owner;
    let _owner = await bypassPrisma.companyUser.findFirst({ where: { AND: { companyId: company.id, role: Role.OWNER } } });
    if (_owner) {
      let user = await bypassPrisma.user.findUnique({ where: { id: _owner.userId } });
      owner = { ..._owner, user };
    } else {
      owner = _owner;
    }
    return { ...company, owner };
  }));
  return companies;
};
const listCompanyUsers = async ({ companyId }) => {
  let _users = await bypassPrisma.companyUser.findMany({ where: { companyId } });
  let users = await Promise.all(_users.map(async (user) => {
    let _user = await bypassPrisma.user.findUnique({ where: { id: user.userId } });
    return { ...user, user: _user };
  }));
  return users;
};
const getAdminCompany = async () => {
  let company = await bypassPrisma.company.findFirst({ where: { isAdmin: true } });
  return company;
};

export { createCompanyUser as a, listCompanyUsers as b, createCompany as c, getCompanyUser as d, deleteUser as e, getAdminCompany as g, listCompanies as l, updateCompanyUser as u };
//# sourceMappingURL=admin-92ee4c14.js.map
