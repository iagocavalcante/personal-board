import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' // Vuesax styles
import 'material-icons/iconfont/material-icons.css'
import router from './router'
import './registerServiceWorker'
import i18n from './i18n'
import store from './store'

Vue.use(Vuesax)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const username = window.localStorage.getItem('personal-board') ? JSON.parse(window.localStorage.getItem('personal-board')).Global.username : false
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !username) next('/')
  else next()
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
