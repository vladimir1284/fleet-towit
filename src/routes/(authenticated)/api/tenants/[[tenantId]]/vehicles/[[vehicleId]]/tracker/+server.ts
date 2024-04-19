import type { RequestHandler } from "@sveltejs/kit";
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';
import { getAllTrackers, createTracker, editTracker, deleteTracker, getTrackerByVehicleId } from "$lib/actions/trackers";

const trackerSchema = z.object({
    name: z.string()
})

export const GET: RequestHandler = async({locals, params}) => {
    const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
    const instance = locals.currentInstance.currentPrismaClient;

    if (!params.vehicleId) {
        const trackers = await getAllTrackers(instance)
        return new Response(JSON.stringify(trackers))
    } else {
        const tracker = await getTrackerByVehicleId(instance, {
            vehicleId: parseInt(params.vehicleId)
        })
        return new Response(JSON.stringify(tracker), {status: 200})
    }
}

export const POST: RequestHandler = async({locals, params, request}) => {
    const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
    const instance = locals.currentInstance.currentPrismaClient;

    const formData = await request.formData()
    const form = await superValidate(formData, zod(trackerSchema))
    if (!form.valid) {
        return actionResult('failure', {form}, {status: 400})
    }
    if(!params.vehicleId) {
        return actionResult('failure', {form}, {status: 400})
    } else {
        const tracker = await getTrackerByVehicleId(instance, {
            vehicleId: parseInt(params.vehicleId)
        })
        if (!tracker) {
            await createTracker(instance, {
                name: form.data.name,
                vehicleId: parseInt(params.vehicleId),
            })
            return actionResult('success', {form}, {status: 200})
        } else {
            await editTracker(instance, {
                id: tracker.id,
                name: form.data.name
            })
            return actionResult('success', {form}, {status:200})
        }
    }
}

export const DELETE: RequestHandler = async({locals, params}) => {
    const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
    const instance = locals.currentInstance.currentPrismaClient;
    if(params.vehicleId) {
        await deleteTracker(instance, {
            id: parseInt(params.vehicleId)
        })
        return new Response("Deleted", {status: 200})
    } else {
        return new Response("Invalid Request", {status: 400})
    }
}
