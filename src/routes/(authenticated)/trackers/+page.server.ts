import type { PageServerLoad } from "./$types";
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from "zod";

const trackerSchema = z.object({
    name: z.string()
})

const heartBeatSchema = z.object({
    longitude: z.number(),
    latitude: z.number(),
    timestamp: z.date(),
})

export const load: PageServerLoad = async() => {
    const form = await superValidate(zod(trackerSchema));
    const heartBeatForm = await superValidate(zod(heartBeatSchema))
    return { form, heartBeatForm }
}