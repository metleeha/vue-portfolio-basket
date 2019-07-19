<template> 
  <v-container fluid grid-list-xl>
	  <v-layout wrap align-center>
		  <v-flex xs12 sm4 offset-sm4 d-flex justify-center>
			  <v-select v-model="projectID" @change="getGitlabRepos"
				 :items="options"
				 item-text="text"
				 item-value="value"
				 label="Select Repository"
				 persistent-hint
				 single-line
				 append-icon="fa-caret-down"
				 ></v-select>
		  </v-flex>

			<v-flex v-for="i in members.length" :key="i">
				<v-divider v-if="i === 1"></v-divider>
				<Repository :member = members[i-1]></Repository>
				<v-divider></v-divider>
			</v-flex>
	  </v-layout>
  </v-container>
  <!-- <v-layout column px-5> -->
	<!-- <v-flex xs-12 class="selecter">
		<select text-xs-center v-model="projectID" @change="getGitlabRepos()">
			<option v-for="option in options" v-bind:value="option.value" v-bind:key="option.text">
				{{ option.text }}
			</option>
		</select>
	</v-flex> -->
    <!-- <v-flex v-for="i in members.length" :key="i">
      <v-divider v-if="i === 1"></v-divider>
      <Repository :member = members[i-1]></Repository>
      <v-divider></v-divider>
    </v-flex> -->
  <!-- </v-layout> -->
</template>

<script>
import Repository from '@/components/Repository'
import GitlabService from '@/services/GitlabService'
import { mapGetters } from 'vuex'

export default {
	name: 'RepositoryList',
	props: {
		limits: {type: Number, default: 5},
		loadMore: {type: Boolean, default: false},
		
	},
	data() {
		return {
			repository: {},
			members: [],
			// projectID: {type: String, default: '13334004'},
			// projectID: {type: String, default: ''},
			projectID: '6047',
			options: [
				{ text: 'webmobile-sub2-ten', value: '6047' },
				{ text: 'webmobile-sub1-metleeha', value: '5626' },
				{ text: 'webmobile-sub1-wsjeong', value: '5632' },
				{ text: 'webmobile-sub1-Gilseong', value: '5602' },
				{ text: 'webmobile-sub1-heabin', value: '5635' },
				{ text: 'webmobile-sub1-jinhwan_nim', value: '5609' }
			]
    	}
	},
	components: {
		Repository
	},
	mounted() {
		this.getGitlabRepos()
	},
	methods: {
		async getGitlabRepos() {
			const members = await GitlabService.getMembers(this.projectID)
			if(members.status !== 200) {return}
			this.$store.state.members = members.data
			const response = await GitlabService.getRepos(this.projectID)
			if(response.status !== 200) {return} 
			this.$store.state.repository = response.data
			var count = 1
			var tempCommits = []
			while (true) {
				const commits = await GitlabService.getCommits(this.projectID,count)
				if(commits.status !== 200){return}
				if(count === 1){
					tempCommits = commits.data
				}else{
					// tempCommits.concat(commits.data)
					commits.data.forEach(element => {
						tempCommits.push(element)
					});
				}
				count++
				if(commits.data.length < 100) break
			}
			this.$store.state.commits = tempCommits
		}
	},
	computed: {
		getMembers(){
			return this.$store.getters.getMembers
		}
	},
	watch: {
		getMembers(val, oldVal){
			this.members = val
		}
	}
}
</script>
<style>

</style>
