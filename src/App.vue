<template>
  <input 
   type="text" 
   v-model = "name"
  >

  <button 
   class="btn btn-outline-primary" 
   @click="onSubmit"
  >
    Click
  </button>

</template>

<script>
  import { ref } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!

  export default{
    setup(){

      const name = ref('kossie');

      const onSubmit = () => {
        console.log(name.value);
      }



      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        name,
        onSubmit
      }; 
    }
  }
</script>

<style>
 /* css 코드 */
 .name {
  color : blue;
  background-color : yellow;
 }
</style>