<script>
    import Header from "../components/Header.svelte";

</script>

<div class="mymaindiv">
  <Header />
    <div class="mymaincontainer">
      <slot />
  </div>
</div>

<style>
  .mymaindiv {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .mymaincontainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 88%;
    padding: 8px;
    margin: 8px;
    border-radius: 8px;
  }


</style>
