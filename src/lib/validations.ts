import { z } from 'zod';
import type { Card, CustomField, CheckOption } from '@prisma/client';

interface CustomFields extends CustomField {
	checkOptions: CheckOption[];
}

interface Cards extends Card {
	fields: CustomFields[];
}

export const generateValidationSchema = (cards: Cards[]) => {
	let schema = z.object({});

	const fileSchema = z
		.instanceof(File)
		.refine((file) => {
			return !file || file.size <= MAX_UPLOAD_SIZE;
		}, 'File size must be less than 3MB')
		.refine((file) => {
			return ACCEPTED_FILE_TYPES.includes(file.type);
		}, 'File must be a image');

	const timeSchema = z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
	const phoneSchema = z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
	const base64Schema = z.string().regex(/^data:image\/png;base64,([A-Za-z0-9+/=])+$/);

	const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
	const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

	for (const card of cards) {
		for (const field of card.fields) {
			const name = `field_${field.id}`;

			switch (field.type) {
				case 'TEXT':
					schema = schema.extend({ [name]: field.required ? z.string() : z.string().optional() });
					break;

				case 'NUMBER':
					schema = schema.extend({ [name]: field.required ? z.number() : z.number().optional() });
					break;

				case 'SINGLE_CHECK':
					schema = schema.extend({
						[`${name}_radio`]: field.required ? z.number() : z.number().optional(),
						[`${name}_note`]: z.string().optional()
					});
					break;
				case 'EMAIL':
					schema = schema.extend({
						[name]: field.required ? z.string().email() : z.string().email().optional()
					});
					break;
				case 'DATE':
					schema = schema.extend({ [name]: field.required ? z.date() : z.date().optional() });
					break;
				case 'TIME':
					schema = schema.extend({
						[name]: field.required ? timeSchema : timeSchema.optional()
					});
					break;
				case 'PHONE':
					schema = schema.extend({
						[name]: field.required ? phoneSchema : phoneSchema.optional()
					});
					break;
				case 'IMAGE':
					schema = schema.extend({
						[name]: field.required ? fileSchema : fileSchema.optional()
					});
					break;
				case 'SIGNATURE':
					schema = schema.extend({
						[name]: field.required ? base64Schema : base64Schema.optional()
					});
					break;
			}
		}
	}

	return schema;
};
