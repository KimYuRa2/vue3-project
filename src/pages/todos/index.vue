<!-- Todo 리스트 페이지 -->

<template>
    <div>

      <div class="d-flex justify-content-between mb-3">
        <h2>To-Do List</h2>

        <!-- Todo 생성페이지로 이동 -->
        <button 
          class="btn btn-primary"
          @click="moveToCreatePage"
        >
          Create Todo
        </button>

      </div>
  
      <!-- todo 검색 -->
      <input 
        type="text" 
        v-model = "searchText"
        class = "form-control"
        placeholder="Search"
        @keyup.enter="searchTodo"
      >
  
      <hr/>
  
      <!--에러메세지-->
      <div style="color:red;backgroundColor:yellow;">
        {{ error }}
      </div>
  
  
  
      <!-- todo 리스트가 공란일 때 띄울 텍스트 -->
      <div v-if = "!todos.length">
        추가된 Todo가 없습니다. There is nothing to display.
      </div>
  
      <!-- TodoList컴포넌트 사용 -->
      <TodoList 
        :todos="todos"  
        @toggle-todo="toggleTodo" 
        @delete-todo="deleteTodo"
      />
  
      <hr/>
  
      <!-- pagination컴포넌트 사용 -->
      <Pagination 
        v-if="todos.length"
        :numberOfPages="numberOfPages"
        :currentPage="currentPage"
        @click="getTodos"
      />

  
    </div>
    
    <!-- Toast 컴포넌트 : App.vue로 옮김 -->

</template>
  
