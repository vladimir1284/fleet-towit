export const load = async (event) => {
	// Fetch trailers.
	const trailerResponse = await event.fetch('/api/vehicles');
	// Destructure trailers from response.
	const { data: initialTrailers } = await trailerResponse.json();
	console.log(initialTrailers);
	return {
		initialTrailers
	};
};

// Vehicle-related actions.
export const actions = {};
