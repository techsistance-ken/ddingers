<script>
    import { intersection } from "ramda";


    export let label = "lablel:";
    export let stat = "stat";

    export let statPosNegNumber = false;

    export let span=1;

    let statColor = "black"
    let before=""

    if(statPosNegNumber) {
        const n = parseInt(stat);
        n >= 0 ? statColor="green" : statColor="red"
        n >= 0 ? before="+" : before=""

    }
</script>
<div style="
  display: flex;
  flex-direction: row;
  width: 100%;
">

  <div style="
  color: grey;
  display: flex;
  flex-grow: 1;
  font-weight: bolder;
  align-items: center;
  justify-content: {span==1 ? "flex-start" : "center"};
  ">
  {label}
</div>
{#if span==1}
<div style="
  flex-grow: 1;
  color: {statColor};
  display: flex;
  align-items: center;
  justify-content: flex-end;
">
  {before}{stat}
</div>
{/if}

</div>