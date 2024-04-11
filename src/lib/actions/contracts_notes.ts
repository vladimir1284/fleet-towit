import type { Note, User } from '$lib/zod';
import type { PrismaClient } from '@prisma/client';

type NoteType = {
	id?: number;
	contractId: number;
	userId: string;

	subject: string;
	body: string;

	remainder?: Date;
	file?: string;
};

export interface NoteResult {
	user: User;

	Subject: string;
	Body: string;

	createdDate: Date;
	remainder: Date | null;

	file: string | null;
}

export const getContractNotes = async (
	instance: PrismaClient,
	id: number
): Promise<Array<NoteResult>> => {
	return await instance.note.findMany({
		where: {
			contractId: id
		},
		include: {
			user: true
		},
		orderBy: {
			createdDate: 'desc'
		}
	});
};

export const pushNote = async (
	instance: PrismaClient,
	{ id, contractId, userId, subject, body, remainder, file }: NoteType
): Promise<Note> => {
	let note;

	if (id) {
		note = await instance.note.update({
			where: {
				id: id
			},
			data: {
				// contractId,
				// userId,
				// createdDate: new Date(),
				Subject: subject,
				Body: body,
				remainder,
				file
			}
		});
	} else {
		note = await instance.note.create({
			data: {
				contractId,
				userId,
				Subject: subject,
				Body: body,
				remainder,
				file,
				createdDate: new Date()
			}
		});
	}

	return note;
};

export const deleteNote = async (instance: PrismaClient, id: number) => {
	return await instance.note.delete({
		where: {
			id: id
		}
	});
};
