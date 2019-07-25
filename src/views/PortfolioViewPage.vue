<template>
  <div>

    <v-container>
      <v-layout class="page-header" row>
        <v-flex xs12>
          <h1 class="page-title">{{ title }}</h1>
        </v-flex>
      </v-layout>
      <v-layout class="page-content">
        <v-flex xs12>
          <v-layout row class="page-author">
            <v-flex xs12 justify-content-left>
              <span><v-icon class="mr-1">fa-paperclip</v-icon>{{ date }}</span>
              <span><v-icon class="mr-1">fa-user</v-icon>by admin</span>
              <span><v-icon class="mr-1">fa-comments</v-icon>3 Comments</span>
            </v-flex>
          </v-layout>
          <v-img 
            :src='this.imgSrc'
            max-height="300"
            cover
          ></v-img>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12 class="page-body">
          <h4>{{ body }}</h4>
        </v-flex>
      </v-layout>
      <Disqus/>
    </v-container>
  </div>
</template>



<script>
import FirebaseService from '../services/FirebaseService'
import Datetime from 'date-and-time'
import Disqus from '../components/Disqus'

export default {
  name: 'PortfolioViewPage',
  props: {
    id: {type:String},
	},
	data(){
    return{
		  date: '언제더라...',
		  title: '로딩중...',
		  body: '뭐더라...',
		  imgSrc: '어디더라...',
    }
  },
	components: {
    Disqus
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
      this.date = new Date(portfolio.created_at.seconds*1000)
      
      // this.stringDate = this.date.substring(0, 16)
      console.log(this.date)
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
</style>
