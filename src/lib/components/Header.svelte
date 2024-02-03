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

	// -- STATES -- //

	let description = '';
	let isLoading = false;

	// -- UTILS -- //

	const handleSubmit = async () => {
		if (!description) return;

		isLoading = true;

		try {
			await pb.collection<Todo>('todos').create({
				description,
				created: new Date(),
			});
			await refreshTodos({ silent: true });

			description = '';

			toast.success('Todo added successfully!', TOAST_OPTIONS);
		} catch (error: any) {
			toast.error(error.message, TOAST_OPTIONS);
		}

		isLoading = false;
	};
</script>

<header class="bg-emerald-200">
	<div class="container mx-auto flex flex-col gap-4 p-4">
		<!-- HEADING -->
		<h1 class="py-2 text-center text-3xl">Todo Application</h1>

		<hr class="border-emerald-300" />

		<!-- TODO ADDER -->
		<form class="flex flex-col gap-4 sm:flex-row" on:submit|preventDefault={handleSubmit}>
			<input
				class="h-10 flex-grow rounded-md border border-emerald-300 bg-emerald-100 px-3 text-sm ring-emerald-600/60 ring-offset-1 ring-offset-transparent focus-visible:outline-none focus-visible:ring-1"
				type="text"
				placeholder="Description..."
				bind:value={description}
			/>
			<button
				class="flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white shadow-md hover:bg-emerald-700"
				disabled={!description || isLoading}
			>
				{#if isLoading}
					<i class="ph-bold ph-spinner animate-spin"></i>
					Loading
				{:else}
					Add Todo
				{/if}
			</button>
		</form>
	</div>
</header>
