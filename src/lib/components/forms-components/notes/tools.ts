export interface WithFile {
	file: string | null | undefined;
}

export const getNoteFileName = (note: WithFile | null | undefined): string => {
	if (!note || !note.file) return '';

	const s = note.file.split('/');
	return s[s.length - 1];
};
