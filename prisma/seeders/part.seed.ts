import debug from 'debug';
import { randomInt, randomBytes } from 'crypto';

import type { ExtendedBypassPrismaClient } from '../../src/lib/prisma';

// Create custom logger on seed level.
const seedLogger = debug('app:seed');

// Constants.
const SEED_PROCESS_MAX_INTEGER = 100;
const NUMBER_OF_PARTS_PER_TENANT = 10;

const units = ['Foot', 'Gallon', 'Inch', 'Pound', 'Quart', 'Set'];

const seedParts = async (prisma: ExtendedBypassPrismaClient, tenantsId: number[]) => {
	// Parts.
	seedLogger('Seeding parts data...');
	for (const tenantId of tenantsId) {
		for (let i = 0; i < NUMBER_OF_PARTS_PER_TENANT; i++) {
			await prisma.part.create({
				data: {
					name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
					criticalQty: randomInt(SEED_PROCESS_MAX_INTEGER),
					number: randomInt(SEED_PROCESS_MAX_INTEGER),
					description: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
					upc: randomInt(SEED_PROCESS_MAX_INTEGER),
					tenantId: tenantId,
					categories: {
						create: [
							{
								category: {
									create: {
										name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
										tenantId
									}
								}
							},
							{
								category: {
									create: {
										name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
										tenantId
									}
								}
							}
						]
					},
					locations: {
						create: [
							{
								quantity: randomInt(SEED_PROCESS_MAX_INTEGER),
								unit: units[randomInt(units.length)],
								Location: {
									create: {
										name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
										tenantId
									}
								}
							},
							{
								quantity: randomInt(SEED_PROCESS_MAX_INTEGER),
								unit: units[randomInt(units.length)],
								Location: {
									create: {
										name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
										tenantId
									}
								}
							}
						]
					},
					vendors: {
						create: [
							{
								cost: randomInt(SEED_PROCESS_MAX_INTEGER),
								vendor: {
									create: {
										name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
										tenantId
									}
								}
							},
							{
								cost: randomInt(SEED_PROCESS_MAX_INTEGER),
								vendor: {
									create: {
										name: randomBytes(SEED_PROCESS_MAX_INTEGER / 5).toString('hex'),
										tenantId
									}
								}
							}
						]
					}
				}
			});
		}
	}
	seedLogger('Part seeding complete!');
};

export default seedParts;
