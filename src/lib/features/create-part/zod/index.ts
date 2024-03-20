import { z } from 'zod';
import {
	createDefaultPartVendor,
	createDefaultPartLocation
} from '$lib/features/create-part/helpers';

import {
	PART_OUT_OF_RANGE_MESSAGE,
	PART_INVALID_NUMBER_MESSAGE,
	PART_STRING_TOO_SMALL_MESSAGE,
	// Constraints.
	PART_QTY_LAYOUT_CONSTRAINT,
	PART_COST_LAYOUT_CONSTRAINT,
	PART_UNIT_LAYOUT_CONSTRAINT,
	PART_NUMBER_LAYOUT_CONSTRAINT,
	PART_QUANTITY_LAYOUT_CONSTRAINT
	// Others if required...
} from '$lib/features/create-part/helpers';

const createNumberLikeSchema = (maximum: number) =>
	z // number-like pipeline.
		.string()
		.trim()
		.superRefine((value, errorQueue) => {
			if (value === '' || isNaN(Number(value))) {
				errorQueue.addIssue({
					code: z.ZodIssueCode.custom,
					message: PART_INVALID_NUMBER_MESSAGE
				});
			} else {
				const transformedValue = Number(value);
				if (transformedValue <= 0 || transformedValue >= maximum) {
					errorQueue.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${PART_OUT_OF_RANGE_MESSAGE} ${maximum} expected`
					});
				}
			}
		});

const partVendorSchema = z.object({
	// Particular constraints should be added instead of .min(1) each case.
	uuid: z.string().trim().uuid(),
	name: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	cost: createNumberLikeSchema(PART_COST_LAYOUT_CONSTRAINT)
});

const partLocationSchema = z.object({
	// Particular constraints should be added instead of .min(1) each case.
	uuid: z.string().trim().uuid(),
	name: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	// Constant required.
	quantity: createNumberLikeSchema(PART_QUANTITY_LAYOUT_CONSTRAINT),
	unit: z.enum(PART_UNIT_LAYOUT_CONSTRAINT)
});

export const PartDetailSchema = z.object({
	// Particular constraints should be added instead of .min(1) each case.
	name: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	upc: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	description: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	number: createNumberLikeSchema(PART_NUMBER_LAYOUT_CONSTRAINT),
	criticalQty: createNumberLikeSchema(PART_QTY_LAYOUT_CONSTRAINT)
});

export const PartCustomizationSchema = PartDetailSchema.extend({
	categories: z.string().trim().array(),
	vendors: partVendorSchema.array().default([createDefaultPartVendor()]),
	locations: partLocationSchema.array().default([createDefaultPartLocation()])
});

// Type safety.
export type PartCreationType = z.infer<typeof PartCustomizationSchema>;
export type partVendorType = z.infer<typeof partVendorSchema>;
export type partLocationType = z.infer<typeof partLocationSchema>;

// Custom error type.
export type SuperFormErrorType = {
	[K in keyof PartCreationType]?: string[];
} & { categories?: string[] } & {
	vendors?: { [K in keyof partVendorType]: string[] }[];
} & {
	locations?: { [K in keyof partLocationType]: string[] }[];
};
