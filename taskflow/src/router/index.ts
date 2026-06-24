import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/Day8/TabsPage.vue'

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
        component: () => import('@/views/Day8/TasksPage.vue'),
      },
      {
        path: 'completed',
        component: () => import('@/views/Day8/CompletedPage.vue')
      },
      {
        path: 'settings',
        component: () => import('@/views/Day8/SettingsPage.vue')
      },
      {
        path: 'tasks/:id',
        component: () => import('@/views/Day8/TaskDetailPage.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
