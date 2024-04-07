import type { PrismaClient } from "@prisma/client"

type trackerType = {name: string, vehicleId: number}
type editTrackerType = {id: number, name: string}
type heartBeatType = {lat: number, long: number, timestamp: Date, trackerId: number}

export const createTracker = async(instance: PrismaClient, {name, vehicleId}: trackerType) => {
    const tracker = await instance.tracker.create({
        data: { name, vehicleId }
    });
    return tracker
}

export const editTracker = async(instance: PrismaClient, {id, name}: editTrackerType) => {
    await instance.tracker.update({
        where: { id },
        data: { name }
    })
}

export const deleteTracker = async(instance: PrismaClient, {id}: {id: number}) => {
    await instance.tracker.delete({
        where: { 
            vehicleId: id
         }
    })
}

export const getAllTrackers = async(instance: PrismaClient) => {
    const trackers = await instance.tracker.findMany({
        include: {
            vehicle: true,
            heartBeats: { orderBy: { timeStamp: 'desc' } }
        }
    });
    return trackers
}

export const getTrackerByVehicleId = async(instance: PrismaClient, {vehicleId}: {vehicleId: number}) => {
    const tracker = await instance.tracker.findUnique({
        where: {vehicleId},
    })
    return tracker
}

export const getAllHeartBeatsByTrackerId = async(instance: PrismaClient, {trackerId}:{trackerId: number}) => {
    const heartBeats = await instance.trackerHeartBeatData.findMany({
        where: { trackerId },
        orderBy: { timeStamp: 'desc' }
    });
    return heartBeats
}

export const addHeartBeat = async(instance: PrismaClient, {lat, long, timestamp, trackerId}: heartBeatType) => {
    const heartBeat = instance.trackerHeartBeatData.create({
        data: {
            latitude: lat,
            longitude: long,
            timeStamp: timestamp,
            trackerId
        }
    });
    return heartBeat
}

export const deleteHeartBeat = async(instance: PrismaClient, {id}:{id: number}) => {
    await instance.trackerHeartBeatData.delete({
        where: {id}
    })
}
