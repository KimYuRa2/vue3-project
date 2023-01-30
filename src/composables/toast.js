import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();

    /* Toast */
    //  const showToast = store.state.showToast; 이렇게 값만 가져오는 형식으로는, vuex state에서(src-store-index.js) 값이 변경되었을때 , 여기서 감지하지 못함.
    // => 그래서 값 변경을 감지하기 위해 computed로 감싸줌.
    // const showToast = computed( () => store.state.toast.showToast ); // vuex에 있는 showToast state를 가져와서 showToast에다가 담아두고 사용 // store.state.vuex module이름.state의 이름
    // const toastMessage = computed( () => store.getters['toast/toastMessageWithSmile'] ); // Toast message // store.getters['vuex module이름 / getters의 이름']
    // const toastAlertType = computed( () => store.state.toast.toastAlertType ); // // store.state.vuex module이름.state의 이름

    const toasts = computed( () => store.state.toast.toasts);

    /* Toast 띄우기 */
    const tiggerToast = ( message, type='success' ) => {
        // toastMessage.value = message; // 받아온 message를 toastMessage에 저장. 
        // toastAlertType.value = type;
        // showToast.value = true;
        store.dispatch('toast/tiggerToast',{ message, type }); // action을 dispatch함. (mutation은 commit) // 'vuex module이름/tiggerToast'// {message:message, type:type}
    }

    /* App.vue에서만 toast를 사용할것이기 때문에(=App.vue에서 나가는것은, vue에서 나가는것과 같으므로) clearTimeout(timeout.value) 필요 없음! */
    // onUnmounted( ()=>{ // 메모리 정리 시 유용함.
    //     console.log('onUnmounted');
    //     clearTimeout(timeout.value); //tiggerToast함수가 실행되고, 5초가 지나기 전에 다른 페이지로 이동하면, setTimeout이 멈추게됨.
    // })

    return{
        // showToast,
        // toastMessage,
        // toastAlertType,
        toasts, // Toast transition group
        tiggerToast,
        //timeout//내부적으로만 사용하기때문에 return할 필요 없음
    }
}