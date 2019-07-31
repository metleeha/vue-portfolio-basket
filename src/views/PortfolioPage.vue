<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>
      <!-- Add New Portfolio Button -->
      <v-layout xs12 justify-center>
        <v-flex xs12 text-xs-center mt-5>
          <v-btn @click="newToggle = !newToggle" block flat large :color="newToggle? '#f0bebe':'#3a718c'">
            <v-icon left>fa-chevron-down</v-icon>New Portfolio</v-btn>
        </v-flex>
      </v-layout>
      <!-- Portfolio Writer --->
      <transition name="fade">
        <v-layout v-if="newToggle" xs12 justify-center>
          <PortfolioWriter />
        </v-layout>
      </transition>
      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="8" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PortfolioWriter from '../components/PortfolioWriter'

export default {
    name: 'PortfolioPage',
    components: {
        ImgBanner,
        PortfolioList,
        PortfolioWriter
    },
    data() {
        return {
            newToggle: false,
        }
    },
    methods: {
        updatePortfolios(state) {
            if (state) {
                this.$store.state.newTogglePortfolios = false
                this.newToggle = false
            }
        }
    },
    computed: {
        getNewTogglePortfolios() {
            return this.$store.getters.getNewTogglePortfolios
        },
        authCheck() {
            const user = this.$store.getters.getUser;
            if (user) {
                if (user.authority == "master" || user.authority == "member") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },
    watch: {
        getNewTogglePortfolios(val, oldVal) {
            this.updatePortfolios(val)
        }
    }
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
