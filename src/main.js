import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css'
import router from './router'
import './registerServiceWorker'
import i18n from './i18n'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

router.beforeEach((to, from, next) => {
  const storedData = window.localStorage.getItem('global')
  const username = storedData ? JSON.parse(storedData).username : false
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !username) next('/')
  else next()
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
