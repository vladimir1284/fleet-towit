export function saveToSessionStorage(key: string, value: unknown) {
	sessionStorage.setItem(key, JSON.stringify(value));
}

export function loadFromSessionStorage(key: string) {
	const value = sessionStorage.getItem(key);
	return value ? JSON.parse(value) : undefined;
}
