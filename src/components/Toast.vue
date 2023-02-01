<!--
    '@/composables/toast'에서 useToast를 import해서 사용함.
    여러개의 toast들을 띄울 수 있도록  vuex state- toasts 배열을 가져와서 수정함. 
    여러개의 toast들에 transition을 주기 위해, transition-group으로 설정함.
-->

<template>
    <div class="toast-box">
        <transition-group name="slide">
            <div 
                v-for="toast in toasts"
                class="alert" 
                :class = " `alert-${toast.type}` "
                role="alert"
            >
                {{ toast.message }}
            </div>
        </transition-group>
    </div>
   
</template>

<script>
    import { useToast } from '@/composables/toast';
export default {

    setup() {
        const { toasts } = useToast();

        return{
            toasts
        }
    }

}
</script>

<style scoped>
    .toast-box{
        position:fixed;
        top: 10px;
        right: 10px;
    }

    /* Toast transition */
    .slide-enter-active,
    .slide-leave-active{
        transition : all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to{
        opacity: 0; /* 0(투명) -> 1(선명) */
        transform : translateY(-30px);
    }

    .slide-enter-to,
    .slide-leave-from{
        opacity: 1; /* 1 -> 0 */
        transform : translateY(0);
    }

</style>