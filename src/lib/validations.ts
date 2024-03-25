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
			}
		}
	}

	return schema;
};
