import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import db from '@/firebase/init.js'
import store from '@/store/store.js'
const login = () => import ('@/components/login')
const editprofile = () => import ('@/components/users/edit-profile')
const profile = () => import ('@/components/users/profile')
const createproject = () => import ('@/components/projects/create-project')
const project = () => import ('@/components/projects/project')
const editproject = () => import ('@/components/projects/edit-project')
const myprojects = () => import ('@/components/projects/my-projects')
const allprojects = () => import ('@/components/projects/all-projects')
const allusers = () => import ('@/components/users/all-users')
const chat = () => import ('@/components/chat/chat')
const allchats = () => import ('@/components/chat/all-chats')
import home from '@/components/static/home'
const cities = () => import ('@/components/static/cities')
const workshops = () => import ('@/components/static/workshops')
const news = () => import ('@/components/static/news/news')
const about = () => import ('@/components/static/about')
const connect = () => import ('@/components/static/connect')
const testimonials = () => import ('@/components/static/testimonials')
const privacy = () => import ('@/components/static/privacy')
const userprivacy = () => import ('@/components/static/userprivacy')
const news1 = () => import ('@/components/static/news/1')
const news2 = () => import ('@/components/static/news/2')
const projectchat = () => import ('@/components/projects/projectchat')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/news/2',
      name: 'news2',
      component: news2
    },
    {
      path: '/news/1',
      name: 'news1',
      component: news1
    },
    {
      path: '/userprivacy',
      name: 'userprivacy',
      component: userprivacy
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: privacy
    },
    {
      path: '/testimonials',
      name: 'testimonials',
      component: testimonials
    },
    {
      path: '/connect',
      name: 'connect',
      component: connect
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/workshops',
      name: 'workshops',
      component: workshops
    },
    {
      path: '/cities',
      name: 'cities',
      component: cities
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/chat',
      name: 'allchats',
      component: allchats,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: editprofile,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/chat/:uname',
      name: 'chat',
      component: chat,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'allusers',
      component: allusers
    },
    {
      path: '/projects',
      name: 'allprojects',
      component: allprojects
    },
    {
      path: '/myprojects',
      name: 'myprojects',
      component: myprojects,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/profile/:uname',
      name: 'profile',
      component: profile
    },
    {
      path: '/project/:name',
      name: 'project',
      component: project
    },
    {
      path: '/project/:name/chat',
      name: 'projectchat',
      component: projectchat
    },
    {
      path: '/createproject',
      name: 'createproject',
      component: createproject,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/editproject/:name',
      name: 'editproject',
      component: editproject,
      meta:{
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to,from,next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user
    if (user) {
      next()
    }
    else {
      next({name:'login'})
      }
    }
    else {
      next()
  }
})

export default router
