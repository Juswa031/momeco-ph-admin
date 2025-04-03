const PageBody = () => import("@/components/PageBody.vue");
const DashboardPage = () => import("../dashboards/views/DashboardPage.vue");

const moduleRoute = {
    path: "/dashboard",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'dashboard',
            component: DashboardPage
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
