<script>
    import { length } from "ramda";
import { gamesStore } from "../../../../stores/gamesStore";
import { Button } from 'flowbite-svelte';
</script>

<div> 
    <h3>Games</h3>
    {length($gamesStore.games)}
    <Button on:click={() => gamesStore.addNewGame()}>Add Game</Button>
</div>