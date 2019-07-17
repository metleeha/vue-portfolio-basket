import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		accessToken: '',
    user: '',
    commits: [],
    members: {},
    repository: {},
  },
  getters:{
    getMembers: state => {
      return state.members
    }
  }
})
