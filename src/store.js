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
    postPortfolioDone: false,
    newTogglePortfolio: false,
    postDetail: {},
    updatePostDone: false,
    postPostDone: false,
    newTogglePost: false,
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
    },
    getPostPortfolioDone: state => {
      return state.postPortfolioDone
    },
    getNewTogglePortfolio: state => {
      return state.newTogglePortfolio
    },
    getPostDetail: state => {
      return state.postDetail
    },
    getUpdatePostDone: state => {
      return state.updatePostDone
    },
    getPostPostDone: state => {
      return state.postPostDone
    },
    getNewTogglePost: state => {
      return state.newTogglePost
    },
  }
})
