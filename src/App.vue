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

export default{
  components: {
    Toast,
    Navbar,
  },
  setup(){
    
  }
}

</script>

<style scoped>

</style>