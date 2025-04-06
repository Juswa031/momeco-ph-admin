const PageBody = () => import("@/components/PageBody.vue");
const OrderListPage = () => import("@/views/order/views/OrderListPage.vue");
// const OrderDetailsPage = () => import("@/views/orders/views/OrderDetailsPage.vue");

const moduleRoute = {
    path: "/order",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'order-list',
            component: OrderListPage,
            meta: { requireAuth: true },
        }
        // {
        //     path: 'details/:id',
        //     name: 'order-details',
        //     component: OrderDetailsPage
        // },
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
