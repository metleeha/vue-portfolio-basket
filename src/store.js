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
    portfolioDetail: {},
    updatePortfolioDone: false,
  },
  mutations: {
    setUser: function(state, user){
      state.user = user
    }
  },
  getters:{
    getMembers: state => {
      return state.members
    },
    getCommits: state => {
      return state.commits
    },
    getRepository: state => {
      return state.repository
    },
<<<<<<< HEAD
    getPortfolioDetail: state => {
      return state.portfolioDetail
    },
    getUpdatePortfolioDone: state => {
      return state.updatePortfolioDone
=======
    getuser: state => {
      return state.user
>>>>>>> d218576... Add: divide signin button/userInfo
    }
  }
})
