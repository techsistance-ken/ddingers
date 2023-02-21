<script>
	
	import { Grid, Row, Column, UnorderedList, ListItem, Button, RadioButtonSkeleton } from "carbon-components-svelte";
	import Add from "carbon-icons-svelte/lib/Add.svelte";
	import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
	import Edit from "carbon-icons-svelte/lib/Edit.svelte";
	import CheckMark from "carbon-icons-svelte/lib/CheckMark.svelte";
	import Close from "carbon-icons-svelte/lib/Close.svelte";
    import { goto } from '$app/navigation';
	
	let name = 'world';

    let fields = [
        {
            label: "Captain",
            id: "captain",
            content: "kjdadada",
            editMode: false, 
            dependsOn: []
        },
        {
            label: "Player 2",
            id: "player2",
            content: "",
            editMode: false,
            dependsOn: ["captain"]
        },
        {
            label: "Player 3",
            id: "player3",
            content: "",
            editMode: false,
            dependsOn: ["player2"]
        }
    ]


    const doEditPlayer = () => goto("player-management")
</script>

<div class="container">
    {#each fields as fld}
        <div class="row">
            <div class="col">
                {fld.label}
            </div>
            <div class="col">
                {#if fld.editMode}
                    <input />
                {:else}
                    {fld.content == "" ? "[Empty]" : fld.content}
                {/if}
            </div>
            <div class="col">
                {#if fld.editMode}
                        <button class="inner" disabled><CheckMark size={16} /></button>
                        <button class="inner" disabled><Close size={16} /></button>
                {:else}
                    {#if fld.content == ""}
                        <button class="inner" on:click={doEditPlayer}><Add size={16} /></button>
                    {:else}
                        <button  class="inner" disabled><Edit size={16} /></button>
                        <button  class="inner" disabled><TrashCan size={16} /></button>
                    {/if}
                {/if}
            </div>
        </div>
    {/each}
</div>


<style>

    input {
        width: 80%;
    }
    .col {
        min-width: 120px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }
    .inner {
        margin: 4px;
    }
    button {
        background-color: beige;
        border: 0px;
        width: 48px;
    }
    button:hover {
        background-color: orange;
    }
    .row {
        height: 72px;
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
        width: 400px;
    }
    .row:hover {
        background-color: #eeeeee;
    }
    .container {
        justify-content: start;
    }

</style>
