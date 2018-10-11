import Vue from 'vue'
import Vuex from 'vuex'
import Global from './global'

Vue.use(Vuex)

const modules = {
  Global
}

export default new Vuex.Store({
  modules
})