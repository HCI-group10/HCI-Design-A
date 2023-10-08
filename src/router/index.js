// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '', // This is the launch page
        name: 'LaunchPage',
        component: () => import(/* webpackChunkName: "launch" */ '@/views/LaunchPage.vue'),
      },
      {
        path: 'home', // This is the home page nested under the launch page
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'table-item/:id', // This is the table item navigation page with a dynamic route parameter
        name: 'TableItem',
        component: () => import(/* webpackChunkName: "table-item" */ '@/views/TableItem.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

