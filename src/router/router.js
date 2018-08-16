import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import db from '@/firebase/init.js'
import store from '@/store/store.js'
import login from '@/components/login'
import editprofile from '@/components/users/edit-profile'
import profile from '@/components/users/profile'
import createproject from '@/components/projects/create-project'
import project from '@/components/projects/project'
import editproject from '@/components/projects/edit-project'
import myprojects from '@/components/projects/my-projects'
import allprojects from '@/components/projects/all-projects'
import allusers from '@/components/users/all-users'
import chat from '@/components/chat/chat'
import allchats from '@/components/chat/all-chats'
import home from '@/components/static/home'
import cities from '@/components/static/cities'
import workshops from '@/components/static/workshops'
import news from '@/components/static/news/news'
import about from '@/components/static/about'
import connect from '@/components/static/connect'
import testimonials from '@/components/static/testimonials'
import privacy from '@/components/static/privacy'
import userprivacy from '@/components/static/userprivacy'
import news1 from '@/components/static/news/1'
import news2 from '@/components/static/news/2'
import projectchat from '@/components/projects/projectchat'

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
