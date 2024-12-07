<script lang="ts">
  import 'flowbite-svelte';
  export let data: { [key: string]: any }[];
</script>

<h1>Data from PostgreSQL</h1>
{#if data.length > 0}
  <ul>
    {#each data as item}
      <li>{item}</li>
    {/each}
  </ul>
{:else}
  <p>No data available.</p>
{/if}
