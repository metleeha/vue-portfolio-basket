<template>
  <div class="py-3">
    <v-layout>
      	<v-flex xs12>
        	<h2 class="font-weight-regular">{{repository.path_with_namespace}}</h2>
        	<p class="subheading mb-1 grey--text text--darken-1 font-weight-light">@{{member.username}}</p>
      	</v-flex>
		<CommitGraph 	:member = member>
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
		member: {type: null}
	},
	components: {
		CommitGraph,
		rc
	},
	data() {
		return {
			repository: {}
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
</style>
