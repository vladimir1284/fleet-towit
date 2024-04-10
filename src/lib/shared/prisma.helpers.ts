/**
 * Docs needed, complete it later.
 */

export const exclude = <Model, Key extends keyof Model>(
	model: Model,
	keys: Key[]
	// Valid UntaintedModel type.
): Omit<Model, Key> => {
	return Object.fromEntries(
		Object.entries(<object>model).filter(([key]) => !keys.includes(<Key>key))
	) as Omit<Model, Key>; // Valid UntaintedModel type.
};
