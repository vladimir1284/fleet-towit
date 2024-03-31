import { bypassPrisma } from '$lib/prisma';
import type { Note, User } from '$lib/zod';

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

export const getContractNotes = async (id: number): Promise<Array<NoteResult>> => {
	return await bypassPrisma.note.findMany({
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

export const pushNote = async ({
	id,
	contractId,
	userId,
	subject,
	body,
	remainder,
	file
}: NoteType): Promise<Note> => {
	if (id) {
		return await bypassPrisma.note.update({
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
	}
	return await bypassPrisma.note.create({
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
};

export const deleteNote = async (id: number) => {
	return await bypassPrisma.note.delete({
		where: {
			id: id
		}
	});
};
