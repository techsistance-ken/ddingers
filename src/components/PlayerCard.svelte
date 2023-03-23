<script>
import { Card, Button } from 'flowbite-svelte';
import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
import Edit from "carbon-icons-svelte/lib/Edit.svelte";
import PlayerTag from './PlayerTag.svelte';
import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

export let player = null;
export let deleteAction = () => dispatch("delete",player);
export let editAction = () => dispatch("edit",player);
export let selectAction = () => dispatch("select",player);
export let playerSelectable = true;
export let playerEditable = true;


</script>

<Card padding="none">
    <div class="card-container">
        <div class="text-cell tag-cell">
            <PlayerTag 
              color={player.color}
              tag={player.tag}
            />
        </div>
        <div class="text-cell name-cell">
            {#if playerSelectable} 
                <Button on:click={selectAction} style="width: 100%" outline color="dark">{player.name}</Button>
            {:else}
                {player.name}
            {/if}
        </div>
        {#if playerEditable }
            <div class="button-cell"><Button on:click={editAction} pill={true} class="!p-2"><Edit /></Button></div>
            <div class="button-cell"><Button on:click={deleteAction} pill={true} class="!p-2"><TrashCan /></Button></div>
        {/if}
    </div>
</Card>
<style>

.card-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    margin-left: 8px;
}
.text-cell {
    padding: 4px;
    display: flex;
    align-items: center;
}
.name-cell {
    width: 100%;
}
.button-cell {
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.tag-cell {
    display: flex;
    justify-content: center;
    align-items: center;
}

.dot {
  height: 22px;
  width: 22px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>