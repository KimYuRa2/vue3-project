<!-- todo 리스트 -->

<template>
    <div
      v-for = "(item, index) in items"
      :key = "item.id"
      class="card mt-2"
    >
        <!--TodoList.vue의 <List></List>태그 안의 내용들이 여기 들어옴-->
        <slot :item="item" :index="index"></slot>
    </div>
</template>

<script>
export default {
    props : {
        items : {
            type : Array,
            required : true,
        }
    }

}
</script>

<style>

</style>