/* vuex - toast모듈 */

export default {
    namespaced : true, // namespaced : true여야 모듈(toast)을 폴더처럼 사용가능.
    state : { 
        /* Toast */
        toasts : [],
    },
    mutations : {
        ADD_TOAST (state, payload) {
            state.toasts.push(payload);
        },
        REMOVE_TOAST (state) {
            state.toasts.shift(); // shift() : 첫번째 아이템을 지워줌
        },

    },
    actions : {
        /* Toast 띄우기 */
        tiggerToast ( { commit }, payload ) { // context객체 안의 commit,, 구조분해하여 사용
            commit('ADD_TOAST', {
                id: Date.now(),
                message: payload.message ,
                type : payload.type,
            })
            
            setTimeout( () => {
                /* 초기화 */
                commit('REMOVE_TOAST');
            }, 10000);
        }
    },
    getters : { // === computed기능과 같음!(computed와 똑같이, reactive하기 때문에 watch하고있다가 state.toastMessage부분이 변경되면 함수가 일어남 )
        toastMessageWithSmile ( state ) {
            return state.toastMessage + '^_^';
        }
    },
}