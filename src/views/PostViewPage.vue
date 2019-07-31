<template>
  <div>
    <v-container>
      <!-- edit btn -->
      <v-layout xs12 justify-center class="page-edit">
        <v-flex xs12 text-xs-center mt-5>
          <v-btn @click="newToggle = !newToggle" block flat large :color="newToggle? '#f0bebe':'#3a718c'"><v-icon left>fa-chevron-down</v-icon>Edit Post</v-btn>
        </v-flex>
      </v-layout>
      <!-- Post Writer --->
      <transition name="fade">
        <v-layout v-if="newToggle" xs12 justify-center>
          <v-flex xs8>
            <PostWriter 
              :id="id"
              :ti="title"
              :body="body"
              :update=true />
          </v-flex>
        </v-layout>
      </transition>
      <!-- Post contents -->
      <!-- title -->
      <v-layout class="page-header" row>
        <v-flex xs8>
          <h1 class="page-title">{{ title }}</h1>
        </v-flex>
      </v-layout>
      <!-- author -->
      <v-layout row class="page-author">
        <v-flex xs8 justify-content-center>
          <span><v-icon class="mr-1">fa-paperclip</v-icon>{{ date }}</span>
          <span><v-icon class="mr-1">fa-user</v-icon>by admin</span>
        </v-flex>
      </v-layout>
      <!-- body -->
      <v-layout>
        <v-flex xs8 class="page-body">
          <h4>{{ body }}</h4>
        </v-flex>
      </v-layout>
      <!-- btns -->
      <v-layout>
        <v-flex xs8 class="page-btns">
          <v-btn @click="deletePost()">삭제</v-btn>
        </v-flex>
      </v-layout>
      <!-- disqus -->
      <v-layout>
        <v-flex xs8 class="page-disqus">
          <Disqus/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>



<script>
import FirebaseService from '../services/FirebaseService'
import Datetime from 'date-and-time'
import Disqus from '../components/Disqus'
import PostWriter from '../components/PostWriter'

export default {
  name: 'PostViewPage',
  props: {
    id: {type:String},
  },
	data(){
    return{
      newToggle: false,
		  date: '언제더라...',
		  title: '로딩중...',
		  body: '뭐더라...',
    }
  },
	components: {
    Disqus,
    PostWriter
  },
  mounted(){
      this.getPostData()
    },
  methods: {
    async getPostData(){
      const pf = await FirebaseService.getPost(this.id)
      this.$store.state.postDetail = pf
    },
    setPostData(post) {
      this.title = post.title
      this.body = post.body
      var fulldate = new Date(post.created_at.seconds*1000)
      
      this.date = fulldate.toString().substring(0, 25)
    },
    deletePost(){
      FirebaseService.deletePost(this.id)
      this.$router.push({name: 'post'})
    },
    updatePost(state){
      if(state){
        this.$store.state.updatePostDone = false
        this.newToggle = false
        this.getPostData()
      }
    }
  },
  computed: {
    getPostDetail(){
			return this.$store.getters.getPostDetail
		},
    getUpdatePostDone(){
			return this.$store.getters.getUpdatePostDone
		}
  },
  watch: {
    getPostDetail(val, oldVal){
			this.setPostData(val)
    },
    getUpdatePostDone(val, oldVal){
      this.updatePost(val)
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>