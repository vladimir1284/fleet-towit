import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const admin_user = await prismaINSERT INTO User (
		id,
		email,
		emailVerified,
		image,
		firstName,
		lastName
	  )
	VALUES (
		id:integer,
		'email:text',
		'emailVerified:timestamp without time zone',
		'image:text',
		'firstName:text',
		'lastName:text'
	  );.user.create({
		data: {
			firstName: 'admin',
			email: 'vladimir.rdguez@gmail.com'
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
