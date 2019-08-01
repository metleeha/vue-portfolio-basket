<template>
  <div>
    <!-- Loading Spinner --> 
    <v-container v-if="!loading">
      <v-layout xs12 justify-center align-content-center>
        <flower-spinner 
          :animation-duration="2500"
          :size="70"
          color="#555A9C"
          class="load-spinner"
        />
      </v-layout>
    </v-container>
    <!-- POST Detail View -->
    <v-container v-if="loading">
      <!-- Edit Button -->
        <v-layout xs12 justify-center class="post-edit">
          <v-flex xs12 text-xs-center mt-5>
            <v-btn @click="newToggle = !newToggle" block flat large :color="newToggle? '#f0bebe':'#3a718c'"><v-icon left>fa-chevron-down</v-icon>Edit Post</v-btn>
          </v-flex>
      </v-layout>
      <!-- Post Writer --> 
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
      <!-- POST Contents -->
      <!-- POST Title --> 
      <v-layout xs12 justify-center class="post-header">
        <v-flex xs12>
          <span class="post-title">{{ title }}</span>
        </v-flex>
      </v-layout>
      <!-- Created: Date, Author -->
      <v-layout row class="post-author">
        <v-flex xs12 justify-center>
          <p>by admin, {{ date }}</p>
        </v-flex>
      </v-layout>
      <!-- Post Body --> 
      <v-layout wrap>
        <v-flex xs12 class="post-body">
          <p>{{ body }}</p>
        </v-flex>
        <!-- btns -->
        <v-flex xs12 row class="post-btn">
          <v-btn large outline color="red" @click="deletePost()">DELETE</v-btn>
          <v-btn large outline color="green" @click="goToPost()">Back</v-btn>
        </v-flex>
      </v-layout>
      <!--Disqus -->
      <v-layout>
        <v-flex xs12 class="post-disqus mt-3">
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
import { FlowerSpinner } from 'epic-spinners'

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
      loading: false,
    }
  },
	components: {
    Disqus,
    PostWriter,
    FlowerSpinner,
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
      
      this.date = fulldate.toString().substring(4, 15)
      this.loading = true
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
    },
    goToPost(){
      this.$router.push({name: 'post'})
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
.load-spinner{
  position: absolute;
  top: 30vh;
}
.post-header{
  height: 15vh;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
  text-align: center;
  vertical-align: middle;
}
.post-title{
  font-family: 'Literata', 'Noto Serif KR', serif;
  font-weight: 700;
  font-style: italic;
  font-size: 40px;
}
.post-author p {
  font-family: 'Literata', 'Noto Serif KR', serif;
  font-size: 1.5em;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: 5px;
}
.post-body p{
  font-family: 'Literata', 'Noto Serif KR', serif;
  font-size: 1.2em;
  word-break: normal;
  padding: 0.2em 0.2em;
  margin-bottom: 1em;
}
.post-btn{
  text-align: left;
  font-size: 1vw;
  padding-left: 0.5em;
  margin-bottom: 2em;
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>