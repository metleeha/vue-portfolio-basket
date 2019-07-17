<template>
  <v-layout column px-4>
    <v-flex v-for="i in members.length" :key="i">
      <v-divider v-if="i === 1"></v-divider>
      <Repository :member = members.name></Repository>
      <v-divider></v-divider>
    </v-flex>
	<div>{{members}}</div>
  </v-layout>
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
		projectID: {type: String, default: '13334004'}
	},
	data() {
		return {
			repository: {},
			members: [],
    	}
	},
	components: {
		Repository
	},
	mounted() {
		this.getGitlabRepos(this.projectID)
	},
	methods: {
		async getGitlabRepos(projectID) {
			const members = await GitlabService.getMembers(projectID)
			if(members.status !== 200) {
				return
			}
			console.log(members.data)
			this.$store.state.members = members.data
			console.log(this.$store.state.members)
			const response = await GitlabService.getRepos(projectID)
			if(response.status !== 200) {
			 	return
			}
			this.$store.state.repository = response.data

			const commits = await GitlabService.getCommits(this.projectID)
			if(commits.status !== 200){
				return
			}
			this.$store.state.commits = commits.data
		}
	},
	computed:{
		getMembers(){
			this.members = this.$store.getters.getMembers
		}
	}
}
</script>
