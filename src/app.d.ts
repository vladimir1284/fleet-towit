// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { PrismaClient } from '@prisma/client';
declare global {
	namespace App {
		interface Locals {
			currentInstance: {
				currentTenant: string;
				currentTenantUser: string;
				currentPrismaClient: PrismaClient;
			};
		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
