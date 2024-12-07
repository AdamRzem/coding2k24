<script lang="ts">
   import { onMount } from "svelte";
    import type { PageData, PageServerData } from "./$types";

  let {data}:{data:PageServerData}=$props()
  onMount(() => {
        const audio = new Audio('NagraniaCoding/Home.mp3'); // Upewnij się, że ścieżka do pliku jest poprawna
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    });
</script>

<h1>Data from PostgreSQL</h1>

{data.read.temp}
{data.read.humid}
