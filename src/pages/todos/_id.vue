<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">
    Loading..
  </div>
  <form v-else>
    <div class="form-group">
        <label>Todo Subject</label>
        <input v-model="todo.subject" type="text" class="form-control"/>
    </div>
    <button class="btn btn-primary">Save</button>
  </form>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import { ref } from '@vue/reactivity';

export default {
    setup(){
        const route = useRoute(); // route정보 받아옴
        const todo = ref(null);
        const loading = ref(true); // todo를 null로 설정해둬서 처음 페이지 띄울 때 콘솔에 에러가 뜸 => getTodo함수 실행 후  todo.value = res.data;로 todo값 받아오면, form이 뜨도록 하기위한 설정!
        console.log(route.params.id); // route.params.id = id정보 접근 가능

        /* id로 todo정보 db에 요청하고 받아오기 */
        const getTodo = async() => {
            const res = await axios.get('http://localhost:3000/todos/' + route.params.id);
            console.log(res);
            todo.value = res.data; // res.data => {subject: 'dfasd', completed: false, id: 22}
            loading.value = false;
        }
        getTodo();

        return{
            todo,
            loading,

        }

        
    }
}
</script>

<style>

</style>