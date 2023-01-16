<template>
    <form
      @submit.prevent = "onSubmit"
    >
      <div class="d-flex">
        <!-- todo 입력창 -->
        <div class="flex-grow-1 mr-2">
          <input 
            type="text" 
            v-model = "todo"
            class = "form-control"
            placeholder="Type new to-do"
          >
        </div>

        <!-- todo add버튼-->
        <div>
          <button 
            type="submit"
            class="btn btn-outline-primary" 
          >
            Add
          </button>
        </div>

      </div>

      <!--유저가 아무것도 안쓰고 추가를 할때마다 에러메세지를 띄우므로(자주 바뀌므로) v-if대신 v-show를 쓰는 것이 효율적! -->
      <div 
        v-show="hasError" 
        style="color:red;"
      >
        Error! This field cannot be empty.
      </div>
      
    </form>
</template>

<script>
    import { ref } from 'vue';

    export default {
      emits : [ 'add-todo' ],
        setup( props, { emit } ) {
            const todo = ref( '' ); // 처음 input박스는 공란('')으로 설정
            const hasError = ref(false); // 에러확인용

            const onSubmit = () => {
                if(todo.value === ''){ // todo 값이 공란이면
                    hasError.value = true; // 에러
                }else{ // todo 값이 공란이 아님(에러없음)
                
                    //submit을 하면, context.emit('add-todo', {... 이부분이 실행되고,'add-todo'이벤트를 통해, id,subject,completed데이터를 부모컴포넌트로 보내준다.
                    //그러면 App.vue - <TodoSimpleForm @add-todo="addTodo" /> 에서 addTodo함수가 실행되는 것.
                    emit('add-todo', {  // * 자식컴포넌트 => 부모컴포넌트로 이벤트('add-todo')보내기. context.emit('이벤트이름', {부모컴포넌트로 보내주고싶은 데이터});
                        id : Date.now(), // 유니크한 key를 만들어내기 위함.
                        subject : todo.value,
                        completed : false, // todo리스트 체크박스 확인 
                    });
                    hasError.value = false; // 잘 써서 추가가 됐으면, 에러 없음으로 다시 바꿔줌!
                    todo.value = ''; // todo 추가하고 나면, empty string으로 input란 비우기.
                }
                
            };

            return{
                todo,
                hasError,
                onSubmit,
            }
        }

    }
</script>

<style>

</style>