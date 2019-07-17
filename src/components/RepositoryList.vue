<template>
  <v-layout column px-4>
    <v-flex v-for="i in members.length" :key="i">
      <v-divider v-if="i === 1"></v-divider>
      <Repository :projectID="projectID" :repository="repository" :user="members[i - 1]"></Repository>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from '@/components/Repository'
import GitlabService from '@/services/GitlabService'

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
			members: []
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
			this.members = members.data

			const response = await GitlabService.getRepos(projectID)
			if(response.status !== 200) {
			 	return
			}
			console.log(response)
			this.repository = response.data
		}
	}
}
</script>
