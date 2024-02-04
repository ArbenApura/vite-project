<script lang="ts">
	// IMPORTED STORES
	import {
		filterAll,
		filterCompleted,
		filterOngoing,
		isLoading,
		refreshTodos,
		todoFilter,
		todos,
	} from '$lib/stores/todos';
	// IMPORTED COMPONENTS
	import Header from '$lib/components/Header.svelte';
	import TodoItem from '$lib/components/TodoItem.svelte';
</script>

<Header />

<main class="container mx-auto flex flex-col gap-4 p-4">
	<section class="flex flex-col items-center gap-4 sm:flex-row">
		<div class="flex flex-grow items-center gap-4">
			<h2 class="text-xl">{$todos.length} Todo{$todos.length !== 1 ? 's' : ''}</h2>
			<button
				class="flex h-9 w-9 items-center justify-center rounded-md border bg-white hover:bg-gray-100"
				disabled={$isLoading}
				on:click={() => refreshTodos()}
			>
				<i class="ph-bold ph-{$isLoading ? 'spinner animate-spin' : 'arrow-clockwise'}"></i>
			</button>
		</div>

		<!-- TABS -->
		<div class="bg-border flex overflow-hidden rounded-md border text-sm shadow-md">
			<button
				class="h-9 border-r bg-white px-2 hover:bg-gray-100
					{$todoFilter === 'all' ? 'font-bold text-emerald-600' : 'text-gray-400'}"
				on:click={filterAll}
			>
				All
			</button>
			<button
				class="h-9 border-r bg-white px-2 hover:bg-gray-100
					{$todoFilter === 'completed' ? 'font-bold text-emerald-600' : 'text-gray-400'}"
				on:click={filterCompleted}
			>
				Completed
			</button>
			<button
				class="h-9 bg-white px-2 hover:bg-gray-100
					{$todoFilter === 'ongoing' ? 'font-bold text-emerald-600' : 'text-gray-400'}"
				on:click={filterOngoing}
			>
				Ongoing
			</button>
		</div>
	</section>

	<section class="overflow-hidden rounded-md border border-emerald-200 bg-emerald-200">
		<!-- TODO LIST -->
		<ul class="flex flex-col gap-[1px]">
			{#each $todos as todo (todo.id)}
				<TodoItem {todo} />
			{/each}
		</ul>
	</section>
</main>
