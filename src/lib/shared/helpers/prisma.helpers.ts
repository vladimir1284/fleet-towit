import { Prisma } from '@prisma/client';
import { SKIP_PAGINATION_PARAMETER, TAKE_PAGINATION_PARAMETER, PRISMA_SEARCH_INPUT_TYPE } from '.';

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

/**
 * Docs needed, complete it later.
 */

export const buildPrismaSearchInput = <T>(params: { query: URL; model: T }) => {
	type typedModel = typeof params.model;
	type PrismaSearchInput = Prisma.Args<typedModel, typeof PRISMA_SEARCH_INPUT_TYPE>;

	// Generic part retrieval.
	const prismaSearchInput = {
		// Pagination params.
		skip: SKIP_PAGINATION_PARAMETER,
		take: TAKE_PAGINATION_PARAMETER,
		orderBy: [],
		// Constraint params.
		where: {}
	} as PrismaSearchInput;

	for (const [key, value] of params.query.searchParams.entries()) {
		const parsedSearchParam = JSON.parse(value);
		const isSafePositiveNumber = /^(0|[1-9]\d*)$/.test(value);

		if (key in prismaSearchInput) {
			const literalKey = key as keyof typeof prismaSearchInput;

			// Conditional assignment.
			switch (prismaSearchInput[literalKey].constructor) {
				case Number:
					if (isSafePositiveNumber) {
						prismaSearchInput[literalKey] = parsedSearchParam;
					}
					break;
				case Array:
					(prismaSearchInput[literalKey] as object[]).push(parsedSearchParam);
					break;
				default:
					prismaSearchInput[literalKey] = {
						...(prismaSearchInput[literalKey] as object),
						...parsedSearchParam
					};
					break;
			}
		}
	}
	return prismaSearchInput;
};
