<script lang="ts">
    import { onMount } from "svelte";
    import { Button, Chart, Heading, RadioButton } from "flowbite-svelte";
    import type { PageServerData } from "./$types";
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    import { invalidate, invalidateAll } from "$app/navigation";
    let { data, form }: { data: PageServerData; form: ActionData } = $props();
    onMount(() => {
        const interval = setInterval(() => {
            invalidateAll();
        }, 10000);
        return () => clearInterval(interval);
    });
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
            // height: 350,
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
            // height: 350,
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
    onMount(() => {
        const audio = new Audio('NagraniaCoding/InfoStation.mp3'); // Upewnij się, że ścieżka do pliku jest poprawna
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
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
<Chart options={temp}></Chart>
<Chart options={hum}></Chart>
