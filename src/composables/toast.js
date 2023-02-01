// export const useToast = ()로 내보냄 : Toast컴포넌트를 다른 컴포넌트에서도 사용하기 위해 (중복되는 코드를 한곳에 모아두고 가져다쓰기)

import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toasts = computed( () => store.state.toast.toasts); // vuex - state - toasts 배열

    /* Toast 띄우기 */
    const tiggerToast = ( message, type='success' ) => {
        store.dispatch('toast/tiggerToast',{ message, type }); // action을 dispatch함. (mutation은 commit) // 'vuex module이름/tiggerToast'// {message:message, type:type}
    }

    return{
        toasts, // transition group - state 수정 : toasts 배열로 관리 
        tiggerToast,
    }
}