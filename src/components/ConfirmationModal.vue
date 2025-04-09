<script>
export default {
    props: {
        target: {
            type: String,
            required: true
        }
    },
    methods: {
        removeData(is_deleted) {
            this.$emit('isDeleted', is_deleted)
            this.$refs.closeConfirmationModal.click()
        }
    },
}
</script>

<template>
    <div class="modal fade" :id="target" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" :aria-labelledby="`${target}Label`" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" :id="`${target}Label`">Confirmation</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3">
                        <div class="col-12 text-center">
                            <img src="@/assets/images/confirmation.png" alt="confirmation" width="200"/>
                        </div>
                        <div class="col-12 text-center">
                            <p>Are you sure you want to delete this data?</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-2" @click="removeData(true)">Yes</button>
                    <button type="button" class="btn btn-1" data-bs-dismiss="modal" ref="closeConfirmationModal" @click="removeData(false)">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
