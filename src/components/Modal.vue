<template>
    <!-- Modal -->
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    Delete Todo
                </h5>

                <button type="button" class="close">
                    <!-- x 버튼 -->
                    <span 
                        @click="onClose"
                    >
                        &times;
                    </span>
                </button>

            </div>
            <div class="modal-body">
                Are you sure you want to delete todo?
            </div>
            <div class="modal-footer">
                <!-- close 버튼 -->
                <button 
                    type="button"
                    class="btn btn-secondary" 
                    @click="onClose"
                >
                    Close
                </button>

                <!-- delete 버튼 -->
                <button 
                    type="button" 
                    class="btn btn-danger"
                    @click="onDelete"
                >
                    Delete
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    setup( props, { emit } ) {

        const onClose = () => {
            emit('close');
        }

        const onDelete = () => {
            emit('delete');
        }

        return {
            onClose,
            onDelete,
        }
    }
}
</script>

<style scoped>
    .modal-wrapper{
        position: fixed;
        top: 0;
        left : 0;
        width:100%;
        height: 100%;
        background-color : rgba(0, 0, 0, 0.5);
        z-index : 100;
    }

</style>