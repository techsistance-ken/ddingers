<script>
import { playerManagementStore } from "../../stores/playerManagementStore";

const testSelectedPlayer = () => playerManagementStore.selectPlayer(testStr == "" ? "[Empty]" : testStr)
let testStr = ""

</script>

<h2>Player Management</h2>

<div>
  {JSON.stringify($playerManagementStore)}
</div>

<div>
    <input bind:value={testStr}>
    <button on:click={testSelectedPlayer}>test</button>
</div>
<style>

</style>