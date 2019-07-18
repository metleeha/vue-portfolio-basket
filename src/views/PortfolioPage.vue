<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>
      <!-- Add New Portfolio Button -->
      <v-layout xs12 justify-center>
        <v-flex xs12 text-xs-center mt-5>
          <v-btn @click="newToggle = !newToggle" block outline large :color="newToggle? '#f0bebe':'#3a718c'"><v-icon left>fa-chevron-down</v-icon>New Portfolio</v-btn>
        </v-flex>
      </v-layout>
      <!-- Portfolio Writer --->
      <transition name="fade">
        <v-layout v-if="newToggle" xs12 justify-center>
          <PortfolioNew />
        </v-layout>
      </transition>

      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="8" :load-more="true" v-on:portfolioWriterOn="routePFW"></PortfolioList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PortfolioNew from '../components/PortfolioNew'

export default {
  name: 'PortfolioPage',
  components: {
		ImgBanner,
    PortfolioList,
    PortfolioNew
  },
  data(){
    return {
      newToggle: false,
    }
  },
  methods:{
    routePFW(){
      this.$router.push('portfoliowriter');
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },

  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
