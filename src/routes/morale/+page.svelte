<script lang="ts">
    import { onMount } from "svelte";
    onMount(() => {
        const audio = new Audio('NagraniaCoding/Morale.mp3'); // Upewnij się, że ścieżka do pliku jest poprawna
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    });
</script>