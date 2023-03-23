<script>
    import { has } from "ramda";
    import { userStore } from "../../../../../stores/userStore";

</script>

{#if has("name")($userStore)}
    <p>Fetching Season Detail . . . </p>
{:else}
   <p>You must <a href="/login">Login</a> to track your seasons</p>
{/if}