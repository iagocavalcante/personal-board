import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import i18n from './i18n'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
