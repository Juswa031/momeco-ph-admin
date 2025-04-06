<script>
import { toCurrency } from '@/helpers/text_format';

export default {
    setup() {return { toCurrency }},
    props: {
        calculation: {
            type: Object,
            required: true
        }
    }
}
</script>
<template>
    <div class="card p-4">
        <div class="d-flex justify-content-start flex-wrap gap-2 align-items-center">
            <div class="col-auto d-flex align-items-center gap-2">
                <i class="bi" :class="`bi-${calculation.icon}`"></i>
                <h3 class="g-heading-3 mb-0">{{ calculation.label }}</h3>
            </div>
            <div class="col-12 text-center">
                <h1 class="g-heading-1">
                    {{ calculation.type == 'currency' ? toCurrency(calculation.value) : calculation.value }}
                </h1>
            </div>
        </div>
    </div>
</template>@/helpers/text_format/index.js