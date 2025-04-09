<script>
export default {
    props: {
        target: {
            type: String,
            required: true
        }
    },
    mounted() {
        
    }
}
</script>

<template>
    <div class="modal fade" :id="target" :data-bs-backdrop="'static'" :aria-labelledby="`${target}Label`" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
