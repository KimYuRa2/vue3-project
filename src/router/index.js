/* router */

import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter ({
    history : createWebHistory(),
    routes : [ // url정보
        {
            path : '/', // url
            name : 'Home',
            component : Home
        },
        {
            path : '/todos', // url
            name : 'Todos',
            component : Todos
        },
        {
            /* 수정페이지 */
            path : '/todos/:id', // url
            name : 'Todo',
            component : Todo
        }
    ]
});

// 1 /home   2 /todos   3 /todos/create   4 /todos/:id

export default router;