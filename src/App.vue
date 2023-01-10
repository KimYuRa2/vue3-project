<template>
  <!-- v-bind : class  ===  : class -->
  <!-- v-on : click  ===  @ click -->
  <div v-bind:class = "nameClass">{{ name }}</div>
  <input v-bind:type="type" v-bind:value="name">
  <button class="btn btn-outline-primary" v-on:click="updateName">updateName</button>
</template>

<script>
  import { ref } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!

  export default{
    setup(){

      const name = ref('kossie');
      const type = ref('number'); // input타입을 number로 설정
      //const type = ref('text'); //  input타입을 text로 설정
      const nameClass = ref(''); 

      const updateName = () => {
        name.value = 'corder!!'; 
        nameClass.value = 'name';
      }


      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        name,
        updateName,
        type,
        nameClass
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