// IMPORTED DEP-TYPES
import type { RequestHandler } from './$types';
// IMPORTED LIB-UTILS
import { json } from '@sveltejs/kit';
// IMPORTED UTILS
import { pb } from '$lib/pb';

export const GET: RequestHandler = async () => {
	const todos = await pb.collection('todos').getFullList();

	return json({ todos });
};
