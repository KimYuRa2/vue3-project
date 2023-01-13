<template>
  <!--13. v-show : 처음부터 두개의 div를 렌더링한 후, style을 이용해서 나타나거나 감추도록 함 ( display: none; ) => toggle같은 것을 자주 해줄 때 유용함.-->
  <!-- <div v-show = "toggle">true</div>
  <div v-show = "!toggle">false</div>
  <button @click = "onToggle">Toggle</button> -->

  <!--13. v-if : 처음부터 조건에 맞는 div만 렌더링한다. => 런타임동안 조건이 거의 바뀌지 않을 때 사용하면 유용함. -->
  <!-- <div v-if="toggle">true</div>
  <div v-else>false</div>
  <button @click = "onToggle">Toggle</button> -->

  <div class="container">

    <h2>To-Do List</h2>

    <!-- 사용할컴포넌트이름 @add-todo=“함수이름” -->
    <TodoSimpleForm @add-todo="addTodo" />



    <!-- todo 리스트가 공란일 때 띄울 텍스트 -->
    <div v-if = "!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <!-- todo 리스트 -->
    <div 
      v-for = "(todo, index) in todos"
      :key = "todo.id"
      class="card mt-2"
    >
      <!-- todo 체크박스 -->
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input" 
            type="checkbox"
            v-model="todo.completed"
          >
          <label 
            class="form-check-label"
            :class = "{ todo : todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>

        <!-- todo 삭제버튼 -->
        <div>
          <button
            class="btn btn-danger btn-sm"
            @click = "deleteTodo( index )"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

  </div>
  
  
</template>

<script>
  import { ref } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!
  import TodoSimpleForm from './components/TodoSimpleForm.vue';

  export default{
    components : {
      TodoSimpleForm
    },

    setup(){
      const toggle = ref(false);
      const todos = ref( [] ); // 처음 todo리스트는 빈 배열으로 설정
      
      const todoStyle = {
        textDecoration : 'line-through', //자바스크립트로 style을 설정할 때는 text-decoration이 아닌!! 'textDecoration'이라 쓰기.
        color : 'gray',
      }

      const onToggle = () => {
        toggle.value = !toggle.value; // toggle ref를 반대로 바꿔줌. ( true => false 또는 false => true)
      }

      // * onSubmit => addTodo로 함수이름 변경!
      const addTodo = ( todo ) => { // todo 파라미터 : 자식컴포넌트에서 받아온 데이터
        console.log(todo);
        todos.value.push(todo);
        // if(todo.value === ''){ // todo 값이 공란이면
        // hasError.value = true; // 에러
        // }else{ // todo 값이 공란이 아님(에러없음)
        // /* 폼 컴포넌트 옮기는 중! (todos가 App.vue컴포넌트에 있어서 여기서 처리 못하므로 일단 주석처리함.) */
        // // todos.value.push({ // 리스트에 todo를 추가해줌.
        // //     id : Date.now(), // 유니크한 key를 만들어내기 위함.
        // //     subject : todo.value,
        // //     completed : false, // todo리스트 체크박스 확인 
        // // });
        // hasError.value = false; // 잘 써서 추가가 됐으면, 에러 없음으로 다시 바꿔줌!
        // todo.value = ''; // todo 추가하고 나면, empty string으로 input란 비우기.
        // }
                
      };

      

      /* todo 삭제버튼 */
      const deleteTodo = ( index ) => {
        todos.value.splice( index, 1); // todos배열에서, index(삭제버튼을 누른 todo의 번호)부터 1개만 지워줌!!
      };



      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        toggle,
        todos,
        todoStyle,
        onToggle, //Toggle버튼
        addTodo,
        deleteTodo, // todo 삭제버튼
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
 .todo {
  color : gray;
  text-decoration: line-through;
 }
</style>