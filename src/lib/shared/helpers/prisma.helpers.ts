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

export const buildFindManyInput = <T>(params: { query: URL; model: T }) => {
	type typedModel = typeof params.model;
	type PrismaFindManyInput = Prisma.Args<typedModel, typeof PRISMA_SEARCH_INPUT_TYPE>;

	// Generic prisma retrieval.
	const prismaFindManyInput = {
		// Pagination params.
		skip: SKIP_PAGINATION_PARAMETER,
		take: TAKE_PAGINATION_PARAMETER,
		orderBy: [],
		// Constraint param.
		where: {}
	} as PrismaFindManyInput;

	for (const [key, value] of params.query.searchParams.entries()) {
		const parsedSearchParam = JSON.parse(value);
		const isSafePositiveNumber = /^(0|[1-9]\d*)$/.test(value);

		if (key in prismaFindManyInput) {
			const literalKey = key as keyof typeof prismaFindManyInput;

			// Conditional assignment.
			switch (prismaFindManyInput[literalKey].constructor) {
				case Number:
					if (isSafePositiveNumber) {
						prismaFindManyInput[literalKey] = parsedSearchParam;
					}
					break;
				case Array:
					(prismaFindManyInput[literalKey] as object[]).push(parsedSearchParam);
					break;
				default:
					prismaFindManyInput[literalKey] = {
						...(prismaFindManyInput[literalKey] as object),
						...parsedSearchParam
					};
					break;
			}
		}
	}
	return prismaFindManyInput;
};
