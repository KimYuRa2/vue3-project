/* router */
// createWebHistory로 Vue Router 이용하기 (App.vue - <router-view/>에 보일 컴포넌트들)

import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';
import TodoCreate from '../pages/todos/create/index.vue';

const router = createRouter ({
    history : createWebHistory(),
    routes : [ // url정보
        {
            /* 홈 */
            path : '/', // url
            name : 'Home',
            component : Home
        },
        {
            /* todo 리스트 */
            path : '/todos', // url
            name : 'Todos',
            component : Todos
        },
        {
            /* todo 생성페이지 */
            path : '/todos/create', // url
            name : 'TodoCreate',
            component : TodoCreate
        },
        {
            /* todo 수정페이지 */
            path : '/todos/:id', // url
            name : 'Todo',
            component : Todo
        }
    ]
});


export default router;