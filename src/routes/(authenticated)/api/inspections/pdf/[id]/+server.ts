import { error } from '@sveltejs/kit';
import path from 'node:path';
import type { RequestHandler } from './$types';
import PdfPrinter from 'pdfmake';
import blobStream, { type IBlobStream } from 'blob-stream';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { FormFieldType } from '@prisma/client';
import { retrieveInspectionById } from '$lib/actions/inspections';

export const GET: RequestHandler = async ({ locals, params }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	if (!params.id) {
		throw error(404, {
			message: 'Inspection not found'
		});
	}

	const inspectionId = Number(params.id);

	if (!inspectionId) {
		throw error(404, {
			message: 'Inspection not found'
		});
	}

	// this code is for testing purposes only
	const tenant = session?.user.tenantUsers[0].tenant;

	const inspection = await retrieveInspectionById({
		tenantId: tenant.id,
		id: inspectionId
	});

	const pdf = await createPDF(inspection);

	return new Response(pdf);
};

const createPDF = async (inspection: any) => {
	const day = inspection.createdAt.getDate() + 1;
	const month = inspection.createdAt.getMonth() + 1;
	const year = inspection.createdAt.getFullYear();

	const dateInspections = `${day}/${month}/${year}`;

	const fonts = {
		Roboto: {
			normal: path.join('./static', 'Roboto-Regular.ttf'),
			bold: path.join('./static', 'Roboto-Medium.ttf')
		},

		Fontello: {
			normal: path.join('./static', 'fontello.ttf'),
			bold: path.join('./static', 'fontello.ttf')
		}
	};

	const docDefinition: TDocumentDefinitions = {
		content: [
			{
				columns: [
					{
						text: [
							{ text: 'TOWIT HOUSTON\n', style: 'header' },
							{ text: 'INSPECTION DE TRAILER CAR HAULER', style: 'subheader' }
						],
						alignment: 'center'
					},

					{
						image: 'twt',
						width: 140,
						height: 45
					}
				]
			},
			'\n',
			{
				alignment: 'justify',
				columns: [
					// model
					{
						text: [
							{ text: 'Modelo: ', style: 'details' },
							{ text: inspection.vehicle.model, style: 'content' }
						]
					},
					// VIN
					{
						text: [
							{ text: 'VIN: ', style: 'details' },
							{ text: inspection.vehicle.vin, style: 'content' }
						]
					},
					// plate
					{
						text: [
							{ text: 'Plate: ', style: 'details' },
							{ text: inspection.vehicle.plate, style: 'content' }
						]
					},
					// Date
					{
						text: [
							{ text: 'Date: ', style: 'details' },
							{ text: dateInspections, style: 'content' }
						]
					}
				]
			},
			'\n',
			{
				alignment: 'justify',
				columns: [
					{
						text: 'Inspector: _________________',
						style: 'details'
					},
					{
						text: 'Signature: _________________',
						style: 'details'
					},
					{
						text: 'Rentador: _________________',
						style: 'details'
					},
					{
						text: 'Signature: _________________',
						style: 'details'
					}
				]
			},
			'\n'
		],

		images: {
			twt: path.join('./static', 'twt.jpg')
		},

		styles: {
			header: {
				fontSize: 16,
				bold: true
			},
			subheader: {
				fontSize: 11,
				bold: true
			},
			details: {
				fontSize: 9.5,
				bold: true
			},
			content: {
				fontSize: 9
			},
			icon: {
				font: 'Fontello'
			}
		}
	};

	for (const field of inspection.customForm.fields) {
		// text , number
		if (field.type === FormFieldType.NUMBER || field.type === FormFieldType.TEXT) {
			const columns: any = [
				{
					text: `${field.name}:`,
					style: 'content',
					width: 170
				}
			];

			// response
			for (const response of field.responses) {
				columns.push({
					text: response.content,
					style: 'content'
				});
			}

			docDefinition.content.push({ columns });
			docDefinition.content.push('\n');
			// single ckeck
		} else if (field.type === FormFieldType.SINGLE_CHECK) {
			const columns: any = [
				{
					text: `${field.name}:`,
					style: 'content',
					width: 170
				}
			];

			for (const option of field.checkOptions) {
				for (const response of field.responses) {
					if (option.id === response.checkOptionId) {
						columns.push({
							text: [{ text: '', style: 'icon' }, `  ${option.name}`],
							style: 'content',
							width: 80
						});
					} else {
						columns.push({
							text: [{ text: '', style: 'icon' }, `  ${option.name}`],
							style: 'content',
							width: 80
						});
					}
				}
			}

			for (const response of field.responses) {
				if (response.note) {
					columns.push({
						text: `Note: ${response.note}`,
						style: 'content'
					});
				} else {
					columns.push({
						text: ``,
						style: 'content'
					});
				}
			}

			docDefinition.content.push({ columns });
			docDefinition.content.push('\n');
		}
	}

	const printer = new PdfPrinter(fonts);

	return new Promise((resolve, reject) => {
		const pdf = printer.createPdfKitDocument(docDefinition);

		pdf
			.pipe(blobStream())
			.on('finish', function (this: IBlobStream) {
				resolve(this.toBlob('application/pdf'));
			})
			.on('error', (err) => {
				console.error('err', err);
				reject(err);
			});

		pdf.end();
	});
};
