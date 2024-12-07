<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { PageData, PageServerData } from "./$types";

    let { data }: { data: PageServerData } = $props();

    let audio: HTMLAudioElement | null = null;

    onMount(() => {
        // Tworzymy obiekt Audio
        audio = new Audio('NagraniaCoding/Home.mp3'); // Upewnij się, że ścieżka do pliku jest poprawna
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    });

    onDestroy(() => {
        // Zatrzymujemy i usuwamy obiekt Audio, gdy komponent jest niszczony
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Resetujemy odtwarzanie
            audio = null;
        }
    });
</script>

<div class="p-4 light:bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md mt-4 ml-3 mr-3">
    <p class="text-xl font-semibold">Temperature: {data.read.temp}°C</p>
    <p class="text-xl font-semibold">Humidity: {data.read.humid}%</p>
</div>
