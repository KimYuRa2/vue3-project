<template>
    <form
      @submit.prevent = "onSubmit"
    >
      <div class="d-flex">
        <!-- todo 입력창 -->
        <div class="flex-grow-1 mr-2">
          <input 
            type="text" 
            v-model = "todo"
            class = "form-control"
            placeholder="Type new to-do"
          >
        </div>

        <!-- todo add버튼-->
        <div>
          <button 
            type="submit"
            class="btn btn-outline-primary" 
          >
            Add
          </button>
        </div>

      </div>

      <!--유저가 아무것도 안쓰고 추가를 할때마다 에러메세지를 띄우므로(자주 바뀌므로) v-if대신 v-show를 쓰는 것이 효율적! -->
      <div 
        v-show="hasError" 
        style="color:red;"
      >
        Error! This field cannot be empty.
      </div>
      
    </form>
</template>

<script>
    export default {}
</script>

<style>

</style>