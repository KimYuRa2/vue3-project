<template>
    
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!-- <router-link class="navbar-brand" to="/">Yura's Todo</router-link> -->
    <router-link class="navbar-brand" :to="{ name : 'Home' }">Yura's Todo</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <!-- <router-link class="nav-link" to="/todos">Todos</router-link> -->
        <router-link class="nav-link" :to="{ name : 'Todos' }">Todos</router-link>
      </li>
    </ul>
  </nav>

</template>

<script>
export default {

}
</script>

<style>

</style>