<script>
    import { ref, computed , watch } from 'vue'; // reactive는 객체나 배열에서만 사용 가능!
    import TodoList from '@/components/TodoList.vue';
    import axios from '@/axios'; 
    import { useToast } from '@/composables/toast';
    import { useRouter } from 'vue-router';
    import Pagination from '@/components/Pagination.vue';
  
    export default{
      components : {
        TodoList,
        Pagination,
      },
  
      setup(){
        const router = useRouter();
        const toggle = ref(false);
        const todos = ref( [] ); // 처음 todo리스트는 빈 배열으로 설정
        const error = ref(''); // 에러메세지
        const searchText = ref(''); // 검색 텍스트
        /* Pagination */
        const numberOfTodos = ref(0);  // 총 todo 갯수 // initial paginagion: 0 
        const limit = 5; // 페이지당 보여줄 데이터갯수
        const currentPage = ref(1); // 처음 보여줄 페이지(현재페이지 : 기본 1)
          
        /* pagination 총 페이지 수 */
        const numberOfPages = computed ( () => {
          return Math.ceil(numberOfTodos.value/limit); // 총todo갯수/페이지당갯수 올림계산 = 총 페이지 수
        })
        

        /* Toast */
        const {
          showToast,
          toastMessage,
          toastAlertType,
          tiggerToast
        } = useToast();

        
        const todoStyle = {
          textDecoration : 'line-through', //자바스크립트로 style을 설정할 때는 text-decoration이 아닌!! 'textDecoration'이라 쓰기.
          color : 'gray',
        }
  
        /* Toggle 버튼 클릭시 실행 */
        const onToggle = () => {
          toggle.value = !toggle.value; // toggle ref를 반대로 바꿔줌. ( true => false 또는 false => true)
        }
  
        /* todos 데이터베이스를 조회해서 가져오는 함수 (+ pagination) */
        const getTodos = async (page = currentPage.value ) => {
          currentPage.value = page; // active클래스(포커스) 적용을 위함
          try{
            const res = await axios.get(
              `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
            ); // (페이지네이션)현재페이지의 todos데이터를 limit개 가져옴 +  (검색)input에 입력한 searchText.value === subject면 가져옴. + (정렬)_sort=id&_order=desc
            numberOfTodos.value =  res.headers['x-total-count']; // headers안의 [ x-total-count ] = 총 데이터 갯수
            todos.value = res.data; // res.data = todos데이터 배열
          } catch (err) {
            //응답 실패 시 실행됨.
            error.value = 'ERROR : Something went wrong!';
            console.log(err);
            tiggerToast('Something went wrong!', 'danger');
          }
        }
        getTodos();// 처음 페이지 접속시, subject_like=${searchText.value}가 ‘’(empty string)이므로 현재페이지의 모든 todos를 다 가져옴.
  
        
        /* todo 데이터 추가 (db/local) */
        const addTodo = async ( todo ) => { 
          error.value='';
          console.log("start");
          
          try{
            // 1) 데이터베이스에 투두를 저장(post http request)
            await axios.post('todos', { 
              // id는 자동생성되므로 생략 
              subject : todo.subject,
              completed : todo.completed,
            });
  
            // 2) response가 오면 , todos 배열에 저장
            // todos.value.push(res.data); 
  
            // 문제점 수정 (1) : pagination때문에 추가시 한페이지에 6개되는 문제
            getTodos(1); //재정렬! 1페이지로 이동 (response가 오면 , todos 배열에 저장 후 재정렬)
  
          } catch(err){
            //응답 실패 시(err) 실행됨.
            error.value = 'ERROR : Something went wrong!';
            console.log(err);
            tiggerToast('Something went wrong!', 'danger');// toast사용
          }

          console.log("end"); 
        };
  
  
        /* todo리스트 체크박스 toggle이벤트 */
        const toggleTodo = async (index , checked) => {
          error.value='';
          const id = todos.value[index].id; // index로 id찾아내기
  
          try{
             // 1) db에서 patch
            await axios.patch('todos/' + id, {
              completed : checked
            });
  
            // 2) 1에대한 응답이 돌아오면(patch성공), todos배열에서 patch(completed: true=>false=>true=>...)
            todos.value[index].completed = checked
  
          } catch (err) {
            //응답 실패 시(err) 실행됨.
            error.value = 'ERROR : Something went wrong!';
            console.log(err);
            tiggerToast('Something went wrong!', 'danger');
          }
  
        }
  
        
  
        /* todo 삭제버튼 */
        const deleteTodo = async ( id ) => { 
          // erorr문구를 empty string으로
          error.value = '';

          try{
            // 1) db에서 delete 
            await axios.delete('todos/' + id );
            
  
            // 2) 1에대한 응답이 돌아오면(delete성공), todos배열에서 삭제
            // todos.value.splice( index, 1); // todos배열에서, index(삭제버튼을 누른 todo의 번호)부터 1개만 지워줌!!
          
            // 문제점 수정 (2) : pagination때문에 삭제시 한페이지에 5개 이하가 되는 문제
            getTodos(1); // 재정렬! 1페이지로 이동  (response가 오면 , todos 배열에서 삭제 후 재정렬)
  
  
          } catch (err) {
            //응답 실패 시(err) 실행됨.
            error.value = 'ERROR : Something went wrong!';
            console.log(err);
            tiggerToast('Something went wrong!', 'danger');// toast사용
          }
         
        };
  
  
        /* computed 예제 */
        const count = ref(100);
        const doubleCountComputed = computed( () => {
           // doubleCountComputed에는 항상(별도의 행위를 하지 않아도) count값*2의 값을 가지고있게된다.
          return count.value * 2;
        });
        const doubleCountMethod = () => {
          return count.value * 2;
        };
  

        /* 검색 기능 */
        let timeout = null; // 검색할때, 텍스트를 입력할때마다 watch되어 2초를 다시 세게 되는 문제점을 방지한다.
        let searchTodo = () => { // 엔터치면 바로 db에 검색 요청보내는 함수
          clearTimeout(timeout);
          getTodos(1);
        }
        watch( searchText, () => { // 1) searchText를 보고있다가, 값이 변경되면 밑의 함수 실행.
          clearTimeout(timeout); // 2) 시작하자마자 clearTimeout(timeout); (기존에 timeout을 세고있던게있으면 취소해줌)
          timeout = setTimeout( () => { // 3) 다 reset된 상태에서 새롭게 2초를 걸어줌.
            getTodos(1); // 검색 할때마다 항상 첫페이지 보여주도록 함.
          }, 2000); // 4) 2초 후에 getTodos()함수 실행
          
        })
  

        /* Todo 생성페이지로 이동 */
        const moveToCreatePage = () => {
          router.push({
            name: 'TodoCreate',
          })
        }
        
  
        return{ 
          toggle,
          todos,
          todoStyle,
          onToggle,
          getTodos,
          addTodo,
          toggleTodo,
          deleteTodo, 
          count,
          doubleCountComputed,
          doubleCountMethod,
          searchText, 
          error,
          numberOfPages,
          currentPage, // 현재페이지
          searchTodo,
          showToast,
          toastMessage,
          toastAlertType,
          tiggerToast,
          moveToCreatePage
        }; 
      }
    }
</script>
  
<style>
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