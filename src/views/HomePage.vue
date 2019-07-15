<template>
  <div>
    <ImgBanner>
      <div slot="text">There is always a way.</div>
    </ImgBanner>
    <v-container>

      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12 sm12>
          <router-link to="/portfolio" tag="span"><h2 class="headline my-5 text-xs-center">Portfolio</h2></router-link>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>


      <!-- Github -->
      <v-layout my-5>
        <v-flex xs12>
          <h2  id="projects" class="headline my-5 text-xs-center">Project</h2>
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
import PortfolioList from '../components/PortfolioList'
import RepositoryList from '../components/RepositoryList'
import PageViewChart from '../components/PageViewChart'
import PageViewChartForToday from '../components/PageViewChartForToday'

export default {
	name: 'HomePage',
	components: {
		ImgBanner,
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
  h2 {
    font-weight: 700;
    color: #424242;
  }
</style>
