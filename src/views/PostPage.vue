<template>
  <div>
    <ImgBanner>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">Post</div>
    </ImgBanner>
    <v-container>
      <!-- Add New Post Button -->
      <v-layout xs12 justify-center>
        <v-flex xs12 text-xs-center mt-5>
          <v-btn @click="newToggle = !newToggle" block flat large :color="newToggle? '#f0bebe':'#3a718c'"><v-icon left>fa-chevron-down</v-icon>New Post</v-btn>
        </v-flex>
      </v-layout>
      <!-- Post Writer --->
      <transition name="fade">
        <v-layout v-if="newToggle" xs12 justify-center>
          <PostWriter v-show="isMember"/>
        </v-layout>
      </transition>
      <!-- Post -->
      <v-layout>
        <v-flex xs12>
          <PostList :limits="6" :load-more="true"></PostList>
        </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import ImgBanner from '../components/ImgBanner'
import PostList from '../components/PostList'
import PostWriter from '../components/PostWriter'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PostPage',
	components: {
		ImgBanner,
    PostList,
    PostWriter
	},
  data(){
    return {
      newToggle: false,
    }
  },
  methods:{
    updatePost(state){
      if(state){
        this.$store.state.newTogglePost = false
        this.newToggle = false
      }
    }
  },
  computed: {
    getNewTogglePost(){
			return this.$store.getters.getNewTogglePost
    },
    isMember(){
      auth = this.$store.getter.getUser.Auth;
      if( auth == 'member' || auth == 'master'){
        return true;
      }else{
        return false;
      }
    }
  },
  watch: {
    getNewTogglePost(val, oldVal){
      this.updatePost(val)
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
