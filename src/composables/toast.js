import { ref, onUnmounted } from 'vue';

export const useToast = () => {

    /* Toast */
    const showToast = ref(false); // Toast
    const toastMessage = ref(''); // Toast message
    const toastAlertType = ref(''); // 
    const timeout = ref(null);
    /* Toast 띄우기 */
    const tiggerToast = ( message, type='success' ) => {
        toastMessage.value = message; // 받아온 message를 toastMessage에 저장. 
        toastAlertType.value = type;
        showToast.value = true;
        
        timeout.value = setTimeout( () => {
            console.log('hello');
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000);
    }

    onUnmounted( ()=>{ // 메모리 정리 시 유용함.
        console.log('onUnmounted');
        clearTimeout(timeout.value); //tiggerToast함수가 실행되고, 5초가 지나기 전에 다른 페이지로 이동하면, setTimeout이 멈추게됨.
    })

    return{
        showToast,
        toastMessage,
        toastAlertType,
        tiggerToast,
        //timeout//내부적으로만 사용하기때문에 return할 필요 없음
    }
}