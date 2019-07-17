<template>
  <div class="py-3">
    <v-layout>

      <v-flex xs12>
        <h2 class="font-weight-regular">{{repository.path_with_namespace}}</h2>
        <p class="subheading mb-1 grey--text text--darken-1 font-weight-light">@{{user.username}}</p>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import GitlabService from '@/services/GitlabService'

export default {
	name: 'Repository',
	props: {
		projectID: {type: String},
		repository: {type: null},
		user: {type: null}
	},
	data() {
		return {
			stats: {},
			commits: []
		}
	},
  	mounted() {
		this.drawStatGraph()
  	},
	methods: {
		async drawStatGraph() {
			const commits = await GitlabService.getCommits(this.projectID)
			if(commits.stats !== 200){
				return
			}
			this.commits = commits.data
			console.log(this.commits)
			console.log(this.user)

		}
	}
}
</script>
<style>
.font-weight-regular {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
