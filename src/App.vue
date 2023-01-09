<template>
  <div>{{ name }}</div>
  <div>{{ idx }}</div>
  <button class="btn btn-outline-primary" v-on:click="updateName">updateName</button>
  <button class="btn btn-outline-primary" v-on:click="updateId">updateId</button>
</template>

<script>
  import { ref, reactive } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!

  export default{
    setup(){

      //ref
      const name = ref('kossie corder2');

      const updateName = () => {
        name.value = 'update!!!';  
        /*
           ref 
           :  const name = ref('kossie corder2'); 의 value가
              updateName 함수를 통해 'update!!!라고 업데이트되면서 (name변수 뒤 "value" 꼭 붙이기!),
              template까지 같이 업데이트됨.
              + ref()안에 값은 숫자/문자/객체/배열 모두 기능함.
        */
      }


      // reactive
      const idx = reactive({ //여기서 reactive() 대신 ref()를 쓰고싶다면 , 밑의 updateId함수에서 idx."value".id 라고 써야함!!
        id : 1
      });

      const updateId = () => {
        idx.id = 2; // reactive한 특성 사용; 변수 뒤 .value 쓸필요 X ; reactive()안에 값은 객체/배열 기능함.
        // idx.value.id = 2;   // 위에서 reactive() 대신 ref()를 쓴다면 idx."value".id 라고 써야함!!
        console.log(idx);
      }

      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        name,
        idx,
        updateName,
        updateId,
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