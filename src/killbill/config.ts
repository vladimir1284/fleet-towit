import { PrismaClient } from '@prisma/client';
import { Configuration, type ConfigurationParameters, type HTTPHeaders } from './api/runtime';

const KILLBILL_BASE_URL = 'http://killbill.towithouston.com';
const KILLBILL_USERNAME = 'admin';
const KILLBILL_PASSWORD = 'password';
const KILLBILL_API_KEY = 'test2';
const KILLBILL_API_SECRET = 'secret';

const KILLBILL_API_KEY2 = 't_test';
const KILLBILL_API_SECRET2 = 'CzjU~009BxA\\';

// export const config = {
// 	basePath: KILLBILL_BASE_URL,
// 	apiKey: (name: string) => {
// 		// X-Killbill-ApiKey
// 		// X-Killbill-ApiSecret
// 		if (name == 'X-Killbill-ApiSecret') return KILLBILL_API_SECRET;
// 		return KILLBILL_API_KEY;
// 	},
// 	username: KILLBILL_USERNAME,
// 	password: KILLBILL_PASSWORD
// };

export class Config implements ConfigurationParameters {
	constructor(
		private ApiKey?: string,
		private ApiSecret?: string
	) {}

	get basePath(): string {
		return KILLBILL_BASE_URL;
	}

	get username(): string {
		return KILLBILL_USERNAME;
	}

	get password(): string {
		return KILLBILL_PASSWORD;
	}

	apiKey(name: string): string {
		// X-Killbill-ApiKey
		// X-Killbill-ApiSecret
		if (name == 'X-Killbill-ApiSecret') {
			if (this.ApiSecret) {
				return this.ApiSecret;
			}
			return KILLBILL_API_SECRET;
		}

		if (this.ApiKey) {
			return this.ApiKey;
		}
		return KILLBILL_API_KEY;
	}
}

export class Config2 implements ConfigurationParameters {
	constructor(
		private ApiKey?: string,
		private ApiSecret?: string
	) {}

	get basePath(): string {
		return KILLBILL_BASE_URL;
	}

	get username(): string {
		return KILLBILL_USERNAME;
	}

	get password(): string {
		return KILLBILL_PASSWORD;
	}

	apiKey(name: string): string {
		// X-Killbill-ApiKey
		// X-Killbill-ApiSecret
		if (name == 'X-Killbill-ApiSecret') {
			if (this.ApiSecret) {
				return this.ApiSecret;
			}
			return KILLBILL_API_SECRET2;
		}

		if (this.ApiKey) {
			return this.ApiKey;
		}
		return KILLBILL_API_KEY2;
	}
}

export const apiConfig = new Configuration(new Config());
export const apiConfig2 = new Configuration(new Config2());

export const pris = new PrismaClient();
