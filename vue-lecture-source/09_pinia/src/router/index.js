import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/main/MainView.vue";
import {useAuthStore} from "@/stores/auth.js";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name : 'main',
      component : MainView
    },
    {
      path: '/login',
      name : 'login',
      component : () => import('@/views/main/user/LoginView.vue')
    },
    {
      path: '/register',
      name : 'register',
      component : () => import('@/views/main/user/RegisterView.vue')
    },
    {
      path: '/mypage',
      name : 'mypage',
      component : () => import('@/views/main/user/MyPageView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

// 전역 가드 (라우팅 전 확인하여 라우팅 여부 결정 가능)
router.beforeEach(to => {

  const authStore = useAuthStore();
  // 인증이 되어야만 하는 페이지인데 인증이 되어 있지 않다면 로그인 페이지로 이동
  if(to.meta.requiresAuth && !authStore.isAuthenticated) {
    return{
      name:'login',
      query : {redirect: to.fullPath}

    }
  }

  // 로그인, 회원가입 페이지에 이미 로그인된 상태로 접근하면 메인으로 이동
  if((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
    return{name :'main'}
  }
  // 그 외에는 그대로 라우팅 처리함
})



export default router
