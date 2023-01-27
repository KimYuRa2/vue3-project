import { createStore } from 'vuex';

export default createStore({
    state : { // 이 안의 state들을 App.vue같은 컴포넌트에서 접근해서 가져다사용할 수 있게됨 
        /* Toast */
        showToast : false,
        toastMessage : '',// Toast message
        toastAlertType : '', 
        // timeout : null
    },
    mutations : {
        UPDATE_TOAST_MESSAGE (state, payload) { // state를 인자로 받아와서, state에 접근해서 state를 변경함 // payload : 원하는 데이터 받아옴
            state.toastMessage = payload;
        },
        UPDATE_TOAST_ALERT_TYPE (state, payload) {
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS (state, payload){
            state.showToast = payload;
        },
        // UPDATE_TOAST_TIMEOUT (state, payload) {
        //     state.timeout = payload;
        // }

    },
    actions : {
        /* Toast 띄우기 */
        tiggerToast ( { commit }, message, type='success' ) { // context객체 안의 commit
            // toastMessage.value = message; // 받아온 message를 toastMessage에 저장. 
            commit('UPDATE_TOAST_MESSAGE', message);// UPDATE_TOAST_MESSAGE mutation을 commit해주고, 데이터를 payload로 넘겨줌
            
            // toastAlertType.value = type;
            commit('UPDATE_TOAST_ALERT_TYPE', type);

            // showToast.value = true;
            commit('UPDATE_TOAST_STATUS', true);
            
            setTimeout( () => {
                /* 초기화 */
                // toastMessage.value = '';
                commit('UPDATE_TOAST_MESSAGE', '');

                // toastAlertType.value = '';
                commit('UPDATE_TOAST_ALERT_TYPE', '');

                // showToast.value = false;
                commit('UPDATE_TOAST_STATUS', false);

            }, 3000);
        }
    },
    getters : { // === computed기능과 같음!(computed와 똑같이, reactive하기 때문에 watch하고있다가 state.toastMessage부분이 변경되면 함수가 일어남 )
        toastMessagewithSmile ( state ) {
            return state.toastMessage + '^_^';
        }
    }
})