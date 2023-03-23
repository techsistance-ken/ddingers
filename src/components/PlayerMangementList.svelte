<script>
    import PlayerCard from "./PlayerCard.svelte";
    import { createEventDispatcher } from 'svelte'
    import { always, identity, prop } from "ramda";
    import { Button } from "flowbite-svelte";

    const dispatch = createEventDispatcher()

    /**
     * @type {string | any[]}
     */
     export let playerList = [];
     export let playersSelectable = false;
     export let playersEditable = true;

</script>
<div class="list-container">
    {#if playerList.length == 0}
      <p>No Players Added</p>
      <Button on:click={(e) => dispatch("add")}>Add New Player</Button>
    {:else}
        {#each playerList as player}
          <div style="margin-bottom: 8px;">
            <PlayerCard 
                playerSelectable={playersSelectable}
                playerEditable={playersEditable}
                player={player}
                on:delete={e => dispatch("delete",e.detail)}
                on:edit={e => dispatch("edit",e.detail)}
                on:select={e => dispatch("select",e.detail)}
            ></PlayerCard>
          </div>
        {/each}
    {/if}
    {#if playersEditable}
      <Button on:click={(e) => dispatch("add")}>Add New Player</Button>
    {/if}
</div>