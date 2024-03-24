import { z } from 'zod';
import {
	createDefaultPartVendor,
	createDefaultPartLocation
} from '$lib/features/create-part/helpers';

import {
	PART_STRING_TOO_SMALL_MESSAGE,
	// Constraints.
	PART_OUT_OF_RANGE_MESSAGE,
	PART_QTY_LAYOUT_CONSTRAINT,
	PART_COST_LAYOUT_CONSTRAINT,
	PART_UNIT_LAYOUT_CONSTRAINT,
	PART_NUMBER_LAYOUT_CONSTRAINT,
	PART_QUANTITY_LAYOUT_CONSTRAINT
	// Others if required...
} from '$lib/features/create-part/helpers';

const createPositiveNumberSchema = (maximum: number) =>
	z.number().superRefine((value, errorQueue) => {
		if (value <= 0 || value >= maximum) {
			errorQueue.addIssue({
				code: z.ZodIssueCode.custom,
				message: `${PART_OUT_OF_RANGE_MESSAGE} ${maximum} expected`
			});
		}
		// Others validations if required...
	});

const partVendorSchema = z.object({
	// Particular constraints should be added instead of .min(1) each case.
	uuid: z.string().trim().uuid(),
	name: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	cost: z.number().min(0.1).max(PART_COST_LAYOUT_CONSTRAINT)
});

const partLocationSchema = z.object({
	// Particular constraints should be added instead of .min(1) each case.
	uuid: z.string().trim().uuid(),
	name: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	quantity: createPositiveNumberSchema(PART_QUANTITY_LAYOUT_CONSTRAINT),
	unit: z.enum(PART_UNIT_LAYOUT_CONSTRAINT)
});

export const PartDetailSchema = z.object({
	// Particular constraints should be added instead of .min(1) each case.
	name: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	upc: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	description: z.string().trim().min(1, PART_STRING_TOO_SMALL_MESSAGE),
	number: createPositiveNumberSchema(PART_NUMBER_LAYOUT_CONSTRAINT),
	criticalQty: createPositiveNumberSchema(PART_QTY_LAYOUT_CONSTRAINT)
});

export const PartCustomizationSchema = PartDetailSchema.extend({
	categories: z.string().trim().array(),
	vendors: partVendorSchema.array().default([createDefaultPartVendor()]),
	locations: partLocationSchema.array().default([createDefaultPartLocation()])
});

// Type safety.
export type partVendorType = z.infer<typeof partVendorSchema>;
export type partLocationType = z.infer<typeof partLocationSchema>;
export type PartCreationType = z.infer<typeof PartCustomizationSchema>;
