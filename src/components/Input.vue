<!-- subject 폼 : 폼을 재사용하기위해, 따로 빼서 컴포넌트를 만듦. -->

<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input 
            :value="subject"
            @input="onInput"
            type="text" 
            class="form-control"
        >

        <!-- subject 입력 에러-->
        <div v-if="error" class="text-red">
            {{ error }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label : {
            type: String,
            required: true,
        },
        error : {
            type: String,
            required: true,
        },
        subject : {
            type: String,
            required: true,
        }
    },
    setup(props, { emit }) {
        const onInput = (e) => {
            // console.log(e.target.value);
            emit('update:subject', e.target.value);
        }

        return{
            onInput,
        }
    }

}
</script>

<style scoped>
    .text-red{
        color:red;
    }
</style>