// IMPORTED DEP-TYPES
import type { LayoutServerLoad } from './$types';
// IMPORTED TYPES
import type { Todo } from '$lib/types';
// IMPORTED UTILS
import { pb } from '$lib/pb';

export const load: LayoutServerLoad = async () => {
	return {
		todos: await pb.collection<Todo>('todos').getFullList({
			sort: '-created'
		}),
	};
};
