<!-- todo 리스트 -->

<template>

    <List
      :items="todos"
    >
      <template #default="{item, index}">
          <!-- todo 카드 -->
          <div 
            class="card-body p-2 d-flex align-items-center"
            @click = "moveToPage(item.id)"
            style="cursor:pointer;"
          >

            <!-- todo 체크박스 -->
            <div class="flex-grow-1">
              <input 
                class="ml-2 mr-2"
                type="checkbox"
                :checked="item.completed" 
                @change.stop="toggleTodo(index , $event)"
                @click.stop
              >
              <span
                :class = "{ todo : item.completed }"
              >
                {{ item.subject }}
              </span>
            </div>

            <!-- todo 삭제버튼 -->
            <div>
              <button
                class="btn btn-danger btn-sm"
                @click.stop = "openModal( item.id )"
              >
                Delete
              </button>
            </div>
          </div>
      </template>
    </List>

    <!-- teleport -->
    <teleport to="#modal">
      <!-- 모달창 -->
      <Modal 
        v-if="showModal"
        @close = "closeModal"
        @delete = "deleteTodo"
      />
    </teleport>
    
    
</template>

<script>
  // import { watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import Modal from '@/components/DeleteModal.vue';
  import { ref } from 'vue';
  import List from '@/components/List.vue';

    export default {
        components : {
          Modal,
          List,
        },
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
            const showModal = ref(false);
            const todoDeleteId = ref(null); // 삭제할 todo의 id

            /* watch Effect */
            // watchEffect( () => {
            //   console.log(props.todos.length);
            // })

            const toggleTodo = (index , event) => {
              emit('toggle-todo', index, event.target.checked); // toggle-todo라는 이벤트로 index를 부모컴포로 보냄

            };

            /* 모달창 열기 */
            const openModal = ( id ) => {
              todoDeleteId.value = id; // 삭제할 todo의 id
              showModal.value = true;
            };

            /* 모달창 닫기 */
            const closeModal = () => {
              todoDeleteId.value = null; // 삭제할 todo의 id
              showModal.value = false;
            };

            const deleteTodo = () => { // 부모컴포넌트(App.vue)의 deleteTodo함수로 index값을 보내주는 함수.
              emit('delete-todo', todoDeleteId.value); // delete-todo라는 이벤트로 index를 부모컴포로 보냄
              
              showModal.value = false;
              todoDeleteId.value = null;
            };

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
            };

            return {
                toggleTodo ,
                deleteTodo,
                moveToPage,
                showModal,
                openModal,
                closeModal,

            }
        }
        
    }

</script>

<style>

</style>