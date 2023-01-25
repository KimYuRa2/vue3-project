<template>
    <!-- Todo 수정페이지(editing form) -->
  <h1>To-Do Page</h1>

  <!-- 부모컴포에서 자식컴포를 호출시, 자식컴포 내 v-bind나 :키워드를 통해 데이터를 전달하고, 자식컴포에서 props객체를 통해 데이터를 전달받는 방식-->
  <!-- 자식컴포이름(TodoForm) :props로(자식컴포에게)보낼이름(:editing) = "(부모컴포에서)보낼테이터"-->
  <!-- 자식컴포에서 (:)editing이라는 이름으로, 부모컴포의 true데이터에 접근가능.-->
  <TodoForm :editing="true"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';
export default {
    components: {
        TodoForm,

    },
    props : {
        editing : {
            type: Boolean, // 기본적으로 TodoForm은 Create Form으로 사용하고, default가 true인 다른 컴포넌트에서는 edit 기능도 사용가능하도록.
            default: false,
        }
    },
    setup(){

        return{

        }
    }
}
</script>

<style>

</style>