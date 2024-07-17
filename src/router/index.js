
import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
    {
        path: '/',
        name: '青岛澳门路近岸海洋动力灾害数字孪生系统',
        component: () => import('../components/Homepage.vue')
    },
    // {
    //     path: '/BackManage',
    //     name: '海洋探测数据管理系统',
    //     // component: () => import('@/pages/BackManage'),
    //     children: [
    //         {
    //             path: '/Projectbackendmanagement',
    //             name: '项目管理',
    //             // component: () => import('./components/BackSystem/ProjectManage/ProjectManage.vue')
    //         }
    //     ]
    // },
]
const router = createRouter({
    history: createWebHashHistory(),
    mode: "hash",
    routes: routes
})
router.beforeEach((to) => {
    document.title = to.name
})
export default router
