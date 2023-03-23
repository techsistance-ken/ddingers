<script>
    import { Chevron, Dropdown, Helper, P,Card, Button, Label, Input, Radio } from "flowbite-svelte";
    import PlayerTag from "./PlayerTag.svelte";
    import { createEventDispatcher } from 'svelte';
    import { filter, length, match, assoc, compose } from "ramda";

    const dispatch = createEventDispatcher();

    const tagColorList = [
        "blue",
        "orange",
        "red",
        "black",
        "gray",
        "yellow",
        "green"
    ]

    export let tagColor = "Orange";
    export let tag = "";
    export let playerName = "" 
    export let createOrUpdateText = "Create Player";
    
    /**
     * @type {{
     *   nameError: string,
     *   tagError: string,
     *   hasError: boolean
     * }}
     */
    export let formError = {
        nameError: "",
        tagError: "",
        hasError: false 
    };


    

</script>
<div>
    <Card>
        <form class="flex flex-col space-y-6" action="/">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">{createOrUpdateText}</h3>
            <Label class="space-y-2">
                <span>Name</span>
                {#if formError.nameError}
                    <Helper class="mt-2" color="red"><span class="font-medium">Oh, snap!</span> {formError.nameError}</Helper>
                {/if}
                <Input type="text" name="playerName" bind:value={playerName} placeholder="Enter Name" required />
            </Label>
            <Label class="space-y-2">
                <span>Badge/Tag Label (one to two numbers or letters)</span>
                {#if formError.tagError }
                    <Helper class="mt-2" color="red"><span class="font-medium">Oh, snapp!</span> {formError.tagError}</Helper>
                {/if}
                <Input type="text" name="tag" bind:value={tag} placeholder="ex: 34 or KJ" required />
            </Label>
            <div class="tag-container">

                <P class="mb-4 text-white" size="sm">Tag: <PlayerTag color={tagColor} tag={tag} /></P>
                <!-- <ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600"> -->
                <Button outline color="blue"><Chevron>Choose Tag Color</Chevron></Button>
                <Dropdown>
                    {#each tagColorList as color}
                        {#if color == tagColor}
                            <li><Radio class="p-3" checked bind:group={tagColor} value={color}>{color}</Radio></li>
                        {:else}
                            <li><Radio class="p-3" bind:group={tagColor} value={color}>{color}</Radio></li>
                        {/if}
                    {/each}
                </Dropdown>
            </div>
            <Button on:click={() => dispatch("save",{name:playerName, tag, tagColor})} class="w-full">{createOrUpdateText}</Button>
            <Button color=red on:click={() => dispatch("cancel")} class="w-full">Cancel</Button>
        </form>
    </Card>
</div>