const PageBody = () => import("@/components/PageBody.vue");
const ProductListPage = () => import("@/views/product/views/ProductListPage.vue");
const ProductDetailsPage = () => import("@/views/product/views/ProductDetailsPage.vue");
const AddProductPage = () => import("@/views/product/views/AddProductPage.vue");

const moduleRoute = {
    path: "/product",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'product-list',
            component: ProductListPage
        },
        {
            path: 'add',
            name: 'add-product',
            component: AddProductPage
        },
        {
            path: ':id',
            name: 'product-details',
            component: ProductDetailsPage
        },
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
