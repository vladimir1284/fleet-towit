import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const formID = params.id;

	// Obtener el formulario para empesar agregar campos
	// Si el formulario no existe mostrar 404
}
