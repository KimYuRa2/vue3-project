/*
    프로젝트를 build하게되면
    index.html-<!-- built files will be auto injected --> 여기에 js script들이 자동으로 들어가게 됨.!!
    그러면 제일먼저 실행되는 파일이 main.js파일이다.
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // vue router
import store from './store'; // store폴더(vuex관리용폴더) import

createApp(App).use(store).use(router).mount('#app') // 최상위 컴포넌트인 App을 id가 app인 div(index.html파일참고) 에 넣어줌.
