// IMPORTED TYPES
import type { Todo, TodoFilter } from '$lib/types';
// IMPORTED CONSTANTS
import { TOAST_OPTIONS } from '$lib/constants';
// IMPORTED DEP-UTILS
import toast from 'svelte-french-toast';
import { get, writable } from 'svelte/store';
// IMPORTED UTILS
import { pb } from '$lib/pb';

// -- STORES -- //

export const todos = writable<Todo[]>([]);
export const todoFilter = writable<TodoFilter>('all');
export const isLoading = writable<boolean>(false);
export const todosStores = { todos, todoFilter, isLoading };

// -- UTILS -- //

export const refreshTodos = async ({ silent } = { silent: false }) => {
	try {
		const todoFilter = get(todosStores.todoFilter);

		const records = await pb.collection<Todo>('todos').getFullList({
			sort: '-created',
			filter: todoFilter === 'all' ? '' : `isCompleted = ${todoFilter === 'completed'}`,
		});
		todos.set(records);

		if (!silent) toast.success('Todos refreshed successfully!', TOAST_OPTIONS);
	} catch (error: any) {
		toast.error(error.message, TOAST_OPTIONS);
	}
};

export const filterAll = async () => {
	todoFilter.set('all');
	await refreshTodos({ silent: true });
    toast.success('Filtered all todos!', TOAST_OPTIONS);
};

export const filterCompleted = async () => {
	todoFilter.set('completed');
	await refreshTodos({ silent: true });
    toast.success('Filtered completed todos!', TOAST_OPTIONS);
};

export const filterOngoing = async () => {
	todoFilter.set('ongoing');
	await refreshTodos({ silent: true });
    toast.success('Filtered ongoing todos!', TOAST_OPTIONS);
};
