//@ts-nocheck

import path from 'path';
import type { PageServerLoad } from '../../../$types';
import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';
//import { TableSolid, ImageSolid, BookSolid, ChartSolid, EyeSolid } from 'flowbite-svelte-icons'

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params, fetch }) => {
	const vin = params.vin;

	return { vin };
};
