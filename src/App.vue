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

    <!--에러메세지-->
    <div style="color:red;backgroundColor:yellow;">{{ error }}</div>



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

    <hr/>

    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a 
            v-if = "currentPage !== 1"
            class="page-link" 
            @click = "getTodos(currentPage - 1)"
            style="cursor : pointer"
          >
            Previous
          </a>
        </li>
        <li 
          v-for = "page in numberOfPages"
          :key = "page"
          class= "page-item"
          :class= "currentPage === page ? 'active' : '' "
        >
          <a 
            class="page-link" 
            @click="getTodos(page)" 
            style="cursor : pointer"
          >
            {{ page }}
          </a>
        </li>
        <li class="page-item">
          <a 
            v-if=" numberOfPages !== currentPage "
            class="page-link" 
            @click = "getTodos(currentPage + 1)"
            style="cursor : pointer"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>

  </div>
  
  
</template>

<script>
  import { ref, computed } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!
  import TodoSimpleForm from './components/TodoSimpleForm.vue';
  import TodoList from './components/TodoList.vue';
  import axios from 'axios'; // http요청 보낼때 사용할 npm 패키지

  export default{
    components : {
      TodoSimpleForm,
      TodoList,
    },

    setup(){
      const toggle = ref(false);
      const todos = ref( [] ); // 처음 todo리스트는 빈 배열으로 설정
      const error = ref(''); // 에러메세지
      const numberOfTodos = ref(0); // pagination 총 todo 갯수 // initial paginagion: 0 
      const limit = 5; // pagination 페이지당 보여줄 데이터갯수
      const currentPage = ref(1); // pagination 처음 보여줄 페이지(현재페이지 : 기본 1)
      const numberOfPages = computed ( () => {
        return Math.ceil(numberOfTodos.value/limit); // 총todo갯수/페이지당갯수 올림계산 = 총 페이지 수
      })

      const todoStyle = {
        textDecoration : 'line-through', //자바스크립트로 style을 설정할 때는 text-decoration이 아닌!! 'textDecoration'이라 쓰기.
        color : 'gray',
      }

      /* Toggle 버튼 클릭시 실행 */
      const onToggle = () => {
        toggle.value = !toggle.value; // toggle ref를 반대로 바꿔줌. ( true => false 또는 false => true)
      }

      /* todos 데이터베이스를 조회해서 가져오는 함수 */
      const getTodos = async (page = currentPage.value ) => {
        currentPage.value = page; // active클래스(포커스) 적용을 위함
        try{
          const res = await axios.get(
            `http://localhost:3000/todos?_page=${page}&_limit=${limit}`
          ); // 모든 todos데이터를 가져옴 + pagination 추가!!
          console.log(res.headers['x-total-count']); // headers안의 [ x-total-count ] = 총 데이터 갯수
          numberOfTodos.value =  res.headers['x-total-count'];
          // console.log(res.data); // res.data = todos데이터 배열
          todos.value = res.data;
        } catch (err) {
          //응답 실패 시 실행됨.
          error.value = 'ERROR : Something went wrong!';
          console.log(err);
        }
      }
      getTodos();

      

      // * onSubmit => addTodo로 함수이름 변경!
      const addTodo = async ( todo ) => { // todo 파라미터 : 자식컴포넌트에서 받아온 데이터
        error.value='';
        console.log("start");
        
        try{
          // 1) 데이터베이스에 투두를 저장(post http request)
          const res = await axios.post('http://localhost:3000/todos', { // 비동기+await => 기다렸다가 결과물을 리턴해주면 , 변수 res에다가 결과값을 저장함.
            // id는 자동생성되므로 안보내도 됨! 
            subject : todo.subject,
            completed : todo.completed,
          });
          // 2) response가 오면 , todos 배열에 저장
          console.log(res);
          todos.value.push(res.data);        
        } catch(err){
          //응답 실패 시(err) 실행됨.
          error.value = 'ERROR : Something went wrong!';
          console.log(err);
        }
        // .then( res => { // js에서 요청은 비동기적(응답 상태와 상관없이 다음 동작을 수행)으로 일어나게됨.(응답이 promise로 오게됨.). 그래서 응답이 끝나기도 전에 다음줄이 실행됨..(오류) => 그래서 then을 씀!
        //   //  .then () : 위 요청(axios.post)이 끝나서 응답이 왔을 때! 실행되게 됨!!
        //   console.log(res);

        //   // 2) response가 오면 , todos 배열에 저장
        //   todos.value.push(res.data);        
        // }).catch( err => {
        //   // 응답 실패 시(err) 실행됨.
        //   error.value = 'ERROR : Something went wrong!';
        //   console.log(err);
        // });
        console.log("end"); // async + await사용 => start-> res데이터정보 -> end !!!
      };


      /* todo리스트 체크박스 toggle이벤트 */
      const toggleTodo = async (index) => {
        error.value='';
        const id = todos.value[index].id; // index로 id찾아내기

        try{
           // 1) db에서 patch
          await axios.patch('http://localhost:3000/todos/' + id, {
            completed : !todos.value[index].completed
          });

          // 2) 1에대한 응답이 돌아오면(patch성공), todos배열에서 patch(completed: true=>false=>true=>...)
          todos.value[index].completed = !todos.value[index].completed;

        } catch (err) {
          //응답 실패 시(err) 실행됨.
          error.value = 'ERROR : Something went wrong!';
          console.log(err);
        }

      }

      

      /* todo 삭제버튼 */
      const deleteTodo = async ( index ) => {
        // erorr문구를 empty string으로
        error.value = '';

        const id = todos.value[index].id; // index로 id찾아내기
        try{
          // 1) db에서 delete 
          await axios.delete('http://localhost:3000/todos/' + id );
          

          // 2) 1에대한 응답이 돌아오면(delete성공), todos배열에서 삭제
          todos.value.splice( index, 1); // todos배열에서, index(삭제버튼을 누른 todo의 번호)부터 1개만 지워줌!!
        
        } catch (err) {
          //응답 실패 시(err) 실행됨.
          error.value = 'ERROR : Something went wrong!';
          console.log(err);
        }
       
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
        getTodos, // todos데이터들을 db에서 가져오기
        addTodo,
        toggleTodo,
        deleteTodo, // todo 삭제버튼
        count,
        doubleCountComputed,
        doubleCountMethod,
        searchText,
        filteredTodo,
        error,
        numberOfPages,
        currentPage, // 
        
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