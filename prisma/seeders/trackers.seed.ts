import { faker } from '@faker-js/faker';

const seedTracker = async(
    prisma,
    createdVehiclesIds: number[], 
) => {
    console.log('seeding trackers data')

    const generateHeartBeat = (trackerId: number) => {
        const fakeLoc = faker.location.nearbyGPSCoordinate({origin: [39.8283, -98.5795], radius: 1000})
        return {
            timeStamp: faker.date.recent(),
            latitude: fakeLoc[0],
            longitude: fakeLoc[1],
            tracker: {
                connect: {
                    id: trackerId
                }
            }
        }
    }

    const generateTracker = (c: number) => ({
        vehicle: {
            connect: {
                id: faker.helpers.arrayElement(createdVehiclesIds)
            }
        },
        name: 'Tracker#'+c,
    })
    const numberOfTrackers = 15;
	for (let i = 0; i < numberOfTrackers; i++) {
		const tracker = await prisma.tracker.create({
			    data: generateTracker(i)
		});
        const numberOfHeartBeats = faker.number.int({max: 7})
        for (let j = 0; j < numberOfHeartBeats; j++) {
            await prisma.trackerHeartBeatData.create({
                data: generateHeartBeat(tracker.id)
            })
        }
	}

	console.log('Seeding complete!');

}

export default seedTracker