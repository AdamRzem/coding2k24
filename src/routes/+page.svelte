<script lang="ts">
    import type { PageData, PageServerData } from "./$types";

  let {data}:{data:PageServerData}=$props()
</script>

<h1>Data from PostgreSQL</h1>

{data.read.temp}
{data.read.humid}
