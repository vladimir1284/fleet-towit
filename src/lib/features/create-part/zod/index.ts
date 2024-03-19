import { z } from 'zod';

import {
	PART_OUT_OF_RANGE_MESSAGE,
	PART_INVALID_NUMBER_MESSAGE,
	// Constraints.
	PART_QTY_LAYOUT_CONSTRAINT,
	PART_COST_LAYOUT_CONSTRAINT,
	PART_UNIT_LAYOUT_CONSTRAINT,
	PART_NUMBER_LAYOUT_CONSTRAINT,
	PART_QUANTITY_LAYOUT_CONSTRAINT
	// Others if required...
} from '$lib/features/create-part/helpers';

const createNumberLikeSchema = (maximum: number) =>
	z.string().superRefine((value, errorQueue) => {
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
					message: `${PART_OUT_OF_RANGE_MESSAGE} ${maximum}`
				});
			}
		}
	});

const partVendorSchema = z.object({
	// Particular constraints must be added instead of .min(1) each case.
	uuid: z.string().uuid(),
	name: z.string().min(1),
	cost: createNumberLikeSchema(PART_COST_LAYOUT_CONSTRAINT)
});

const partLocationSchema = z.object({
	// Particular constraints must be added instead of .min(1) each case.
	uuid: z.string().uuid(),
	name: z.string().min(1),
	// Constant required.
	quantity: createNumberLikeSchema(PART_QUANTITY_LAYOUT_CONSTRAINT),
	unit: z.enum(PART_UNIT_LAYOUT_CONSTRAINT)
});

export const PartDetailSchema = z.object({
	// Particular constraints must be added instead of .min(1) each case.
	name: z.string().trim().min(1),
	upc: z.string().trim().min(1),
	description: z.string().min(1),
	number: createNumberLikeSchema(PART_NUMBER_LAYOUT_CONSTRAINT),
	criticalQty: createNumberLikeSchema(PART_QTY_LAYOUT_CONSTRAINT)
});

export const PartCustomizationSchema = PartDetailSchema.extend({
	categories: z.string().array(),
	vendors: partVendorSchema.array(),
	locations: partLocationSchema.array()
});

// Type safety.
export type PartCreationType = z.infer<typeof PartCustomizationSchema>;
export type partVendorType = z.infer<typeof partVendorSchema>;
export type partLocationType = z.infer<typeof partLocationSchema>;
