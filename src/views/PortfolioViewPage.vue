<template>
  <div>

    <v-container>
      <!-- edit btn -->
      <v-layout xs12 justify-center class="page-edit">
        <v-flex xs12 text-xs-center mt-5>
          <v-btn @click="newToggle = !newToggle" block flat large :color="newToggle? '#f0bebe':'#3a718c'"><v-icon left>fa-chevron-down</v-icon>Edit Portfolio</v-btn>
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
      <!-- Portfolio contents -->
      <!-- title -->
      <v-layout class="page-header" row>
        <v-flex xs8>
          <h1 class="page-title">{{ title }}</h1>
        </v-flex>
      </v-layout>
      <!-- author -->
      <v-layout row class="page-author">
        <v-flex xs8 justify-content-center>
          <span><v-icon class="mr-1">fa-paperclip</v-icon>{{ date }}</span>
          <span><v-icon class="mr-1">fa-user</v-icon>by admin</span>
        </v-flex>
      </v-layout>
      <!-- img -->
      <v-layout class="page-img">
        <v-flex xs8>
          <v-img 
            :src='this.imgSrc'
            cover
          ></v-img>
        </v-flex>
      </v-layout>
      <!-- body -->
      <v-layout>
        <v-flex xs8 class="page-body">
          <h4>{{ body }}</h4>
        </v-flex>
      </v-layout>
      <!-- btns -->
      <v-layout>
        <v-flex xs8 class="page-btns">
          <v-btn @click="deletePortfolio()">삭제</v-btn>
        </v-flex>
      </v-layout>
      <!-- disqus -->
      <v-layout>
        <v-flex xs8 class="page-disqus">
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

export default {
  name: 'PortfolioViewPage',
  props: {
    id: {type:String},
  },
	data(){
    return{
      newToggle: false,
		  date: '언제더라...',
		  title: '로딩중...',
		  body: '뭐더라...',
		  imgSrc: '../assets/noimg.jpg',
    }
  },
	components: {
    Disqus,
    PortfolioWriter
  },
  mounted(){
      this.getPortfolioData()
    },
  methods: {
    async getPortfolioData(){
      const pf = await FirebaseService.getPortfolio(this.id)
      this.$store.state.portfolioDetail = pf
    },
    setPortfolioData(portfolio) {
      this.title = portfolio.title
      this.body = portfolio.body
      this.imgSrc = portfolio.img
      var fulldate = new Date(portfolio.created_at.seconds*1000)
      
      this.date = fulldate.toString().substring(0, 25)
    },
    deletePortfolio(){
      FirebaseService.deletePortfolio(this.id)
      this.$router.push({name: 'portfolio'})
    }
  },
  computed: {
    getPortfolioDetail(){
			return this.$store.getters.getPortfolioDetail
		}
  },
  watch: {
    getPortfolioDetail(val, oldVal){
      console.log('change!!')
      console.log(val)
			this.setPortfolioData(val)
		}
  }
  
}
</script>


<style scoped>
@media screen and (max-width:960px) {

}
@media screen and (max-width:600px) {

}
.page-header{
  height: 20vh;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
}
.page-title{
  margin: 0 0 5px;
  padding-top: 10vh;
  font-family: Roboto;
  font-size: 50px;
  text-align: center;
  line-height: 40px;
}
.page-content{
  padding-top: 2vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>