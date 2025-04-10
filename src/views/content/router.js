const PageBody = () => import("@/components/PageBody.vue");
const ContentListPage = () => import("@/views/content/views/ContentListPage.vue");
// const OrderDetailsPage = () => import("@/views/orders/views/OrderDetailsPage.vue");

const moduleRoute = {
    path: "/content",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'content-list',
            component: ContentListPage,
            meta: { requireAuth: true },
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
