<!-- Todo 생성페이지(editing 불가) : TodoForm 컴포넌트 사용 -->

<template>
  <h1>Create Todo</h1>

  <TodoForm />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';
export default {
  components : {
    TodoForm,

  },
  setup(){

  }

}
</script>

<style>

</style>