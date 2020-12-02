import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/layout'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        }
      },
      {
        path: 'Record',
        name: 'Record',
        component: () => import('../views/Record/Record')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {// 网页名字
  document.title = to.meta.title


  let user = JSON.parse(localStorage.getItem('user'))//路由守卫

  if (to.path === '/login') next()
  else user ? next() : next('/login')

})

export default router
