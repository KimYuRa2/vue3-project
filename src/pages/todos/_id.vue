<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">
    Loading..
  </div>
  <form 
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
        <div class="col-6">
            <div class="form-group">
                <label>Subject</label>
                <input 
                    v-model="todo.subject" 
                    type="text" 
                    class="form-control"
                >
            </div>
        </div>

        <!-- status -(completed 버튼 ) -->
        <div class="col-6">
            <div class="form-group">
                <label>Status</label>
                <div>
                    <button 
                        type="button"
                        class="btn"
                        :class= "todo.completed ? 'btn-success' : 'btn-danger' "    
                        @click="toggleTodoStatus"
                        >
                        {{ todo.completed ? 'Completed' : 'Incomplete' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
        Save
    </button>

    <button 
        class="btn btn-outline-dark ml-2" 
        @click="moveToTodoListPage"
    >
        Cancel
    </button>
  </form>

    <!-- Toast 컴포넌트 -->
    <Toast 
        v-if="showToast"
        :message = "toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast,
    },
    setup(){
        const route = useRoute(); // route정보 받아옴
        const router = useRouter(); // route정보 받아옴
        const todo = ref(null);
        const originalTodo = ref(null); // 수정전Todo
        const loading = ref(true); // todo를 null로 설정해둬서 처음 페이지 띄울 때 콘솔에 에러가 뜸 => getTodo함수 실행 후  todo.value = res.data;로 todo값 받아오면, form이 뜨도록 하기위한 설정!
        const showToast = ref(false); // Toast
        const toastMessage = ref(''); // Toast message
        const toastAlertType = ref(''); // Toast
        const todoId = route.params.id;
        
        
        console.log(route.params.id); // route.params.id = id정보 접근 가능

        /* id로 todo정보 db에 요청하고 받아오기 */
        const getTodo = async() => {
            try{
                const res = await axios.get('http://localhost:3000/todos/' + todoId);
                console.log(res);
                todo.value = { ...res.data }; // res.data => {subject: 'dfasd', completed: false, id: 22}
                originalTodo.value = { ...res.data };  // spread객체(...)로 만들어서 새로운 객체로 만들기.(todo와 originalTodo의 주소가 같으면 둘중 하나가 값을 변경될시 값이 같이 변경되기 때문. )
                loading.value = false;
            } catch (err) {
                tiggerToast('Something went wrong!', 'danger');
                console.log(err);

            }
        }
        getTodo();

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        }

        const moveToTodoListPage = () => {
            // useRouter 이용해서 TodoList페이지로 이동하기.
            router.push({
                name: 'Todos'
            })
        }

        /* Toast 띄우기 */
        const tiggerToast = ( message, type='success' ) => {
            toastMessage.value = message; // 받아온 message를 toastMessage에 저장. 
            toastAlertType.value = type;
            showToast.value = true;
            
            setTimeout( () => {
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value = false;
            }, 3000);
        }

        /* db에 todo변경 요청보내기 */
        const onSave = async() => {
            try{
                const res = await axios.put('http://localhost:3000/todos/' + todoId, {
                    subject : todo.value.subject,
                    completed : todo.value.completed
                });

                // console.log(res);
                originalTodo.value = { ...res.data }; // 저장이 끝나고나면, save버튼을 다시 disabled시킨다.
                // Toast
                tiggerToast('Successfully saved!'); // tiggerToast함수에 message('Successfully saved!') 보내기
            } catch (err){
                tiggerToast('Something went wrong!', 'danger');
                console.log(err);
            }
        }

        const todoUpdated = computed( () => {
            return !_.isEqual( todo.value, originalTodo.value )
        });

        return{
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,

        }

        
    }
}
</script>

<style>

</style>