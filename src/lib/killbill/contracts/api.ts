import { SubscriptionApi } from '../api/apis';
import { apiConfig } from '../config';

export function getSubscriptionApi(): SubscriptionApi {
	return new SubscriptionApi(apiConfig);
}
