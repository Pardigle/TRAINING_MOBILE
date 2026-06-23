import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/Day7/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tasks'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tasks'
      },
      {
        path: 'tasks',
        component: () => import('@/views/Day7/TasksPage.vue'),
      },
      {
        path: 'completed',
        component: () => import('@/views/Day7/CompletedPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Day7/SettingsPage.vue')
      },
      {
        path: 'tasks/:id',
        component: () => import('@/views/Day7/TaskDetailPage.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
