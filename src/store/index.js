import { createStore } from 'vuex';

export default createStore({
    state : { // 이 안의 state들을 App.vue같은 컴포넌트에서 접근해서 가져다사용할 수 있게됨 
        /* Toast */
        showToast : false,
        toastMessage : '',// Toast message
        toastAlertType : '', 
        timeout : null
    }
})