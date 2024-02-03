<script>
	// IMPORTED STORES
	import { todos } from '$lib/stores/todos';
	// IMPORTED DEP-COMPONENTS
	import { Toaster } from 'svelte-french-toast';
	// IMPORTED STYLES
	import '$lib/styles/index.scss';

	// -- PROPS -- //

	export let data;

	if (data.todos) todos.set(data.todos);
</script>

<slot />

<Toaster />
