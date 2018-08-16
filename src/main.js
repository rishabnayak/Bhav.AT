// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import store from './store/store.js'
import firebase from 'firebase'
import './registerServiceWorker'
import VueMasonry from 'vue-masonry-css'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueMasonry)
Vue.use(VueChatScroll)

Vue.config.productionTip = false

/* eslint-disable no-new */
var app = null
firebase.auth().onAuthStateChanged(async () => {
  if (!app) {
    await store.dispatch('setUser')
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
