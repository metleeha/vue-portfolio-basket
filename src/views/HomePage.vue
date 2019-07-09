<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/collection/190727/1600x900">
      <div slot="text">There is always a way.</div>
    </ImgBanner>
    <v-container>
      <!-- About Me -->
      <v-layout my-5 id="aboutme">
        <v-flex xs12>
          <h2 class="headline mb-3 text-xs-center">About Me</h2>
        </v-flex>
      </v-layout>
      <v-layout my-5>
        <v-flex xs12 sm8 class="mt-5 pl-3 text-xs-center text-sm-left" style="font-size:1.5em;">
          <p>안녕하세요, <br/>SSAFY Seoul 2반 TEN 팀입니다.<br/> 
          </p>
        </v-flex>
        <link
        <v-flex sm4 hidden-xs-only>
            <v-img :src="getImgUrl('profile.png')" aspect-ratio="0.7"/>
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12 sm12>
          <router-link to="/portfolio" tag="span"><h2 class="headline my-5 text-xs-center">Portfolio</h2></router-link>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>

      <!-- Post -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Post</h2>
          <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>


      <!-- Github -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center" id="projects">Project</h2>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PortfolioList from '../components/PortfolioList'
import PostList from '../components/PostList'
import RepositoryList from '../components/RepositoryList'

export default {
	name: 'HomePage',
	components: {
		ImgBanner,
		PortfolioList,
		PostList,
		RepositoryList
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
