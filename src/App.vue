<template>
  <div class="container">

    <h2>To-Do List</h2>

    <form
      @submit.prevent = "onSubmit"
      class="d-flex"
    >
      <div class="flex-grow-1 mr-2">
        <input 
          type="text" 
          v-model = "todo"
          class = "form-control"
          placeholder="Type new to-do"
        >
      </div>

      <div>
        <button 
          type="submit"
          class="btn btn-outline-primary" 
        >
          Add
        </button>
      </div>
    </form>

    <div class="card mt-2">
      <div class="card-body p-2">
        {{ todos[0].subject }}
      </div>
    </div>
    <div class="card mt-2">
      <div class="card-body p-2">
        {{ todos[1].subject }}
      </div>
    </div>

  </div>
  
  
</template>

<script>
  import { ref } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!

  export default{
    setup(){

      const todo = ref(''); // 처음 input박스는 공란('')으로 설정
      const todos = ref([
        { id: 1, subject : "휴대폰 사기" },
        { id: 2, subject : "장보기" },
      ]); // 처음 todo리스트는 빈 배열으로 설정

      const onSubmit = () => {
        //console.log(todo.value);
        //e.preventDefault(); // form을 submit하면, 화면을 reloading( refresh) 하는데, 이를 방지. => <form @sumit.prevent = "onSubmit"></form>로 대체함!!
        todos.value.push({
          id : Date.now(), // 유니크한 key를 만들어내기 위함.
          subject : todo.value
        });
      };



      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        todo,
        todos,
        onSubmit,
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
 .hi{
  background-color : yellow;
 }
</style>