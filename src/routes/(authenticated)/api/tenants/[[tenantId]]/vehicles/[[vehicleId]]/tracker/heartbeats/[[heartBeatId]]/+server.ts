import type { RequestHandler } from "@sveltejs/kit";
import { getAllHeartBeatsByTrackerId, addHeartBeat, deleteHeartBeat, getTrackerByVehicleId } from "$lib/actions/trackers";
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';

const heartBeatSchema = z.object({
    longitude: z.number(),
    latitude: z.number(),
    timestamp: z.date(),
})


export const GET: RequestHandler = async({locals, params}) => {
    const instance = locals.currentInstance.currentPrismaClient;
    if (params.vehicleId) {
        const tracker = await getTrackerByVehicleId(instance, {
            vehicleId: parseInt(params.vehicleId)
        })
        const heartBeats = await getAllHeartBeatsByTrackerId(instance, {
            trackerId: tracker?.id || 0 
        })
        return new Response(JSON.stringify(heartBeats), {status: 200})
    } else {
        return new Response("Invalid Request", {status: 400})
    }
}

export const POST: RequestHandler = async({locals, params, request}) => {
    const instance = locals.currentInstance.currentPrismaClient;

    const formData = await request.formData();
    const form = await superValidate(formData, zod(heartBeatSchema));
    if (!form.valid) {
        return actionResult('failure', {form}, {status: 400})
    }
    if (!params.vehicleId) {
        return actionResult('failure', {form}, {status: 400})
    } else {
        const tracker = await getTrackerByVehicleId(instance, {
            vehicleId: parseInt(params.vehicleId)
        })
        await addHeartBeat(instance, {
            lat: form.data.latitude,
            long: form.data.longitude,
            timestamp: form.data.timestamp,
            trackerId: tracker?.id || 0
        })
        return actionResult('success', {form}, {status: 200})
    }
}

export const DELETE: RequestHandler = async({locals, params}) => {
    const instance = locals.currentInstance.currentPrismaClient;

    if(!(params.vehicleId && params.heartBeatId)) {
        return new Response("Invalid Request", {status: 400})
    } else {
        await deleteHeartBeat(instance, {
            id: parseInt(params.heartBeatId)
        })
        return new Response("Deleted", {status: 200})
    }
}