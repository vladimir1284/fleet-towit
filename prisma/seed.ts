import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	const admin_user = await prisma.user.create({
		data: {
			name: 'admin'
		}
	});
	console.log(admin_user);
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
