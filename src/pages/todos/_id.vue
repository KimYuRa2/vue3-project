<!-- Todo 수정페이지(editing form) : TodoForm 컴포넌트 사용 -->

<template>
  <h1>To-Do Page</h1>

  <TodoForm :editing="true"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';
export default {
    components: {
        TodoForm,
    },
    
    setup(){
        
    }
}
</script>

<style>

</style>