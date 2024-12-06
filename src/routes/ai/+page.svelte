<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();
    interface RequestBody {
        img_path: string;
        actions: "emotion" | "age" | "gender" | "race";
        enforce_detection: boolean;
        detector_backend: string;
        align: boolean;
        expand_percentage: number;
        silent: boolean;
        anti_spoofing: boolean;
    }
    let files: FileList | undefined = $state();
    let txt: string = $state("test");
</script>

<input type="file" bind:files />
<button
    onclick={async () => {
        const reader = new FileReader();
        const file = files?.item(0);
        if (!file) {
            return;
        }
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const img = reader.result as string;
            const body: RequestBody = {
                img_path: img,
                actions: "emotion",
                enforce_detection: true,
                detector_backend: "mtcnn",
                align: true,
                expand_percentage: 0.1,
                silent: true,
                anti_spoofing: false,
            };
            const res = await fetch("/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            txt = JSON.stringify(data, null, 2);
        };
    }}>Click me</button
>
{txt}
