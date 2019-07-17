<template>
  <div class="py-3">
    <v-layout>
      	<v-flex xs12>
        	<h2 class="font-weight-regular">{{repository.path_with_namespace}}</h2>
        	<p class="subheading mb-1 grey--text text--darken-1 font-weight-light">@{{user.username}}</p>
      	</v-flex>
	  	<CommitGraph 	:commitByDate = myCommits 
	  					:startdate = repository.created_at
						:lastdate = repository.last_activity_at>
		</CommitGraph>
		<!-- <rc></rc> -->
    </v-layout>
  </div>
</template>

<script>
import GitlabService from '@/services/GitlabService'
import CommitGraph from './CommitGraph'
import rc from './RandomChart'

export default {
	name: 'Repository',
	props: {
		projectID: {type: String},
		repository: {type: null},
		user: {type: null}
	},
	components: {
		CommitGraph,
		rc
	},
	data() {
		return {
			stats: {},
			commits: [],
			myCommits: [],
		}
	},
  	mounted() {
		this.drawStatGraph()
  	},
	methods: {
		async drawStatGraph() {
			console.log(this.commits)
			console.log(this.user)
			this.selectCommit()
		},
		selectCommit(){
			for (let i = 0; i < this.commits.length; i++) {
				if(this.commits[i].committer_name == this.user.name){
					var date = this.commits[i].committed_date
					
					this.myCommits.push(date.substring(0,10))
				}
			}
			console.log(this.myCommits)
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
