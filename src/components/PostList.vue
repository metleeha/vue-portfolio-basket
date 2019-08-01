<template>
	<v-container>
		<!-- Post Search Bar -->
		<v-layout xs12 row wrap justify-center text-xs-center>
			<v-flex xs10>
				<v-text-field 
				prepend-inner-icon="fa-search"
				v-model="search"
				placeholder="Search title.."
				style="width:50%;">
				</v-text-field>
			</v-flex>
		</v-layout>
		<!-- Post List -->
    	<v-layout mt-5 xs12 row wrap id="pfPan" >
			<v-flex xs8 v-for="i in filteredPosts.length > showPostLimits ? showPostLimits : filteredPosts.length" class="pflist" :key="i">
				<Post 
				:id="filteredPosts[i - 1].id"
				:date="filteredPosts[i - 1].created_at"
				:title="filteredPosts[i - 1].title"
				:body="filteredPosts[i - 1].body"></Post>
				<v-divider></v-divider>
			</v-flex>
    		<v-flex xs12 text-xs-center round my-5 v-if="loadMore">
				<v-btn color="#3a718c" dark large v-on:click="loadMorePosts()"><v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기</v-btn><br>
    		</v-flex>
  		</v-layout>
	</v-container>
</template>
<script>
import Post from '@/components/Post'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PostList',
	props: {
		column: {type: Number, default: 1},
		limits: {type: Number, default: 4},
		loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			posts: [],
			search: '',
			showPostLimits: 0,
		}
	},
	components: {
		Post
	},
	mounted() {
		this.showPostLimits = this.limits
		this.getPosts()
	},
	methods: {
		async getPosts() {
			this.posts = await FirebaseService.getPosts()
		},
		loadWriter(){
			this.$emit('postWriterOn');
		},
		loadMorePosts() {
			this.showPostLimits+=4;
    	},
		updatePost(state){
			if(state){
				this.$store.state.postPostDone = false
				this.$store.state.newTogglePost = true
				this.getPosts()
			}
		}
	},
	computed: {
		filteredPosts: function() {
			return this.posts.filter((post)=>{
				return post.title.match(this.search);
			});
		},
    	getPostPostDone(){
			return this.$store.getters.getPostPostDone
		}
	},
	watch: {
		getPostPostDone(val, oldVal){
		this.updatePost(val)
		}
	}
}
</script>
<style>
  #pfPan {
    display: inline-flex;
    justify-content: center;
    text-align: center;
    width: 100%;
  }
  .pflist {
    display: inline-block;
    width: 250px;
    margin: 10px;
  }

  @media screen and (max-width:1264px) {
    .pflist {
      width: 300px;
      max-width: 300px;
    }
  }
  @media screen and (max-width:600px) {

  }
</style>
