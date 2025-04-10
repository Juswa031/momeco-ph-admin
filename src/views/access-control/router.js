const PageBody = () => import("@/components/PageBody.vue");
const AccessControlPage = () => import("@/views/access-control/views/AccessControlPage.vue");

const moduleRoute = {
    path: "/access-control",
    meta: { requireAuth: true },
    component: PageBody,
    children: [
        {
            path: '',
            name: 'access-control-list',
            component: AccessControlPage,
            meta: { requireAuth: true },
        }
    ]
}

export default router => {
    router.addRoute(moduleRoute);
};
