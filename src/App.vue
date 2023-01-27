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

  <div class="container">
    <!-- 컴포넌트 -->
    <router-view/>
  </div>

  <Toast 
    v-if="showToast"
    :message = "toastMessage"
    :type="toastAlertType"
  />
  

</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default{
  components: {
    Toast,
  },
  setup(){

      /* useToast */
      const {
        showToast,
        toastMessage,
        toastAlertType,
        tiggerToast
      } = useToast();


      return{
        showToast,
        toastMessage,
        toastAlertType,
        tiggerToast,

      }

  }
}

</script>

<style>

</style>