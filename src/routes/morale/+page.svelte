<script lang="ts">
    import { onMount } from "svelte";
    import type { PageServerData } from "./$types";
    import { Chart } from "flowbite-svelte";
    onMount(() => {
        const audio = new Audio("NagraniaCoding/Morale.mp3"); // Upewnij się, że ścieżka do pliku jest poprawna
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    });
    let { data }: { data: PageServerData } = $props();
    console.log(data.resp);
    let group: ApexCharts.ApexOptions = {
        chart: {
            type: "bar",
            foreColor: "#FFF",
            height: 350,
            zoom: {
                enabled: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        series: [
            {
                // name: "Morale",
                data: data.resp.map((reading) => {
                    return { x: reading.emotion??"null", y: reading.cnt };
                }),
            },
        ],
    };
</script>

<Chart options={group}></Chart>
