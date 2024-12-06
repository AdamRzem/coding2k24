<script lang="ts">
	import '../app.css';
	import Map from '$lib/components/Map.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />

<style>
	:global(html) {
		transition: background-color 0.3s, color 0.3s;
	}
	:global(html.dark) {
		background-color: #1a202c;
		color: #a0aec0;
	}
	:global(html.light) {
		background-color: #f7fafc;
		color: #2d3748;
	}
</style>

{@render children()} 


	<footer class="bg-slate-100 dark:bg-gray-800 p-4 text-white text-center relative bottom-0 mt-2.5">
		<Map />
	</footer>