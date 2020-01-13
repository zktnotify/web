import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: { name: 'signup' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
				/*
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
				*/
        {
          name: 'signup',
          path: 'signup',
          component: () => import('../components/auth/signup/signup.vue'),
        },
        {
          path: '',
          redirect: { name: 'signup' },
        },
      ],
    },
  ],
})
