<template>
  <!-- Navbar -->
  <Navbar />

  <div class="container">
    <!-- 페이지 컴포넌트 -->
    <router-view/>
  </div>

  <!-- Toast 컴포넌트 -->
  <Toast />
  
</template>

<script>
import Toast from '@/components/Toast.vue';
import Navbar from '@/components/Navbar.vue';
// import { useToast } from '@/composables/toast';
// import { useStore } from 'vuex';

export default{
  components: {
    Toast,
    Navbar,
  },
  setup(){
      // const store = useStore(); // 값을 store에 담아줌
      // console.log(store.state.showToast);

      /* useToast */
      // const {
      //   showToast,
      //   toastMessage,
      //   toastAlertType,
      //   tiggerToast
      // } = useToast();


      // return{
      //   showToast,
      //   toastMessage,
      //   toastAlertType,
      //   tiggerToast,

      // }

  }
}

</script>

<style scoped>

</style>