<template>
  <v-container>
  <!-- Portfolio Search Bar -->
    <v-layout row wrap justify-center text-xs-center>
      <v-flex xs12>
        <v-text-field 
          prepend-inner-icon="fa-search"
          v-model="search"
          placeholder="Search title.."
          style="width:50%;">
        </v-text-field>
      </v-flex>
    </v-layout>

  <!-- Portfolio List -->
    <v-layout mt-5 wrap id="pfPan">
      <v-flex v-for="i in filteredPortfolios.length > showPortfoliosLimits ? showPortfoliosLimits : filteredPortfolios.length" class="pflist" :key="i">
        <Portfolio class="ma-3"
              :id="filteredPortfolios[i - 1].id"
              :date="new Date(filteredPortfolios[i - 1].created_at.toDate()).toString().substring(4,15)"
              :title="filteredPortfolios[i - 1].title"
              :body="filteredPortfolios[i - 1].body"
              :imgSrc="filteredPortfolios[i - 1].img"
              >
        </Portfolio>
      </v-flex>
      <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
        <v-btn color="#3a718c" dark large v-on:click="loadMorePortfolios()"><v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기</v-btn><br>
        <!-- <v-btn color="info" dark v-on:click="loadWriter"><v-icon size="25" class="mr-2">create</v-icon>추가</v-btn> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Portfolio from '@/components/Portfolio'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PortfoliosList',
	props: {
		limits: {type: Number, default: 4},
    loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
      portfolios: [],
      search: '',
      showPortfoliosLimits: 0,
		}
	},
	components: {
		Portfolio
	},
	mounted() {
    this.showPortfoliosLimits = this.limits
		this.getPortfoliosFirebase()
	},
	methods: {
		async getPortfoliosFirebase() {
      var ps = await FirebaseService.getPortfolios()
      while (ps[0].created_at == null) {
        ps = await FirebaseService.getPortfolios()
      }
      this.$store.state.portfolios = ps
		},
    loadWriter(){
      this.$emit('portfolioWriterOn');
    },
		loadMorePortfolios() {
      this.showPortfoliosLimits+=4;
    },
    setPortfolios(portfolios){
      this.portfolios = portfolios
    },
    updatePortfolios(state){
      if(state){
        this.$store.state.postPortfolioDone = false
        this.$store.state.newTogglePortfolios = true
        this.getPortfoliosFirebase()
      }
    }
  },
  computed: {
    filteredPortfolios: function() {
      return this.portfolios.filter((portfolio)=>{
        return portfolio.title.match(this.search);
      });
    },
    getPortfolios(){
			return this.$store.getters.getPortfolios
    },
    getPostPortfolioDone(){
			return this.$store.getters.getPostPortfolioDone
		}
  },
  watch: {
    getPortfolios(val, oldVal){
			this.setPortfolios(val)
    },
    getPostPortfolioDone(val, oldVal){
      this.updatePortfolios(val)
    }
  }
}
</script>
<style>
/* 
  .mw-700 {
    max-width: 700px;
    margin: auto;
  } */
  #pfPan {
    display: inline-block;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
  .pflist {
    display: inline-block;
    width: 250px;
    max-width: 250px;
    margin: 10px;
  }

  @media screen and (max-width:1264px) {
    .pflist {
      width: 300px;
      max-width: 300px;
    }
  }
  @media screen and (max-width:600px) {

  }
</style>
