<script>
    import { seasonsStore } from "../stores/seasonsStore";
    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import Add from "carbon-icons-svelte/lib/Add.svelte";

    let bgcolor = "orange"
</script>

<div class="season-container">

    <h2>Seasons</h2>

    <div class="list-container">
        {#if $seasonsStore.seasons.length == 0}
          <p>No Seasons Created</p>
        {:else}
            {#each $seasonsStore.seasons as season}
            <div class="card">
                <section class="section-main">
                    {season}
                </section>
                <!-- <section class="section-actions">
                    <button><span class="align-middle"><TrashCan size={16}/> Delete</span></button>
                </section> -->

            </div>
            {/each}
        {/if}
    </div>

    <button style="margin-top: 8px;"><Add /> Add New Season</button>
</div>


<style>

.align-middle {
    display: flex;
    align-items: center;
}
.season-container {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

.list-container {
    width: 56%;
    display: flex;
    flex-direction: column;
    background-color: yellowgreen;
    padding: 6px;
}

.card {
    min-height: 48px;
    margin: 2px;
    display: flex;
    flex-direction: row;
    padding: 2px;
}

.section-main:hover {
    background-color: #eeffee;
    cursor: pointer;
}
.section-main {
    padding-left: 8px;
    margin-right: 2px;
    flex-grow: 4;
    display: flex;
    align-items: center;
    background-color: white;
}
.section-actions {
    flex-grow: 1;
    padding: 2px;
    margin-left: 1px;
    background-color: white;
    display: flex;
    align-items: center;

}
</style>