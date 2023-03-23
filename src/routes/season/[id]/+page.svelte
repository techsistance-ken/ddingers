<script>
    import { has } from "ramda";
    import { userStore } from "../../../stores/userStore";
    import { seasonDetailStore } from "../../../stores/seasonDetailStore";
    import SeasonDetail from "../../../components/SeasonDetail.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    const seasonId = data.seasonId;

</script>

{#if has("name")($userStore)}

    <SeasonDetail seasonId={seasonId} />
{:else}
   <p>You must <a href="/login">Login</a> to track your seasons</p>
{/if}