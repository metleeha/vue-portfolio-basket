<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/collection/190727/1600x900">
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>

      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="6" :load-more="true" v-on:portfolioWriterOn="routePFW"></PortfolioList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'

export default {
	name: 'PortfolioPage',
	components: {
		ImgBanner,
		PortfolioList,
	},
  methods:{
    routePFW(){
      this.$router.push('portfoliowriter');
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>
<style>
@media screen and (max-width:960px) {

}
@media screen and (max-width:600px) {

}
</style>
