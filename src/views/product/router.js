const PageBody = () => import("@/components/PageBody.vue");
const ProductListPage = () => import("@/views/product/views/ProductListPage.vue");
const ProductDetailsPage = () => import("@/views/product/views/ProductDetailsPage.vue");

const moduleRoute = {
    path: "/product",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'product-list',
            component: ProductListPage,
            meta: { requireAuth: true },
        },
        {
            path: 'details/:id?',
            name: 'product-details',
            component: ProductDetailsPage,
            meta: { requireAuth: true },
        },
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
