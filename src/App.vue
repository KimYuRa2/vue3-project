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

    <!-- 23. computed 예제-->
    <!-- <h4>count : {{ count }}</h4>
    <h4>doubleCountComputed : {{ doubleCountComputed }}</h4>
    <h4>doubleCountMethod : {{ doubleCountMethod() }}</h4>
    <button @click="count++">add One</button> -->


    <!-- 24. 검색기능 추가 -->
    <input 
      type="text" 
      v-model = "searchText"
      class = "form-control"
      placeholder="Search"
    >

    <hr/>

    <!-- 사용할컴포넌트이름 @자식컴포(에서발생할)이벤트이름 = “(실행될)부모컴포함수이름” -->
    <TodoSimpleForm @add-todo="addTodo" />



    <!-- todo 리스트가 공란일 때 띄울 텍스트 -->
    <div v-if = "!filteredTodo.length">
      추가된 Todo가 없습니다. There is nothing to display.
    </div>

    <!-- 사용할컴포넌트이름 :props로(자식컴포에게)보낼이름 = "(부모컴포에서)보낼테이터" -->
    <!-- => 자식컴포넌트에서 (:)todos 라는 이름으로, 부모컴포의 "todos"데이터에 접근가능하게됨-->
    <TodoList 
      :todos="filteredTodo" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"
    />
    

  </div>
  
  
</template>

<script>
  import { ref, computed } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!
  import TodoSimpleForm from './components/TodoSimpleForm.vue';
  import TodoList from './components/TodoList.vue';

  export default{
    components : {
      TodoSimpleForm,
      TodoList,
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
        todos.value.push(todo);        
      };

      /* todo리스트 체크박스 toggle이벤트 */
      const toggleTodo = (index) => {
        console.log(todos.value[index]);
        todos.value[index].completed = !todos.value[index].completed;
        console.log(todos.value[index]);

      }

      

      /* todo 삭제버튼 */
      const deleteTodo = ( index ) => {
        todos.value.splice( index, 1); // todos배열에서, index(삭제버튼을 누른 todo의 번호)부터 1개만 지워줌!!
      };


      /* 23. computed 예제 */
      const count = ref(100);
      const doubleCountComputed = computed( () => {
         // doubleCountComputed에는 항상(별도의 행위를 하지 않아도) count값*2의 값을 가지고있게된다.
        return count.value * 2;
      });
      const doubleCountMethod = () => {
        return count.value * 2;
      };

      /* 24. 검색 기능 추가 */
      const searchText = ref('');
      const filteredTodo = computed( () => {
        if(searchText.value){ // empty string이 아니면(검색창이 빈창이 아니면)
          return todos.value.filter(todo => { // filteredTodo에 포함시켜라
            return todo.subject.includes(searchText.value); // todos배열(todo리스트목록) 안에서, subject가 , searchText의 값을 포함하는것을 return 
          });
        }
        return todos.value;
      });


      return{ //return하는 변수들은 template 안에서 접근이 가능해짐!
        toggle,
        todos,
        todoStyle,
        onToggle, //Toggle버튼
        addTodo,
        toggleTodo,
        deleteTodo, // todo 삭제버튼
        count,
        doubleCountComputed,
        doubleCountMethod,
        searchText,
        filteredTodo,
        
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