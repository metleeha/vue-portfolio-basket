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
    portfolios: {},
    portfolioDetail: {},
    updatePortfolioDone: false,
    postPortfolioDone: false,
    newTogglePortfolios: false,
    posts: {},
    postDetail: {},
    updatePostDone: false,
    postPostDone: false,
    newTogglePost: false,
    isAdmin: false,
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
    getPortfolios: state => {
      return state.portfolios
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
    getNewTogglePortfolios: state => {
      return state.newTogglePortfolios
    },
    getPosts: state => {
      return state.posts
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
    getUser: state => {
      return state.user
    },
    isAdmin(state) {
      return state.isAdmin
    }
  },
  mutations: {
    setUser: function (state, user) {
        state.user = user
      }
  },
})
