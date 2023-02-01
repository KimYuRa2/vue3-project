<!-- pagination : 가독성을 위해 src-pages-todos-index.vue에서 페이지네이션 컴포넌트 추출! -->

<template>
    <!-- pagination -->
    <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a 
              v-if = "currentPage !== 1"
              class="page-link" 
              @click = "onClick(currentPage - 1)"
              style="cursor : pointer"
            >
              Previous
            </a>
          </li>
          <li 
            v-for = "page in numberOfPages"
            :key = "page"
            class= "page-item"
            :class= "currentPage === page ? 'active' : '' "
          >
            <a 
              class="page-link" 
              @click="onClick(page)" 
              style="cursor : pointer"
            >
              {{ page }}
            </a>
          </li>
          <li class="page-item">
            <a 
              v-if=" numberOfPages !== currentPage "
              class="page-link" 
              @click = "onClick(currentPage + 1)"
              style="cursor : pointer"
            >
              Next
            </a>
          </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        numberOfPages : {
            type : Number,
            required : true
        },
        currentPage : {
            type : Number,
            required : true
        }
    },
    emits : ['click'],
    setup(props, {emit}) {
        const onClick = (page) => {
            emit('click', page);
        };

        return{
            onClick,
        }
    }

}
</script>

<style>

</style>