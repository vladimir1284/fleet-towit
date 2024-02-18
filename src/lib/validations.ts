import { z } from 'zod';
import { FormFieldType } from '@prisma/client';
import type { CustomField } from '@prisma/client';

export const generateValidationSchema = (fields: CustomField[]) => {
	let schema = z.object({});

	for (const field of fields) {
		const name = `field_${field.id}`;

		// alphanumeric
		if (field.type === FormFieldType.TEXT) {
			schema = schema.extend({ [name]: z.string() });

			//  numeric
		} else if (field.type === FormFieldType.NUMBER) {
			schema = schema.extend({ [name]: z.number() });

			// checkboxes
		} else if (field.type === FormFieldType.CHECKBOXES) {
			for (const checkbox of field.checkOptions) {
				schema = schema.extend({ [`${name}_checkbox_${checkbox.id}`]: z.boolean().optional() });
			}
		}
	}

	return schema;
};
