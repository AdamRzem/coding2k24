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
<div>
    <p>
        Red Haven is a state-of-the-art research and habitation station located on the Martian surface. Designed as a cornerstone of humanity's efforts to colonize the Red Planet, it combines cutting-edge technology with sustainable living practices.
Equipped with advanced humidity and temperature sensors, the station continuously monitors Mars' harsh environment, providing critical data for scientific research and survival strategies. These sensors help adapt habitats, develop farming solutions, and ensure the safety of its inhabitants.
More than just a research hub, Red Haven serves as a thriving community where pioneers work together to build a new future. With interconnected habitats, laboratories, and greenhouses, it is a testament to human ingenuity and resilience, paving the way for a permanent presence on Mars.
    </p>
</div>
<div class="p-4 light:bg-gray-100 dark:bg-gray-600 rounded-lg shadow-md mt-4 ml-3 mr-3">
    <p class="text-xl font-semibold">Temperature: {data.read.temp}°C</p>
    <p class="text-xl font-semibold">Humidity: {data.read.humid}%</p>
</div>
