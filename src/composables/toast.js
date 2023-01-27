import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();

    /* Toast */
    //  const showToast = store.state.showToast; 이렇게 값만 가져오는 형식으로는, vuex state에서(src-store-index.js) 값이 변경되었을때 , 여기서 감지하지 못함.
    // => 그래서 값 변경을 감지하기 위해 computed로 감싸줌.
    const showToast = computed( () => store.state.showToast ); // vuex에 있는 showToast state를 가져와서 showToast에다가 담아두고 사용
    const toastMessage = computed( () => store.getters.toastMessageWithSmile ); // Toast message
    const toastAlertType = computed( () => store.state.toastAlertType ); // 
    // const timeout = computed( () => store.state.timeout );
    /* Toast 띄우기 */
    const tiggerToast = ( message, type='success' ) => {
        // toastMessage.value = message; // 받아온 message를 toastMessage에 저장. 
        // toastAlertType.value = type;
        // showToast.value = true;
        
        // timeout.value = setTimeout( () => {
        //     console.log('hello');
        //     toastMessage.value = '';
        //     toastAlertType.value = '';
        //     showToast.value = false;
        // }, 3000);
        store.dispatch('tiggerToast', message, type); // action을 dispatch함. (mutation은 commit)
    }

    /* App.vue에서만 toast를 사용할것이기 때문에(=App.vue에서 나가는것은, vue에서 나가는것과 같으므로) clearTimeout(timeout.value) 필요 없음! */
    // onUnmounted( ()=>{ // 메모리 정리 시 유용함.
    //     console.log('onUnmounted');
    //     clearTimeout(timeout.value); //tiggerToast함수가 실행되고, 5초가 지나기 전에 다른 페이지로 이동하면, setTimeout이 멈추게됨.
    // })

    return{
        showToast,
        toastMessage,
        toastAlertType,
        tiggerToast,
        //timeout//내부적으로만 사용하기때문에 return할 필요 없음
    }
}