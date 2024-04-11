import { error } from '@sveltejs/kit';
import path from 'node:path';
import type { RequestHandler } from './$types';
import PdfPrinter from 'pdfmake';
import blobStream, { type IBlobStream } from 'blob-stream';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { FormFieldType } from '@prisma/client';
import type {
	Inspection,
	Vehicle,
	CustomForm,
	CustomField,
	CustomFieldResponse,
	CheckOption,
	Card
} from '@prisma/client';
import { minioClient } from '$lib/minio';
import { retrieveInspectionById } from '$lib/actions/inspections';
import axios from 'axios';

interface CustomFields extends CustomField {
	responses: CustomFieldResponse[];
	checkOptions: CheckOption[];
}

interface Cards extends Card {
	fields: CustomFields[];
}

interface CustomForms extends CustomForm {
	cards: Cards[];
}

interface Inspections extends Inspection {
	vehicle: Vehicle;
	customForm: CustomForms;
}

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

	const tenantUserId = session.user.defaultTenantUser.tenantId;

	const inspection = (await retrieveInspectionById({
		tenantId: tenantUserId,
		id: inspectionId
	})) as Inspections;

	const pdf = await createPDF(inspection);

	// @ts-expect-error: pass
	return new Response(pdf);
};

const createPDF = async (inspection: Inspections) => {
	const day = inspection.createdAt.getDate();
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

	const docDefinition = {
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
					{
						text: [
							{ text: 'Modelo: ', style: 'details' },
							{ text: inspection.vehicle.model, style: 'content' }
						]
					},
					{
						text: [
							{ text: 'VIN: ', style: 'details' },
							{ text: inspection.vehicle.vin, style: 'content' }
						]
					},
					{
						text: [
							{ text: 'Plate: ', style: 'details' },
							{ text: inspection.vehicle.plate, style: 'content' }
						]
					},
					{
						text: [
							{ text: 'Date: ', style: 'details' },
							{ text: dateInspections, style: 'content' }
						]
					}
				]
			},
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
			}
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
			card_name: {
				fontSize: 9,
				bold: true,
				decoration: 'underline'
			},
			icon: {
				font: 'Fontello'
			}
		},

		defaultStyle: {
			lineHeight: 1.5
		}
	};

	const parseDate = (date: string) => {
		const dateParsed = new Date(date);

		const day = dateParsed.getDate();
		const month = dateParsed.getMonth() + 1;
		const year = dateParsed.getFullYear();

		return `${day} / ${month} / ${year}`;
	};

	interface Column {
		text?: string | (string | { text: string; style: string })[];
		style?: string;
		width?: number;
		link?: string;
		image?: string;
	}

	for (const card of inspection.customForm.cards) {
		docDefinition.content.push({
			// @ts-expect-error: pass
			text: `\n${card.name}:`,
			style: 'card_name'
		});

		for (const field of card.fields) {
			const columns: Column[] = [
				{
					text: `${field.name}:`,
					style: 'content',
					width: 170
				}
			];

			// text , number
			if (field.type === FormFieldType.NUMBER || field.type === FormFieldType.TEXT) {
				// response
				for (const response of field.responses) {
					columns.push({
						text: response.content ? (response.content as string) : '-',
						style: 'content'
					});
				}

				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
				// single check
			} else if (field.type === FormFieldType.SINGLE_CHECK) {
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

				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
				// email
			} else if (field.type === FormFieldType.EMAIL) {
				for (const response of field.responses) {
					columns.push({
						text: response.content ? (response.content as string) : '-',
						style: 'content',
						link: `mailto:${response.content}`
					});
				}
				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
				// date
			} else if (field.type === FormFieldType.DATE) {
				// response
				for (const response of field.responses) {
					columns.push({
						text: response.content ? parseDate(String(response.content)) : '-',
						style: 'content'
					});
				}

				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
			} else if (field.type === FormFieldType.TIME) {
				for (const response of field.responses) {
					columns.push({
						text: response.content ? String(response.content) : '-',
						style: 'content'
					});
				}

				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
			} else if (field.type === FormFieldType.PHONE) {
				for (const response of field.responses) {
					columns.push({
						text: response.content ? String(response.content) : '-',
						style: 'content',
						link: `tel:${response.content}`
					});
				}
				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
			} else if (field.type === FormFieldType.IMAGE || field.type === FormFieldType.SIGNATURE) {
				for (const response of field.responses) {
					if (response.content) {
						const file_url = await minioClient.presignedGetObject(
							'develop',
							`inspections/${inspection.id}/${response.content}`
						);

						const imgBase64 = await toBase64(file_url);

						columns.push({
							image: imgBase64,
							width: 200
						});
					} else {
						columns.push({
							text: '-',
							style: 'content'
						});
					}
				}
				// @ts-expect-error: pass
				docDefinition.content.push({ columns });
			}
		}
	}

	const printer = new PdfPrinter(fonts);

	return new Promise((resolve, reject) => {
		const pdf = printer.createPdfKitDocument(docDefinition as TDocumentDefinitions);

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

const toBase64 = async (url: string) => {
	try {
		const response = await axios.get(url, { responseType: 'arraybuffer' });
		const buffer = Buffer.from(response.data);

		const base64data = buffer.toString('base64');
		const contentType = response.headers['content-type'];

		return `data:${contentType};base64,${base64data}`;
	} catch (error) {
		console.error(error);
	}
};
