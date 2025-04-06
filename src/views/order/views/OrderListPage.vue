<script>
import OrdersComponent from '../components/OrdersComponent.vue';

export default {
    name: 'OrderListPage',
    components: {
        OrdersComponent
    },
}
</script>
<template>
    <h1 class="g-heading-1 mb-0 mb-4">Order Management</h1>
    <OrdersComponent />
</template>