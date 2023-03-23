<script>
    import { has } from "ramda";
    import { onDestroy, onMount } from "svelte";
    import Seasons from "../../components/Seasons.svelte";
    // import Seasons from "../../components/Seasons.svelte";
    import { userStore } from "../../stores/userStore";

    let atBatNumber=1;
    let atBatBatter="Batter A";
    let atBatPlayer="Player A"

    let pitchInning=1;
    let pitchInningPitcher="Pitcher A";
    let pitchInningPlayer="Player A"

    onMount(() => {
        console.log("On Mount")
    })

    onDestroy(() => {
        console.log("On Destroy")
    })
</script>

{#if has("name")($userStore)}

    <a href="/player-management">Player management</a>
    <Seasons />
{:else}
   <p>You must <a href="/login">Login</a> to track your seasons</p>
{/if}