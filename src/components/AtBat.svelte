<script>
    import { ButtonSet, Button, Checkbox, NumberInput, Dropdown, RadioButtonGroup, RadioButton } from "carbon-components-svelte"

    export let atBatNumber = 1;
    export let atBatBatter = "Batter";
    export let atBatPlayer = "Player 1";

    let resultType = "noresult";
    let hitResultType ="0";
    let onBaseResultType = "10";
    let outResultType="100";
    let rbis = 0;
    let runs = 0;


</script>

<div>
    <ul>
      <li>Number: {atBatNumber}</li>
      <li>Batter: {atBatBatter} <Button kind=ghost size=small>Change</Button></li>
      <li>Player: {atBatPlayer} <Button kind=ghost size=small>Change</Button></li>
    </ul>
</div>
<div>
    <RadioButtonGroup bind:selected={resultType}>
        <RadioButton labelText="No Result" value="noresult" />
        <RadioButton labelText="Hit" value="hit" />
        <RadioButton labelText="On-base (No Hit)" value="onbase" />
        <RadioButton labelText="Out" value="out" />
      </RadioButtonGroup>
</div>
    <div class="result-input">
    {#if resultType=="hit"}
    <Dropdown
        id="hitresult"
        titleText="Hit Result"
        bind:selectedId={hitResultType}
        items={[
            { id: "0", text: "No Result" },
            { id: "1", text: "1B" },
            { id: "2", text: "2B" },
            { id: "3", text: "3B" },
            { id: "4", text: "HR" },
        ]}
    />
    {/if}
    {#if resultType=="onbase"}
    <Dropdown
        id="onbaseresult"
        titleText="On-Base Result"
        bind:selectedId={onBaseResultType}
        items={[
            { id: "10", text: "No Result" },
            { id: "11", text: "BB" },
            { id: "12", text: "HBP" },
            { id: "13", text: "FC" },
            { id: "14", text: "E" },
        ]}
    />
  {/if}
    {#if resultType=="out"}
    <Dropdown
        id="outresult"
        titleText="Out Result"
        bind:selectedId={outResultType}
        items={[
            { id: "100", text: "No Result" },
            { id: "101", text: "FO" },
            { id: "102", text: "GO" },
            { id: "103", text: "GIDP" },
            { id: "104", text: "K" },
            { id: "105", text: "K-Looking" },
        ]}
    />
{/if}
        </div>

<div>
    <div id="rbi-input">
    <NumberInput label="RBI" 
    bind:value={rbis}   
    min={0}
    max={4} 
    />
    <Checkbox labelText="Run Scored" />
    </div>
</div>

<div>
    <ButtonSet>
        <Button kind="danger">Cancel</Button>
        <Button>Save</Button>
      </ButtonSet>
</div>
<style>
    .result-input {
        width: 50%;
        max-width: 240px;
    }
    #rbi-input {
        width: 50%;
        max-width: 140px;
    }
</style>