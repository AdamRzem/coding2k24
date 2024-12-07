<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1 class="text-2xl font-bold mb-4">Login/Register</h1>
<form method='post' action='?/login' use:enhance class="space-y-4 align-middle">
	<div>
		<label class="block text-sm font-medium light:text-gray-700 dark:text-white">
			Username
			<input name='username' class="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
		</label>
	</div>
	<div>
		<label class="block text-sm font-medium light:text-gray-700 dark:text-white">
			Password
			<input type='password' name='password' class="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
		</label>
	</div>
	<div class="flex space-x-4">
		<button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
		<button formaction='?/register' class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Register</button>
	</div>
</form>
<p class='text-red-500 mt-4'>{form?.message ?? ''}</p>
