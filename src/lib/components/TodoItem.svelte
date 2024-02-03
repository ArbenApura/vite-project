<script lang="ts">
	// IMPORTED TYPES
	import type { Todo } from '$lib/types';
	// IMPORTED CONSTANTS
	import { TOAST_OPTIONS } from '$lib/constants';
	// IMPORTED STORES
	import { refreshTodos } from '$lib/stores/todos';
	// IMPORTED DEP-UTILS
	import toast from 'svelte-french-toast';
	// IMPORTED UTILS
	import { pb } from '$lib/pb';

	// -- REQUIRED PROPS -- //

	export let todo: Todo;

	// -- STATES -- //

	let isLoading = false;

	// -- UTILS -- //

	export const handleComplete = async () => {
		isLoading = true;

		try {
			await pb.collection<Todo>('todos').update(todo.id, { isCompleted: true });
			await refreshTodos({ silent: true });

			toast.success('Todo marked as completed!', TOAST_OPTIONS);
		} catch (error: any) {
			toast.error(error.message, TOAST_OPTIONS);
		}

		isLoading = false;
	};

	export const handleUndo = async () => {
		isLoading = true;

		try {
			await pb.collection<Todo>('todos').update(todo.id, { isCompleted: false });
			await refreshTodos({ silent: true });

			toast.success('Todo marked as incomplete!', TOAST_OPTIONS);
		} catch (error: any) {
			toast.error(error.message, TOAST_OPTIONS);
		}

		isLoading = false;
	};

	export const handleDelete = async () => {
		isLoading = true;

		try {
			await pb.collection<Todo>('todos').delete(todo.id);
			await refreshTodos({ silent: true });

			toast.success('Todo deleted successfully!', TOAST_OPTIONS);
		} catch (error: any) {
			toast.error(error.message, TOAST_OPTIONS);
		}

		isLoading = false;
	};
</script>

<li
	class="flex gap-2 border-l-4 bg-white p-4 text-left
        {todo.isCompleted ? 'border-emerald-600' : 'border-blue-600'}"
>
	<p class="flex flex-grow items-center">{todo.description}</p>

	{#if todo.isCompleted}
		<!-- UNDO BUTTON -->
		<button
			class="hover:bg-blue-600 hover:text-white"
			disabled={isLoading}
			on:click={handleUndo}
		>
			<i class="ph-bold ph-arrow-counter-clockwise"></i>
		</button>
	{:else}
		<!-- COMPLETE BUTTON -->
		<button
			class="hover:bg-emerald-600 hover:text-white"
			disabled={isLoading}
			on:click={handleComplete}
		>
			<i class="ph-bold ph-check"></i>
		</button>
	{/if}

	<!-- DELETE BUTTON -->
	<button class="hover:bg-rose-600 hover:text-white" on:click={handleDelete} disabled={isLoading}>
		<i class="ph-bold ph-trash"></i>
	</button>
</li>

<style lang="scss">
	button {
		@apply flex h-10 w-10 items-center justify-center rounded-md border shadow-md transition-[background-color];
	}
</style>
