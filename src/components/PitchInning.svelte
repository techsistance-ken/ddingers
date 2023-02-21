<script>
    import { ButtonSet, Button, Checkbox, NumberInput } from "carbon-components-svelte"

    export let pitchInning = 1;
    export let pitchInningPitcher = "Pitcher";
    export let pitchInningPlayer = "Player 1";

    let runs = 0;
    let earnedRuns = 0;
    let ks = 0;
    let singlePitcher = true;


</script>

<div>
    <ul>
      <li>Inning: {pitchInning}</li>
      <li>Pitcher: {pitchInningPitcher} <Button kind=ghost size=small>Change</Button></li>
      <li>Player: {pitchInningPlayer} <Button kind=ghost size=small>Change</Button></li>
    </ul>
</div>
<div>
    <div id="rbi-input">
    <NumberInput label="Runs" 
    bind:value={runs}   
    min={0}
    max={100} 
    />
    <NumberInput label="Earned Runs" 
    bind:value={earnedRuns}   
    min={0}
    max={100} 
    />
    <NumberInput label="Ks" 
    bind:value={ks}   
    min={0}
    max={3} 
    />
    <Checkbox labelText="Complete Inning?" bind:checked={singlePitcher}/>
    </div>
</div>

<div>
    <ButtonSet>
        <Button kind="danger">Cancel</Button>
        <Button>Save</Button>
      </ButtonSet>
</div>
<style>
    #rbi-input {
        width: 50%;
        max-width: 240px;
    }
</style>