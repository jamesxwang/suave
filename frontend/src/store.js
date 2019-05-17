import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	loginStatus: 0,
	isLoading: false
  },
  mutations: {
	setLogin: (state, loginStatus) => {
		state.loginStatus = loginStatus
	},
	setLoading: (state, isLoading) => {
		state.isLoading = isLoading
	}
  },
  actions: {

  }
})
