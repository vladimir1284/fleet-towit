import { bypassPrisma } from "../src/lib/prisma";

async function main() {
	const admin_user = await bypassPrisma.user.create({
		data: {
			firstName: 'admin',
			email: 'vladimir.rdguez@gmail.com'
		}
	});
	const admin_company = await bypassPrisma.company.create({
		data: {
			name: 'admin',
			email: 'vladimir.rdguez@gmail.com',
			isAdmin: true
		}
	});
	console.log(admin_user, admin_company);
}
main()
	.then(async () => {
		await bypassPrisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await bypassPrisma.$disconnect();
		process.exit(1);
	});
