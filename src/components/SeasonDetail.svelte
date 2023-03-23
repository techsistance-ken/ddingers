<script>
    import { goto } from "$app/navigation";
    import { has, prop, length} from "ramda";
    import { onDestroy, onMount } from "svelte";
    import { seasonDetailStore } from "../stores/seasonDetailStore";
    import { userStore } from "../stores/userStore";

    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import { GAME_MODES } from "../constants";

    const userUid = () => prop("uid")($userStore);
    export let seasonId;

    const selectASeason = season => {
        goto(`season/${season.id}`)
    }

    onMount(async () => {
        console.log("Season Detail Componenet On Mount")
        seasonDetailStore.set({state: "loading"})

        if(!has("uid")($userStore)) {
            seasonDetailStore.set({state: "no_user"})
            return;
        }

        seasonDetailStore.loadSeason(userUid(),seasonId)

    })

    onDestroy(() => {
        console.log("Season Detail Component On Destroy")
    })
</script>

{#if prop("state",$seasonDetailStore) == "loading"}
  <p>Loading</p>
{:else}
  <p>{prop("name",$seasonDetailStore)}</p>
  <h3>Games</h3>
  {#if length(prop("games",$seasonDetailStore)) == 0}
    <p>No Games</p>
  {:else}
    <div class="game-list-container">
        {#each prop("games",$seasonDetailStore) as game}
            <div class="game-list-row">
                <div class="game-list-cell game-list-number">
                   {prop("result",game)} 
                </div>
            </div>
        {/each}
    </div>
  {/if}
  <button on:click={() => seasonDetailStore.addGame(prop("uid",$userStore),seasonId,GAME_MODES.solo_ranked)} style="width: 225px; "><Add /> Add New Game</button>
{/if}