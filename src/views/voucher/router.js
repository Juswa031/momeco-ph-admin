const PageBody = () => import("@/components/PageBody.vue");
const VoucherListPage = () => import("@/views/voucher/views/VoucherListPage.vue");

const moduleRoute = {
    path: "/voucher",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'voucher-list',
            component: VoucherListPage,
            meta: { requireAuth: true },
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
