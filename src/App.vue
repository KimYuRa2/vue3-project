<template>
  <div>{{ name }}</div>
  <div>{{ name2 }}</div>
  <button class="btn btn-outline-primary" v-on:click="consoleLog">Click!</button>
  <button class="btn btn-outline-primary" v-on:click="updateName">update</button>
</template>

<script>
  export default{
    setup(){
      const name = 'kossie corder2';  // 업데이트를 위해 자료형을 const => let으로 바꿈
      let name2 = 'KYR';  // 업데이트를 위해 자료형을 const => let으로 바꿈

      // const greeting = () => {
      //   return 'hello!' + name;
      // }

      // const greetname = greeting(name);
      
      const consoleLog = () => {
        console.log("hello world~~~~");
      }

      const updateName = () => {
        name2 = 'update!!!'; 
      }

      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        name,
        name2,
        consoleLog,
        updateName
      }; 
    }
  }
</script>

<style>
 /* css 코드 */
 .name {
  color: red;
 }
</style>