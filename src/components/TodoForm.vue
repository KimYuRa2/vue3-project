<template>
    <div v-if="loading">
    Loading..
  </div>
  <form 
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
        <div class="col-6">
            <!-- <div class="form-group">
                <label>Subject</label>
                <input 
                    v-model="todo.subject" 
                    type="text" 
                    class="form-control"
                >

                <div v-if="subjectError" class="text-red">
                    {{ subjectError }}
                </div>
            </div> -->
            <Input 
                label="Subject" 
                v-model:subject="todo.subject"
                :error="subjectError" 
            />
        </div>

        <!-- status -(completed 버튼 ) -->
        <div v-if="editing" class="col-6">
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

        <!-- Body(textarea) -->
        <div class="col-12">
            <div class="form-group">
                <label>Body</label>
                <textarea v-model="todo.body" class="form-control" cols="30"></textarea>
            </div>
        </div>
    </div>
    
    <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="!todoUpdated"
    >
        {{ editing ? 'Update' : 'Create' }}
    </button>

    <button 
        class="btn btn-outline-dark ml-2" 
        @click="moveToTodoListPage"
    >
        Cancel
    </button>
  </form>

    <!-- Toast 컴포넌트 -->
    <transition name="fade">
        <Toast 
            v-if="showToast"
            :message = "toastMessage"
            :type="toastAlertType"
        />
    </transition>
   
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed, onUpdated } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue'

export default {
    components: {
        Toast,
        Input,
    },
    props : {
        editing : {
            type: Boolean, // 기본적으로 TodoForm은 Create Form으로 사용하고, default가 true인 다른 컴포넌트에서는 edit 기능도 사용가능하도록.
            default: false,
        }
    },
    setup(props){
        const route = useRoute(); // route정보 받아옴
        const router = useRouter(); // route정보 받아옴
        const todo = ref({
            subject : '',
            completed : false, // 처음 생성할 때 Status값 설정 불필요함. editing(수정페이지)일때만 필요.
            body : '',
        });
        onUpdated( () => {
            console.log(todo.value.subject);
        })
        const subjectError = ref(''); 
        const originalTodo = ref(null); // 수정전Todo
        const loading = ref(false); // todo를 null로 설정해둬서 처음 페이지 띄울 때 콘솔에 에러가 뜸 => getTodo함수 실행 후  todo.value = res.data;로 todo값 받아오면, form이 뜨도록 하기위한 설정!
        
        /* Toast */
        const {
          showToast,
          toastMessage,
          toastAlertType,
          tiggerToast
        } = useToast();
        // const showToast = ref(false); // Toast
        // const toastMessage = ref(''); // Toast message
        // const toastAlertType = ref(''); // Toast
        // const timeout = ref(null);
        // /* Toast 띄우기 */
        // const tiggerToast = ( message, type='success' ) => {
        //     toastMessage.value = message; // 받아온 message를 toastMessage에 저장. 
        //     toastAlertType.value = type;
        //     showToast.value = true;
            
        //     timeout.value = setTimeout( () => {
        //         console.log('hello');
        //         toastMessage.value = '';
        //         toastAlertType.value = '';
        //         showToast.value = false;
        //     }, 5000);
        // }


        const todoId = route.params.id;
        console.log(route.params.id); // route.params.id = id정보 접근 가능

        /* Subject Input 변경사항 가져와서, subject 업데이트  => v-model사용으로 필요없어짐*/
        // const updateTodoSubject = (newValue) => {
        //     todo.value.subject=newValue;
        // }

        // onUnmounted( ()=>{ // 메모리 정리 시 유용함.
        //     console.log('onUnmounted');
        //     clearTimeout(timeout.value); //tiggerToast함수가 실행되고, 5초가 지나기 전에 다른 페이지로 이동하면, setTimeout이 멈추게됨.
        // })

        /* id로 todo정보 db에 요청하고 받아오기 */
        const getTodo = async() => {
            loading.value = true; // editing페이지이면(todo정보 필요함), loading 일어나게
            try{
                const res = await axios.get('http://localhost:3000/todos/' + todoId);
                console.log(res);
                todo.value = { ...res.data }; // res.data => {subject: 'dfasd', completed: false, id: 22}
                originalTodo.value = { ...res.data };  // spread객체(...)로 만들어서 새로운 객체로 만들기.(todo와 originalTodo의 주소가 같으면 둘중 하나가 값을 변경될시 값이 같이 변경되기 때문. )
                loading.value = false; // todo정보 응답받으면, false로 바꿈
            } catch (err) {
                loading.value = false;
                tiggerToast('Something went wrong!', 'danger');// toast사용
                console.log(err);
            }
        }

        /* editing 페이지이면, todo정보 가져옴. */
        if( props.editing){
            getTodo();
        }
        

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        }

        const moveToTodoListPage = () => {
            // useRouter 이용해서 TodoList페이지로 이동하기.
            router.push({
                name: 'Todos'
            })
        }

        

        /* db에 todo변경 요청보내기 */
        const onSave = async() => { //editing or not (수정페이지인가 생성페이지인가)
            
            // 폼 validation
            subjectError.value = '';

            if( !todo.value.subject ){ // subject칸이 비어있으면
                subjectError.value = 'Subject is required!' ;
                return; // 에러 - 요청 보내지 않고 리턴
            }

            try{ 
                let res;
                const data = {
                    subject : todo.value.subject,
                    completed : todo.value.completed,
                    body : todo.value.body,
                };

                if(props.editing){ //editing === true (수정페이지)
                    res = await axios.put('http://localhost:3000/todos/' + todoId, data );
                    originalTodo.value = { ...res.data }; // 저장이 끝나고나면, save버튼을 다시 disabled시킨다.
                } else{ // (Create페이지)
                    res = await axios.post('http://localhost:3000/todos', data );

                    // 생성하고나면, input박스를 empty string으로 비운다.
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                

                // console.log(res);
                originalTodo.value = { ...res.data }; // 저장이 끝나고나면, save버튼을 다시 disabled시킨다.
                
                // Toast
                const message = 'Successfully ' + (props.editing ? 'Updated': 'Created') + '!';
                tiggerToast(message); // tiggerToast함수에 message('Successfully saved!') 보내기
            } catch (err){
                tiggerToast('Something went wrong!', 'danger'); // toast사용
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
            subjectError,

        }

        
    }
}
</script>


<style scoped>
    .text-red{
        color:red;
    }

    /* transition 1 - opacity사용해서 나타났다 사라짐 */
    /* .fade-enter-active,
    .fade-leave-active{
        transition : opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to{
        opacity: 0; 
    }

    .fade-enter-to,
    .fade-leave-from{
        opacity: 1; 
    } */


    /* transition 2 -  */
    .fade-enter-active,
    .fade-leave-active{
        transition : all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to{
        opacity: 0; /* 0(투명) -> 1(선명) */
        transform : translateY(-30px);
    }

    .fade-enter-to,
    .fade-leave-from{
        opacity: 1; /* 1 -> 0 */
        transform : translateY(0);
    }
</style>