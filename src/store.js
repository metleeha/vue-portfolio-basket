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
    getPortfolioDetail: state => {
      return state.portfolioDetail
    },
    getUpdatePortfolioDone: state => {
      return state.updatePortfolioDone
    }
  }
})
