<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { PageServerData } from "./$types";
    import { Chart } from "flowbite-svelte";
    import { Button } from "flowbite-svelte";

    let audio: HTMLAudioElement | null = null;
    let isPlaying = $state(true);

    onMount(() => {
        // Initialize and play the sound
        audio = new Audio("NagraniaCoding/Morale.mp3"); // Ensure the file path is correct
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    });

    onDestroy(() => {
        // Stop and reset the audio
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset playback position
            audio = null;
        }
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
                data: data.resp
                    ? data.resp.map((reading) => {
                          return {
                              x: reading.emotion ?? "null",
                              y: reading.cnt,
                          };
                      })
                    : [],
            },
        ],
    };

    function toggleAudio() {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch((error) => {
                    console.error("Audio playback failed:", error);
                });
            }
            isPlaying = !isPlaying;
        }
    }
</script>

<Button on:click={toggleAudio} class="m-3">
    {isPlaying ? "Pause Audio" : "Play Audio"}
</Button>
<Chart options={group}></Chart>
<form method="post">
    <Button type="submit">Photo</Button>
</form>
