<template>
    <!-- todo 리스트 -->
    <div 
      v-for = "(todo, index) in todos"
      :key = "todo.id"
      class="card mt-2"
    >
      <!-- todo 카드 -->
      <div 
        class="card-body p-2 d-flex align-items-center"
        @click = "moveToPage(todo.id)"
      >

        <!-- todo 체크박스 -->
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input" 
            type="checkbox"
            :checked="todo.completed" 
            @change="toggleTodo(index)"
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
    
</template>

<script>
  // import { watchEffect } from 'vue';
  import { useRouter } from 'vue-router';

    export default {
        /* props : ['todos'] 
            => App.vue(부모컴포)의 :todos // TodoList.vue(자식컴포)에서 - props로 - App.vue(부모컴포)의 todos를 받아온다.
            => 이제 TodoList안에서 "todos"에 접근가능하게 됨!!
        */

        //props의 이름(['todos'])뿐만아니라, 오브젝트로 적으면 가져온 props의 type을 정해줄 수도 있음.
        props : {
            todos : {
                /* type종류 : String, Number, Boolean, Array, Object, Function, Promise(or any other constructor) */
                type: Array, // String이라고 할 시, vue warn(오류)이 뜸 
                required : true, //항상 todo리스트 배열이 필요하기 때문.
            }
        },
        emits : [ 'toggle-todo', 'delete-todo' ],
        setup( props, { emit } ) {

            const router = useRouter();

            /* watch Effect */
            // watchEffect( () => {
            //   console.log(props.todos.length);
            // })

            const toggleTodo = (index) => {
              emit('toggle-todo', index); // toggle-todo라는 이벤트로 index를 부모컴포로 보냄

            };

            const deleteTodo = ( index ) => { // 부모컴포넌트(App.vue)의 deleteTodo함수로 index값을 보내주는 함수.
              emit('delete-todo', index); // delete-todo라는 이벤트로 index를 부모컴포로 보냄
            }

            /* todo 카드 클릭시 실행 */
            const moveToPage = (todoId) => {
              console.log(todoId);

              /* 페이지 이동하기 */
              // router.push( '/todos/' + todoId ); // 원하는 페이지로 이동

              /* 컴포넌트의 name을 사용해서 페이지 이동하기 */
              router.push({
                name : 'Todo', // 컴포넌트의 name
                params : {
                  id : todoId // params안에는  path : '/todos/:id'=> /todos 뒤의 /:"id" 를 적기.
                }
              })
            }

            return {
                toggleTodo ,
                deleteTodo,
                moveToPage,

            }
        }
        
    }

</script>

<style>

</style>