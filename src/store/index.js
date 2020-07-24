import Vue from 'vue'
import Vuex from 'vuex'
import Global from './global'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'personal-board',
  storage: localStorage
})

Vue.use(Vuex)

const modules = {
  Global
}

export default new Vuex.Store({
  modules,
  plugins: [vuexPersist.plugin]
})
