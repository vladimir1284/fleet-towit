const seedInspection = async (prisma, tenantsId: number[]) => {
	console.log('Seeding inspections data...');

	const siNo = {
		create: [
			{
				name: 'Si'
			},
			{
				name: 'No'
			}
		]
	};

	const buenoRR = {
		create: [
			{
				name: 'Bueno'
			},
			{
				name: 'R.R'
			}
		]
	};

	for (const tenantId of tenantsId) {
		await prisma.customForm.create({
			data: {
				name: 'Custom Form',
				tenantId: tenantId,
				cards: {
					create: [
						// Whinch
						{
							name: 'Whinch',
							fields: {
								create: [
									{
										name: 'Control de repuesto',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									},
									{
										name: 'Control Regular',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									},
									{
										name: 'Cargar desde el camion',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									},
									{
										name: 'Condiciones del cable y el winch',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'No. de baterias grandes',
										type: 'NUMBER'
									},
									{
										name: 'Batería Volt',
										type: 'NUMBER'
									}
								]
							}
						},
						// Frente
						{
							name: 'Frente',
							fields: {
								create: [
									{
										name: 'Adaptador',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Condiciones del Pasador',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Tornillo',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Soldadura',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Cadena',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Sticker',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Cable 7 vias',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Interruptor del winch',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									}
								]
							}
						},
						// PTO
						{
							name: 'PTO',
							fields: {
								create: [
									{
										name: 'Sistema de gravedad',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									},
									{
										name: 'Funcionamiento',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Instalacion electrica',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Capacidad del liquido hidraulico',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Sujecion del PTO',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Caja del PTO Seguridad',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									},
									{
										name: 'Pistones sellos',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Mangueras de los pistones',
										type: 'SINGLE_CHECK',
										checkOptions: siNo
									}
								]
							}
						},
						// Rampas de extension
						{
							name: 'Rampas de extension',
							fields: {
								create: [
									{
										name: 'Hacia adelante',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									},
									{
										name: 'Hacia atras',
										type: 'SINGLE_CHECK',
										checkOptions: buenoRR
									}
								]
							}
						}
					]
				}
			}
		});

		await prisma.customForm.create({
			data: {
				name: 'Nuevos Campos',
				tenantId: tenantId,
				cards: {
					create: [
						{
							name: 'Tarjeta con nuevos campos',
							fields: {
								create: [
									{
										name: 'Imagen',
										type: 'IMAGE'
									},
									{
										name: 'Firma',
										type: 'SIGNATURE'
									},
									{
										name: 'Correo',
										type: 'EMAIL'
									},
									{
										name: 'Teléfono',
										type: 'PHONE'
									},
									{
										name: 'Fecha',
										type: 'DATE'
									},
									{
										name: 'Hora',
										type: 'TIME'
									}
								]
							}
						}
					]
				}
			}
		});
	}

	console.log('Seeding complete!');
};

export default seedInspection;
