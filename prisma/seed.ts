import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const admin_user = await prisma.user.create({
		data: {
			firstName: 'admin',
			email: 'gissell1184@gmail.com'
		}
	});
	const admin_company = await prisma.company.create({
		data: {
			name: 'admin',
			email: 'gissell111284@gmail.com',
			isAdmin: true
		}
	});
	console.log(admin_user, admin_company);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
