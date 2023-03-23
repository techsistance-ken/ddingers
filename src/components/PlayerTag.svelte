<script>
    import { has, prop } from "ramda";


export let color="orange";
export let tag="ex";
let textColor="white";

const textColors = {
    yellow: "black"
}


</script>
<div class="dot"
   style="
     background-color: {color};
     color: {has(color,textColors) ? prop(color,textColors) : "white"};
   ">
    {tag}
</div>

<style>
.dot {
  height: 22px;
  width: 22px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>