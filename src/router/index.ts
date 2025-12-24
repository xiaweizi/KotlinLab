import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 引入页面组件
const LearnCenter = () => import('@/views/LearnCenter.vue')
const LessonPage = () => import('@/views/LessonPage.vue')
const CompilerPage = () => import('@/views/CompilerPage.vue')

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/learn'
  },
  {
    path: '/learn',
    name: 'learn-center',
    component: LearnCenter,
    meta: {
      title: 'Kotlin 学习中心'
    }
  },
  {
    path: '/learn/day/:day(\\d+)',
    name: 'lesson',
    component: LessonPage,
    meta: {
      title: '课程详情'
    },
    props: true
  },
  {
    path: '/editor',
    name: 'editor',
    component: CompilerPage,
    meta: {
      title: 'Kotlin 编辑器'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'Kotlin 学习系统'
  next()
})

export default router
