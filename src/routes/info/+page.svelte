<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { Button, Chart, Heading, RadioButton } from "flowbite-svelte";
    import type { PageServerData } from "./$types";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import { invalidate, invalidateAll } from "$app/navigation";
    import * as Icon from 'flowbite-svelte-icons';

    let { data, form }: { data: PageServerData; form: ActionData } = $props();

    // Refresh data every 10 seconds
    onMount(() => {
        const interval = setInterval(() => {
            invalidateAll();
        }, 10000);
        return () => clearInterval(interval); // Clean up the interval when the component is destroyed
    });

    let audio: HTMLAudioElement | null = null;
    let isPlaying = $state(true);

    // Manage audio playback
    onMount(() => {
        audio = new Audio('NagraniaCoding/InfoStation.mp3'); // Path to the file
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    });

    onDestroy(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset playback
            audio = null;
        }
    });

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

    let readings = $derived(form ? form.readings : data.readings);

    $effect(() => {
        if (form) {
            console.log(form.readings);
            data.readings = form.readings;
        }
    });

    let temp: ApexCharts.ApexOptions = $derived({
        chart: {
            type: "area",
            foreColor: "#FFF",
            zoom: {
                enabled: false,
            },
        },
        series: [
            {
                data: readings.map((reading) => {
                    return { x: reading.time, y: reading.temp };
                }),
            },
        ],
        xaxis: {
            type: "datetime",
        },
        stroke: {
            curve: "smooth",
        },
        dataLabels: {
            enabled: false,
        },
    });

    let hum: ApexCharts.ApexOptions = $derived({
        chart: {
            type: "area",
            foreColor: "#FFF",
            zoom: {
                enabled: false,
            },
        },
        series: [
            {
                data: readings.map((reading) => {
                    return { x: reading.time, y: reading.humid };
                }),
            },
        ],
        xaxis: {
            type: "datetime",
        },
        stroke: {
            curve: "smooth",
        },
        dataLabels: {
            enabled: false,
        },
    });
</script>

<Heading>Welcome to the Station Info Page</Heading>

<form method="post" use:enhance>
    <label for="from">From:</label>
    <input type="datetime-local" name="from" id="from" />
    <label for="to">To:</label>
    <input type="datetime-local" name="to" id="to" />
    <Button type="submit">Submit</Button>
</form>

<Button on:click="{toggleAudio}" class="m-3">
    {#if isPlaying}
        <Icon.VolumeUpOutline />
    {:else}
    <Icon.VolumeMuteOutline />
    {/if}
</Button>

<Chart options={temp}></Chart>
<Chart options={hum}></Chart>
