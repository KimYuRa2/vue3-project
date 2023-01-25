<template>
  <!-- Todo 생성페이지(editing 불가) -->
  <h1>Create Todo</h1>

  <!-- 컴포넌트 -->
  <!-- 자식컴포이름(TodoForm) :props로(자식컴포에게)보낼이름(:editing) = "(부모컴포에서)보낼테이터"-->
  <TodoForm />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';
export default {
  components : {
    TodoForm,

  },
  setup(){

    return{

    }
  }

}
</script>

<style>

</style>