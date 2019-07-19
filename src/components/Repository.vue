<template>
  <div class="py-3">
    <v-layout>
      	<v-flex xs12>
        	<div class="project-text">
			<h2 class="font-weight-regular" @click="goRepo()">{{repository.path_with_namespace}}</h2>
        	<p class="username mb-1 text--darken-1 font-weight-light">@{{member.username}}</p>
        	</div>
			<div class="project-graph">
			<CommitGraph 	:member = member class="graph hidden-xs-only"></CommitGraph>
			</div>
		</v-flex>
		<!-- <rc></rc> -->
    </v-layout>
  </div>
</template>

<script>
import GitlabService from '@/services/GitlabService'
import CommitGraph from './CommitGraph'

export default {
	name: 'Repository',
	props: {
		member: {type: null}
	},
	components: {
		CommitGraph
	},
	data() {
		return {
			repository: {}
		}
	},
	methods:{
		goRepo(){
			location.href=this.repository.http_url_to_repo
		}
	},
	computed: {
		getRepository(){
			return this.$store.getters.getRepository
		}
	},
	watch: {
		getRepository(val, oldVal){
			this.repository = val
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
.username {
	height: 2.4em;
	opacity: 0.8;
}
.project-text{
	float: left;
}
.project-graph{
	float: right;
}
</style>
