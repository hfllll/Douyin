import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(''),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Layout/LayoutPage.vue'),
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: () => import('@/views/Home/HomePage.vue')
                },
                {
                    path: '/shop',
                    component: () => import('@/views/Shop/ShopPage.vue')
                },
                {
                    path: '/detailVideo',
                    component: () => import('@/views/Home/DetailVideo.vue')
                },
                {
                    path: '/publish',
                    component: () => import('@/views/Publish/PublishPage.vue')
                },
                {
                    path: '/message',
                    component: () => import('@/views/Message/MessagePage.vue')
                },
                {
                    path: '/my',
                    component: () => import('@/views/My/MyPage.vue')
                },
                {
                    path: '/info',
                    component: () => import('@/views/My/MyInfo.vue')
                },
                {
                    path:'/infoItem',
                    component:()=>import('@/views/My/myInfoItem.vue')
                }
            ]
        }
    ]
})
export default router