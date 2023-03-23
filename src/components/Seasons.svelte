<script>
    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
    import Add from "carbon-icons-svelte/lib/Add.svelte";
    import { includes, map, prop, pick, filter, set, has, equals, assoc, compose, length, append, keys } from "ramda";
    import { goto } from "$app/navigation";
    import { Alert, Button } from 'flowbite-svelte';
    import { onDestroy, onMount } from "svelte";
    import { db, getDocs, query, collection } from "../firebase.js"
    import { userStore } from "../stores/userStore";
    import { seasonStore as seasonsStore } from "../stores/seasonsStore.js";
    import { GAME_MODES } from "../constants.js";



    const userUid = () => prop("uid")($userStore);

    const selectASeason = season => {
        goto(`season/${season.id}`)
    }

    onMount(async () => {
        console.log("Seasons Componenet On Mount")
        seasonsStore.set({state: "loading"})

        if(!has("uid")($userStore)) {
            seasonsStore.set({state: "no_user"})
            return;
        }

        seasonsStore.loadSeasons(userUid())

    })

    onDestroy(() => {
        console.log("Seasons Component On Destroy")
    })

    let bgcolor = "orange"
    let editMode = false
    let seasonName = ""
    let seasonMode = keys(GAME_MODES)[0]
    let saveError=""

    const toggleEditMode = () => { editMode = !editMode; seasonName = ""; editMode ? saveError="" : saveError}
    const saveNewSeason = () => { 
        if(seasonName == "") {
            saveError="Need a Name";
            return;
        }
        if(includes(seasonName)(map(prop("name"))($seasonsStore.seasons))) {
            saveError="Name Already Exists";
            return;
        }
        saveError="";

        seasonsStore.saveSeason(seasonName,seasonMode,$userStore.uid)
        seasonName="";
        editMode = false;
    }

    const routeToSeason = (/** @type any */ season) => () => {
        saveError=""
        seasonName=""
        goto(`season/${season.id}`)
    }
</script>

<div class="season-container">

    <h2>Seasons</h2>

    <div class="list-container">
        {#if equals("loading",prop("state",$seasonsStore))}
        Loading . . .
        <p><span class="loader"></span></p>
        {:else if equals("no_user",prop("state",$seasonsStore))}
          <p>Need to logged in</p>
        {:else if equals("fail",prop("state",$seasonsStore))}
            <p>Error: 27</p>
        {:else if equals("no_seasons",prop("state",$seasonsStore))}
          <p>You have no seasons created yet</p>
        {:else}
          <div class="season-list-container">
            {#each prop("seasons")($seasonsStore) as season}
              <div class="season-list-row">
                <div on:keyup={e => e.key=="Enter" || e.key==" " ? selectASeason(season) : ""} tabindex=0 on:click={() => selectASeason(season)} role="button" class="season-list-cell" style="flex-grow:2;">
                    {season.name}
                </div>
                <div class="season-list-cell">
                    {has("games",season) ? `${length(prop("games",season))} Games` : "0 Games"}
                </div>

              </div>
            {/each}

          </div>
        {/if}
    </div>

    <div style="margin-top: 8px;">
        {#if editMode}
          {#if saveError}
          <p>
            <Alert color="red">
                <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                </span>
                Error: {saveError}
              </Alert>
          </p>
          {/if}
          Season Name: <input bind:value={seasonName}/>
          <Button on:click={toggleEditMode}>Cancel</Button>
          <Button >Save</Button>
        {:else}
          <Button on:click={toggleEditMode}><Add /> Add New Season</Button>
        {/if}
    </div>
</div>

{#if editMode}
<div class="modal">
    <div class="form-container">
        <legend>A New Season</legend>
        <label for="stacked-email">Season Name</label>
        <input  bind:value={seasonName} />
        <!-- <span class="pure-form-message">This is a required field.</span> -->
        <label for="stacked-password">Default Game Mode</label>
        <select bind:value={seasonMode}>
            {#each keys(GAME_MODES) as gmKey}
                {#if seasonMode==gmKey}
                    <option selected value={gmKey}>{prop(gmKey)(GAME_MODES)}</option>
                {:else}
                    <option value={gmKey}>{prop(gmKey)(GAME_MODES)}</option>
                {/if}
            {/each}
        </select>
        <button on:click={saveNewSeason}>Save Season</button>
        <button on:click={toggleEditMode}>Cancel</button>

    </div>
</div>
<div class="modal-overlay" id="modal-overlay">
</div>
{/if}

<style>

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

.loader {
  width: 48px;
  height: 48px;
  border: 3px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid;
  border-color: #FF3D00 transparent;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

.form-container {
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    width: 240px;
    padding: 14px;
    flex-grow: 1;
}
label {
    margin-top: 8px;
    margin-bottom: 8px;
}
button {
    margin-top: 8px;
    margin-bottom: 8px;
}

.modal {
  background-color: black;
  color: white;
  padding: 24px 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1010;

}
.modal-overlay {

/* recommendation:
   don't focus on the number "1000" here, but rather,
   you should have a documented system for z-index and 
   follow that system. This number should be pretty
   high on the scale in that system.
*/
z-index: 1000;

background-color: gray;
opacity: .5;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;

}


.season-list-row {
    display: flex;
    flex-direction: row;
    padding: 8px;
}
.season-list-row :hover {
    background-color: #ccffcc;
    cursor: pointer;
    border-radius: 6px;
}
.season-list-cell {
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: auto;
    flex-grow: 1;
}
</style>