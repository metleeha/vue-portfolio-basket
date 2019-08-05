<template>
  <div>
    <v-container v-if="!loading">
      <v-layout xs12 justify-center align-content-center>
        <flower-spinner 
          :animation-duration="2500"
          :size="70"
          color="#555A9C"
          class="load-spinner"
        />
      </v-layout>
    </v-container>
    <v-container v-if="loading">
      <!-- edit btn -->
      <v-layout xs12 justify-center class="page-edit" v-if="authCheck()">
        <v-flex xs12 text-xs-center my-5>
          <v-btn @click="newToggle = !newToggle" block flat large :color="newToggle? '#f0bebe':'#3a718c'">
            <v-icon left>fa-chevron-down</v-icon>Edit Portfolio</v-btn>
        </v-flex>
      </v-layout>
      <!-- Portfolio Writer --->
      <transition name="fade">
        <v-layout v-if="newToggle" xs12 justify-center>
          <PortfolioWriter 
            :id="id"
            :ti="title"
            :body="body"
            :imgSrc="imgSrc"
            :update=true />
        </v-layout>
      </transition>

      <!-- Portfolio detail view -->
      <!-- title --> 
      <v-layout xs12 justify-center class="page-header">
        <v-flex xs12>
          <span class="page-title">{{ title }} </span>
        </v-flex>
      </v-layout>
      <!-- Created: Date, Author -->
      <v-layout row class="page-author">
        <v-flex xs12 justify-center>
          <p>by - {{ name }}  ( {{ date }} )</p>
        </v-flex>
      </v-layout>
      <!-- Img -->
      <v-layout class="page-img" v-if="this.imgSrc != ''">
        <v-flex xs12 justify-center>
          <v-img 
            :src="this.imgSrc"
            cover
          ></v-img>
        </v-flex>
      </v-layout>
      <!-- body -->
      <v-layout wrap>
        <v-flex xs12 class="page-body">
          <p>{{ body }}</p>
        </v-flex>
        <!-- btns -->
        <v-flex xs12 row class="page-btn">
          <v-btn large outline color="green" @click="goToPortfolio()">Back</v-btn>
          <v-btn v-if="authCheck()" large outline color="red" @click="deletePortfolio()">DELETE</v-btn>
        </v-flex>
      </v-layout>
      <!-- disqus -->
      <v-layout>
        <v-flex xs12 class="page-disqus mt-3">
          <Disqus/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>



<script>
import FirebaseService from '../services/FirebaseService'
import Datetime from 'date-and-time'
import Disqus from '../components/Disqus'
import PortfolioWriter from '../components/PortfolioWriter'
import { FlowerSpinner } from 'epic-spinners'

export default {
  name: 'PortfolioViewPage',
  props: {
    id: {type:String},
  },
	data(){
    return{
      newToggle: false,
      name: '누구더라...',
		  date: '언제더라...',
		  title: '로딩중...',
		  body: '뭐더라...',
      imgSrc: '',
      loading: false,
    }
  },
	components: {
    Disqus,
    PortfolioWriter,
    FlowerSpinner,
  },
  mounted(){
      this.getPortfolioData()
  },
  methods: {
    async getPortfolioData(){
      this.loading = false
      const pf = await FirebaseService.getPortfolio(this.id)
      this.$store.state.portfolioDetail = pf
    },
    setPortfolioData(portfolio) {
      this.name = portfolio.username
      this.title = portfolio.title
      this.body = portfolio.body
      this.imgSrc = portfolio.img
      var fulldate = new Date(portfolio.created_at.seconds*1000)
      
      this.date = fulldate.toString().substring(4, 15)
      this.loading = true
    },
    async deletePortfolio(){
      // 해당 ID를 가진 portfolio를 DB에서 가져옴
      const portfoliodata = await FirebaseService.getPortfolio(this.id)
      // 접속한 유저 정보 DB에서 받아옴
      const user = await FirebaseService.getUserDataAuth()
      // 접속 유저정보와 DB 데이터비교 권한 인증
      if(FirebaseService.authUserAndDB(portfoliodata, user)){
        // DB에서 삭제
        FirebaseService.deletePortfolio(this.id)
        this.goToPortfolio()
      }
    },
    updatePortfolio(state){
      console.log(state)
      if(state){
        this.$store.state.updatePortfolioDone = false
        this.newToggle = false
        this.getPortfolioData()
      }
    },
    goToPortfolio(){
      this.$router.push({name: 'portfolio'})
    },
    authCheck() {
        const user = this.$store.getters.getUser;
        if (user) {
            if (user.authority == "master") {
                return true;
            } else if(user.authority == "member" && user.name == this.name) {
                return true;
            }
        } else {
            return false;
        }
    }
  },
  computed: {
    getPortfolioDetail(){
			return this.$store.getters.getPortfolioDetail
		},
    getUpdatePortfolioDone(){
			return this.$store.getters.getUpdatePortfolioDone
		}
  },
  watch: {
    getPortfolioDetail(val, oldVal){
			this.setPortfolioData(val)
    },
    getUpdatePortfolioDone(val, oldVal){
      this.updatePortfolio(val)
    }
  }
  
}
</script>

<style scoped>
.load-spinner{
  position: absolute;
  top: 30vh;
}
.page-header{
  height: 15vh;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
  text-align: center;
  vertical-align: middle;
}
.page-title{
  font-family: 'Literata', 'Noto Serif KR', serif;
  font-weight: 700;
  font-style: italic;
  font-size: 40px;
}
.page-author{
  text-align: left;
  margin-top: 1em;
  margin-bottom: 1em;
}
.page-author p {
  font-family: 'Literata', 'Noto Serif KR', serif;
  font-size: 1.5em;
  margin-bottom: 1em;
}
.page-img{
  margin-bottom: 2em;
}
.page-body p{
  font-family: 'Literata', 'Noto Serif KR', serif;
  font-size: 1.2em;
  word-break: normal;
  padding: 0.5em 0.5em;
  margin-bottom: 1em;
}
.page-btn{
  text-align: left;
  font-size: 1vw;
  padding-left: 0.5em;
  margin-bottom: 2em;
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>