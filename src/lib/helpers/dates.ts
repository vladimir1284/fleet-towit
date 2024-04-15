export function formatTimelineDate(date: Date | string) {
	if (!date) return undefined;

	return new Date(date).toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/**
 * Formats the date according to the specified format.
 * @param {string} date - The date in string format (e.g., '2024-03-29').
 * @param {string} format - The desired output format (e.g., 'DDMMYYYY HH:mm:ss').
 * @returns {string} The formatted date.
 * @throws {Error} If the provided date is invalid.
 */
export function formatStringDate(date: string | Date, format: string = 'YYYY-MM-DD'): string {
	const dateObj = typeof date == 'string' ? new Date(date) : date;

	if (isNaN(dateObj.getTime())) {
		throw new Error('Invalid Date');
	}

	const day = String(dateObj.getDate()).padStart(2, '0');
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const year = String(dateObj.getFullYear());
	const hours = String(dateObj.getHours()).padStart(2, '0');
	const minutes = String(dateObj.getMinutes()).padStart(2, '0');
	const seconds = String(dateObj.getSeconds()).padStart(2, '0');

	const formattedDate: string = format
		.replace('DD', day)
		.replace('MM', month)
		.replace('YYYY', year)
		.replace('HH', hours)
		.replace('mm', minutes)
		.replace('ss', seconds)
		.replace('dd', day)
		.replace('mm', month)
		.replace('yy', year.slice(2))
		.replace('hh', hours);

	return formattedDate;
}

/**
 * Formats the given date into a human-readable relative time format.
 * @param date The date to format.
 * @returns A human-readable relative time format string.
 */
export function dateForHumans(date: string | Date): string {
	const dateObj = typeof date == 'string' ? new Date(date) : date;

	if (isNaN(dateObj.getTime())) {
		throw new Error('Invalid Date');
	}

	const now = Date.now();
	const diff = now - dateObj.getTime();
	const intervals = [
		{ label: 'year', seconds: 31536000 },
		{ label: 'month', seconds: 2592000 },
		{ label: 'week', seconds: 604800 },
		{ label: 'day', seconds: 86400 },
		{ label: 'hour', seconds: 3600 },
		{ label: 'minute', seconds: 60 },
		{ label: 'second', seconds: 1 }
	];

	if (diff < 5000) return 'right now'; // 5 seconds
	else if (diff > 94608000) return 'long time ago'; // 3 years
	else {
		for (const interval of intervals) {
			const count = Math.floor(diff / interval.seconds);
			console.log(count);
			if (count >= 2) {
				return `${count} ${interval.label}s ago`;
			} else if (count === 1) {
				return `1 ${interval.label} ago`;
			}
		}
	}
	return 'error in the function';
}
