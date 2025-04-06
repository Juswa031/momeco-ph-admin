const PageBody = () => import("@/components/PageBody.vue");
const DashboardPage = () => import("../dashboards/views/DashboardPage.vue");

const moduleRoute = {
    path: "/",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: 'home',
            name: 'home',
            component: DashboardPage,
            meta: { requireAuth: true },
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
