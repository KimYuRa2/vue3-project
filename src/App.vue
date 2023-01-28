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

  <transition name="slide">
    <Toast 
      v-if="showToast"
      :message = "toastMessage"
      :type="toastAlertType"
    />
  </transition>
  
  

</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
// import { useStore } from 'vuex';

export default{
  components: {
    Toast,
  },
  setup(){
      // const store = useStore(); // 값을 store에 담아줌
      // console.log(store.state.showToast);

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

<style scoped>
    /* transition 2 -  */
    .slide-enter-active,
    .slide-leave-active{
        transition : all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to{
        opacity: 0; /* 0(투명) -> 1(선명) */
        transform : translateY(-30px);
    }

    .slide-enter-to,
    .slide-leave-from{
        opacity: 1; /* 1 -> 0 */
        transform : translateY(0);
    }
</style>