// import { PrismaClient } from '@prisma/client';

const seedInspection = async (prisma, tenantId: string) => {
	console.log('Seeding inspections data...');

	await prisma.customForm.create({
		data: {
			name: 'Custom Form',
			tenantId: tenantId,
			fields: {
				create: [
					{
						name: 'Control de respuesto',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Si' }, { name: 'No' }]
						}
					},
					{
						name: 'Control regular',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Si' }, { name: 'No' }]
						}
					},

					{
						name: 'Carga desde el camión',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Si' }, { name: 'No' }]
						}
					},

					{
						name: 'Condiciones del cable y el winch',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Adaptador',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Condiciones del pasador',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Tornillo',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Soldadura',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Cadena',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},

					{
						name: 'Sticker',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Cable 7 vías',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'interruptor del winch',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Si' }, { name: 'No' }]
						}
					},

					{
						name: 'Sistema de gravedad',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Si' }, { name: 'No' }]
						}
					},
					{
						name: 'Funcionamiento',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Instalación eléctrica',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Capacidad del líquido hidraulico',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'Requiere rellenar' }]
						}
					},
					{
						name: 'Sujecion del PTO',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Caja del PTO Seguridad',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Si' }, { name: 'No' }]
						}
					},
					{
						name: 'Pistones sellos',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Manguera de los pistones',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Rampas de extensión hacia delante',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					},
					{
						name: 'Rampas de extensión hacia atras',
						type: 'SINGLE_CHECK',
						checkOptions: {
							create: [{ name: 'Bueno' }, { name: 'R.R' }]
						}
					}
				]
			}
		}
	});

	console.log('Seeding complete!');
};

export default seedInspection;
