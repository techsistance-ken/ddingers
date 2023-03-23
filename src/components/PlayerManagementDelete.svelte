<script>
    import { Alert, Button, Input } from "flowbite-svelte";
    import { has, prop } from "ramda";
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    /**
     * @type {{ name: any; } | null}
     */
     export let playerEdit = null;
</script>
<Alert color="red">
    <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></span>
    <span class="text-lg font-medium">Delete {has("name",playerEdit) ? prop("name")(playerEdit) : "Error"}?</span>
    <div slot="extra">
      <div class="mt-2 mb-4 text-sm">All accumalitive stats will be permanently deleted.  Are you Sure?</div>
      <div class="flex gap-2">
        <Button size="xs" on:click={() => dispatch("cancel")}>Cancel</Button>
        <Button size="xs" on:click={() => dispatch("confirm")} outline color="red" class="dark:!text-blue-800">Delete</Button>
      </div>
    </div>
  </Alert>