export function getPlanName(planName: string): string {
	return planName.toLowerCase().replace(/ /g, '-');
}
