<template>
  <div>
    <ImgBanner>
      <div slot="text">There is always a way.</div>
    </ImgBanner>
    <v-container>
      <!-- Team Introduction -->
      <v-layout my-5>
        <v-flex xs12 sm12>
          <div class="main-title display-2 my-5 text-xs-center">Team</div>
          <Team></Team>
        </v-flex>
      </v-layout>


      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12 sm12>
          <router-link to="/portfolio" tag="span"><div class="main-title display-2 my-5 text-xs-center">Portfolio</div></router-link>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>


      <!-- Github -->
      <v-layout my-5>
        <v-flex xs12>
          <div class="main-title display-2 my-5 text-xs-center" id="projects">Project</div>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>

      <v-layout>
        <PageViewChart></PageViewChart>
        <PageViewChartForToday></PageViewChartForToday>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import Team from '../components/Team'
import PortfolioList from '../components/PortfolioList'
import RepositoryList from '../components/RepositoryList'
import PageViewChart from '../components/PageViewChart'
import PageViewChartForToday from '../components/PageViewChartForToday'

export default {
	name: 'HomePage',
	components: {
    ImgBanner,
    Team,
		PortfolioList,
    RepositoryList,
    PageViewChart,
    PageViewChartForToday
  },
  data(){
    return {

    }
  },
	methods: {
		getImgUrl(img) {
			return require('../assets/' + img)
		},
    isMobile() {
      if ( navigator.platform ) {
        if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
          //mobile
          alert('mobile 접속');
        } else { //pc
          alert('pc 접속');
        }
      }
    }
	},
}
</script>
<style scoped>

  .main-title {
    font-family: 'Literata', serif!important;
    /* font-family: 'Mina', sans-serif; */
    font-style: italic;
    font-weight: 700;
    color: #112D4E;
  }
</style>
