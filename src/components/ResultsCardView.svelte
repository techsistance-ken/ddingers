<script>
import { Label, Chevron, Input, Dropdown, Button, Card, Radio } from 'flowbite-svelte';
import Edit from "carbon-icons-svelte/lib/Edit.svelte";
import CardHeader from './CardHeader.svelte';
import LabelAndStat from './LabelAndStat.svelte';
import { createEventDispatcher } from 'svelte'
    import { has } from 'ramda';

const dispatch = createEventDispatcher()
export let result = {
    result: "",
    ratingBefore: 0,
    ratingAfter: 0,
    oppRatingBefore: 0,
    oppRatingAfter: 0
}

const results = [
    "Win",
    "Loss",
    "DNF Win",
    "DNF Loss",
    "Other"
]   
let editResult = "";
let editInnings = "";
let editRatingBefore = 0;
let editRatingAfter = 0;
let editOppRatingBefore = 0;
let editOppRatingAfter = 0;
const MODE_VIEW = "view";
const MODE_EDIT = "edit";

let cardMode = MODE_VIEW;

</script>

<Card>
    <CardHeader headerText="Result" />

{#if cardMode == MODE_VIEW }
    <div style="width: 100%;">

        <LabelAndStat
        label="Result:"
        stat={has("result",result) ? result.result : "--"} />
        <LabelAndStat
        span=2
        label="My Rating"
        stat="" />
        <LabelAndStat
        label="Before:"
        stat={result.ratingBefore} />
        <LabelAndStat
        label="After:"
        stat={result.ratingAfter} />
        <LabelAndStat
        label="Change:"
        statPosNegNumber={true}
        stat={result.ratingAfter-result.ratingBefore} />

        <LabelAndStat
        span=2
        label="Opponents Rating"
        stat="" />
        <LabelAndStat
        label="Before:"
        stat={result.oppRatingBefore} />
        <LabelAndStat
        label="After:"
        stat={result.oppRatingAfter} />
        <LabelAndStat
        label="Change:"
        statPosNegNumber={true}
        stat={result.oppRatingAfter-result.oppRatingBefore} />
    </div>
    <div>
        <Button on:click={() => {
            editResult = result.result;
            editRatingBefore = result.ratingBefore;
            editRatingAfter = result.ratingAfter;
            editOppRatingAfter = result.oppRatingAfter;
            editOppRatingBefore = result.oppRatingBefore;
            cardMode=MODE_EDIT;
        }}>Edit <Edit /></Button>
    </div>

{:else}
    <p class="mb-4 font-semibold text-gray-900 dark:text-white">Result: {editResult}</p>
    <ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
        {#each results as re}
        <li>
            <Radio class="p-3" bind:group={editResult} value={re}>{re}</Radio>
        </li>
        {/each}
    </ul>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label for="ratingBefore" class="mb-2">Rating Beore</Label>
          <Input type="number" id="ratingBefore" bind:value={editRatingBefore} placeholder="200" />
        </div>
        <div>
          <Label for="ratingAfter" class="mb-2">Rating After</Label>
          <Input type="number" id="ratingAfter" bind:value={editRatingAfter} placeholder="200" />
        </div>
        <div>
          <Label for="oppRatingBefore" class="mb-2">Oppo. Rating Before</Label>
          <Input type="number" id="oppRatingBefore" bind:value={editOppRatingBefore} placeholder="200" />
        </div>
        <div>
          <Label for="oppRatingAfter" class="mb-2">Oppo. Rating After</Label>
          <Input type="number" id="oppRatingAfter" bind:value={editOppRatingAfter} placeholder="200" />
        </div>
    </div>

    <Button on:click={() => {
        cardMode=MODE_VIEW;
        dispatch("save",{result: editResult, 
                            ratingBefore: editRatingBefore,
                            ratingAfter: editRatingAfter, 
                            oppRatingBefore: editOppRatingBefore,
                            oppRatingAfter: editOppRatingAfter})
    }}>Save</Button>
    <Button on:click={() => {cardMode=MODE_VIEW;}}>Cancel</Button>
{/if}


</Card>