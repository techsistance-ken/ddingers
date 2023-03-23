<script>
    import { userStore } from "../stores/userStore";

</script>
    <nav class="navbar">
      <!-- LOGO -->
      <div class="logo">DDingers</div>
      
      <!-- NAVIGATION MENU -->
      <div style="display:flex; flex-direction: row; align-items: center;">

        <ul class="nav-links">
          
        <!-- USING CHECKBOX HACK -->
        <input type="checkbox" id="checkbox_toggle" />
        <label for="checkbox_toggle" class="hamburger">&#9776;</label>
        
        <!-- NAVIGATION MENUS -->
        <div class="menu">
          <li><a href="/">Home</a></li>
          <li><a href="/season">Seasons</a></li>
        </div>
        </ul>

        {#if $userStore.name}
            <p style="  font-size: 18px; padding: 5px 14px;"><a href="/login">{$userStore.name}</a></p>
        {:else}
            <p style="  font-size: 18px; padding: 5px 14px;"><a href="/login">Login</a></p>
        {/if}

      </div>

    </nav>
<style>

/* CHECKBOX HACK */
input[type=checkbox]{
  display: none;
} 
/*HAMBURGER MENU*/

.hamburger {
  display: none;
  font-size: 24px;
  user-select: none;
}


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}
p:hover {
  background-color: #4c9e9e;
  border-radius: 5px;
  transition: 0.3s ease;
  cursor: pointer;
}

.navbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: teal;
  color: #fff;
}

.nav-links a {
  color: #fff;
}

/* LOGO */
.logo {
  font-size: 32px;
}

/* NAVBAR MENU */

.menu {
  display: flex;
  gap: 1em;
  font-size: 18px;
}

.menu li:hover {
  background-color: #4c9e9e;
  border-radius: 5px;
  transition: 0.3s ease;
}

.menu li {
  padding: 5px 14px;
}

@media (max-width: 768px) {
  .menu { 
    display:none;
    position: absolute;
    background-color:teal;
    right: 0;
    left: 0;
    text-align: center;
    padding: 16px 0;
  }

  input[type=checkbox]:checked ~ .menu {
    display: block;
  }
  .hamburger {
    display: block;
  }

}
</style>