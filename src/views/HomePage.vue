<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/collection/190727/1600x900">
      <div style="line-height:1.2em; font-size:5vw;" slot="text">There is always a way.</div>
    </ImgBanner>
    <v-container>
      <!-- About Me -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline mb-3 text-xs-center">About Me</h2>
        </v-flex>
      </v-layout>
      <v-layout my-5>
        <v-flex xs12 style="font-size:2vw;" id="aboutmeText">
          <p>안녕하세요, 컴퓨터 그래픽스 전문가가 되고싶은 정우성의 포트폴리오입니다.<br/>
          </p>
        </v-flex>
        <v-flex xs4 id="aboutmeImg">
            <v-img :src="getImgUrl('profile.png')" aspect-ratio="0.7"/>
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Portfolio</h2>
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
          <h2 class="headline my-5 text-xs-center">Project</h2>
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
<style>
@media screen and (max-width:960px) {

}
@media screen and (max-width:600px) {
  #aboutmeImg {
    display: none;
  }
  #aboutmeText {
    text-align: center;
  }
}
</style>
