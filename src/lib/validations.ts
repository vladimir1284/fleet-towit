import { z } from 'zod';
import { FormFieldType } from '@prisma/client';
import type { Card, CustomField, CheckOption } from '@prisma/client';

interface CustomFields extends CustomField {
	checkOptions: CheckOption[];
}

interface Cards extends Card {
	fields: CustomFields[];
}

export const generateValidationSchema = (cards: Cards[]) => {
	let schema = z.object({});

	for (const card of cards) {
		for (const field of card.fields) {
			const name = `field_${field.id}`;

			// alphanumeric
			if (field.type === FormFieldType.TEXT) {
				schema = schema.extend({ [name]: z.string() });

				//  numeric
			} else if (field.type === FormFieldType.NUMBER) {
				schema = schema.extend({ [name]: z.number() });

				// single check
			} else if (field.type === FormFieldType.SINGLE_CHECK) {
				schema = schema.extend({
					[`${name}_radio`]: z.number(),
					[`${name}_note`]: z.string().optional()
				});

				// email
			} else if (field.type === FormFieldType.EMAIL) {
				schema = schema.extend({ [name]: z.string().email() });

				// date
			} else if (field.type === FormFieldType.DATE) {
				schema = schema.extend({ [name]: z.date() });

				// time
			} else if (field.type === FormFieldType.TIME) {
				schema = schema.extend({ [name]: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/) });

				// phone
			} else if (field.type === FormFieldType.PHONE) {
				schema = schema.extend({
					[name]: z.string().regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
				});
				// image
			} else if (field.type === FormFieldType.IMAGE) {
				// const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
				// const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

				// schema = schema.extend({
				// 	[name]: z
				// 		.instanceof(File)
				// 		.refine((file) => {
				// 			return !file || file.size <= MAX_UPLOAD_SIZE;
				// 		}, 'File size must be less than 3MB')
				// 		.refine((file) => {
				// 			return ACCEPTED_FILE_TYPES.includes(file.type);
				// 		}, 'File must be a image')
				// });

				schema = schema.extend({
					[name]: z.any()
				});
			}
		}
	}

	return schema;
};
