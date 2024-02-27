import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { z } from "zod";

const fixSchema = z.object({
    clientId: z.number(),
    rentalPlanId: z.number(),
    vehicleId: z.number(),
    id: z.number().optional()
});

const stageSchema = z.object({
    date: z.date(),
    reason: z.string().optional(),
    comments: z.string().optional(),
    stage: z.enum(["PENDING", "ACTIVE", "ENDED", "DISMISS"]),
    id: z.number().optional()
});

export const load = (async () => {
    const form = await superValidate(fixSchema);
    const stageForm = await superValidate(stageSchema);

    return { form: form, stageForm: stageForm };
}) satisfies PageServerLoad;