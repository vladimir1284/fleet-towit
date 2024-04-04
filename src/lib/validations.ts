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

	const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
	const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

	for (const card of cards) {
		for (const field of card.fields) {
			const name = `field_${field.id}`;

			switch (field.type) {
				case 'TEXT':
					schema = schema.extend({ [name]: z.string() });
					break;
				case 'NUMBER':
					schema = schema.extend({ [name]: z.number() });
					break;
				case 'SINGLE_CHECK':
					schema = schema.extend({
						[`${name}_radio`]: z.number(),
						[`${name}_note`]: z.string().optional()
					});
					break;
				case 'EMAIL':
					schema = schema.extend({ [name]: z.string().email() });
					break;
				case 'DATE':
					schema = schema.extend({ [name]: z.date() });
					break;
				case 'TIME':
					schema = schema.extend({
						[name]: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
					});
					break;
				case 'PHONE':
					schema = schema.extend({
						[name]: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
					});
					break;
				case 'IMAGE':
					schema = schema.extend({
						[name]: z
							.instanceof(File)
							.refine((file) => {
								return !file || file.size <= MAX_UPLOAD_SIZE;
							}, 'File size must be less than 3MB')
							.refine((file) => {
								return ACCEPTED_FILE_TYPES.includes(file.type);
							}, 'File must be a image')
					});
					break;
			}
		}
	}

	return schema;
};
