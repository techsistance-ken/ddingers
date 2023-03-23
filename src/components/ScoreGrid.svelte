<script>
    import { concat } from "ramda";
    import { Button, Dropdown, DropdownItem, Chevron, NumberInput, Radio, Label } from 'flowbite-svelte';
    import { base } from "$app/paths";
    import PlayerTag from "./PlayerTag.svelte";



// 0, 1, 2, 3, 4 (Run)
let currentBase = "0";

let rbis = 0;
let outNumber = 0;
let result = "";

let testMode = true;
</script>

<div class="container">
    <div class="bases inner">
      <div class={concat("bases-outline bases-outline-",currentBase.toString())}>
      </div>
      
    </div>
    {#if result}
    <div class="{currentBase == "4" ? "result-run" : "result"} inner">
     <span class={result == "KL" ? "GFG" : ""}>{result == "KL" ? "K" : result}</span>
    </div>
    {/if}
    <div class="outs inner">
      {#if outNumber > 0}
      <div class="dot-out dot">
        {outNumber}
      </div>
      {/if}
    </div>
    <div class="rbis inner">
        {#if rbis > 0}
       <div class="dot-rbi dot">
        {rbis}        
      </div>
      {/if}
    </div>
  </div>
  

  {#if testMode}
  <div class="form-container">
    <ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
        <li><Radio class="p-3" bind:group={outNumber} value="0">No Out</Radio></li>
        <li><Radio class="p-3" bind:group={outNumber} value="1">1</Radio></li>
        <li><Radio class="p-3" bind:group={outNumber} value="2">2</Radio></li>
        <li><Radio class="p-3" bind:group={outNumber} value="3">3</Radio></li>
    </ul>

    <ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
        <li><Radio class="p-3" bind:group={currentBase} value="0">No Base</Radio></li>
        <li><Radio class="p-3" bind:group={currentBase} value="1">First</Radio></li>
        <li><Radio class="p-3" bind:group={currentBase} value="2">Second</Radio></li>
        <li><Radio class="p-3" bind:group={currentBase} value="3">Third</Radio></li>
        <li><Radio class="p-3" bind:group={currentBase} value="4">Run Scored</Radio></li>
    </ul>
    
    <Label class="space-y-2 mb-4">
        <span>RBIs</span>
        <NumberInput max=4 min=0 bind:value={rbis} />
    </Label>

    <ul class="w-48 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-600 divide-y divide-gray-200 dark:divide-gray-600">
        <li><Radio class="p-3" bind:group={result} value="">No Result</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="1B">Single</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="2B">Double</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="3B">Triple</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="HR">HR</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="K">K</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="KL"><span class="GFG">K</span></Radio></li>
        <li><Radio class="p-3" bind:group={result} value="BB">Walk</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="Sac">Sacrafice</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="FO">Fly Out</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="GO">Ground Out</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="FC">Fielder's Choice</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="E">Error</Radio></li>
        <li><Radio class="p-3" bind:group={result} value="HBP">Hit By Pitch</Radio></li>
    </ul>
  </div>
{/if}
  <style>

    .form-container {
        background-color: #eee;
        padding: 8px;
        max-width: 480px;
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
    }
    .container {
        background-color: #cccccc;
        position: relative;
        display: grid;
  grid-template: 1fr / 1fr;
  place-items: center;
  width: 64px;
  height: 64px;
  border: 1px solid black;
}

.inner {
  width: 64px;
  height: 64px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container > * {
  grid-column: 1 / 1;
  grid-row: 1 / 1;
}
.container .rbis {
  z-index: 4;
}
.container .outs {
  z-index: 3;
}
.container .bases {
  z-index: 2;
}
.container .result .result-run {
  z-index: 2;
}

.bases-outline {
  width: 40px;
  height: 40px;
  border: 1px solid black;
  transform: rotate(45deg);
  background-color: transparent;
}

.bases-outline-0 {
    border: 1px solid black;
}

.bases-outline-1 {
  border-right: 4px solid black;    
}

.bases-outline-2 {
  border-top: 4px solid black;    
  border-right: 4px solid black;    
}

.bases-outline-3 {
  border-top: 4px solid black;    
  border-right: 4px solid black;    
  border-left: 4px solid black;    
}
.bases-outline-4 {
  background-color: black;
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
.dot-out {
  background-color: red;
  position: absolute;
  top: 0px;
  left: 0px;
}
.dot-rbi {
  background-color: green;
  position: absolute;
  top: 38px;
  left: 38px;
}
.result {
  color: white;
  z-index: 2;
}
.result-run {
  color: white;
  z-index: 2;
}

.GFG{                 
        transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -webkit-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        transform: scale(-1, 1);
      }
</style>