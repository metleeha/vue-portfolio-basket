<script>
import { Line } from 'vue-chartjs'
import Date from 'date-and-time'

export default {
	name: 'CommitGraph',
  	extends: Line,
	props: {
		member: {type: null}
	},
	data() {
		return {
			myCommits: [],
			startDate: '',
			lastDate: '',
			labelsData: new Map(),
			datacollection: {
          		labels: [],
          		datasets: [
            		{
            			label: 'Commite By Date',
            			backgroundColor: '#ca5fa6',
            			data: []
					}
          		]
        	},
			options: {
				scales: {
					yAxes: [{
						ticks: {
						beginAtZero: true
						},
						gridLines: {
						display: false
						}
					}],
					xAxes: [ {
						gridLines: {
						display: false
						}
					}]
					},
					legend: {
						display: false
					},
				elements: {
					line: {
						tension: 0
					}
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
    methods: {
		selectCommit(commits){
			for (let i = 0; i < commits.length; i++) {
				if((commits[i].committer_name.toLowerCase() == this.member.name.toLowerCase()) ||
				(commits[i].committer_name.toLowerCase() == this.member.username.toLowerCase()) ||
				(commits[i].committer_name.toLowerCase().replace(' ', '') == this.member.name.toLowerCase())){
					var date = Date.parse(commits[i].committed_date.substring(0,10),'YYYY-MM-DD')
					date = Date.format(date,'MM/DD')
					this.myCommits.push(date)
					this.labelsData.set(date,this.labelsData.get(date)+1)
				}
			}
			console.log(this.myCommits)
			this.datacollection.datasets[0].data = Array.from(this.labelsData.values())
			this.renderChart(this.datacollection, this.options)
		},
		setDate(repository){
			this.startDate = Date.parse(repository.created_at.substring(0,10),'YYYY-MM-DD')
			this.lastDate = Date.parse(repository.last_activity_at.substring(0,10),'YYYY-MM-DD')
			var date = this.startDate
			var length = Date.subtract(this.lastDate, this.startDate).toDays();
			for (let i = 0; i <= length; i++) {
				this.labelsData.set(Date.format(date,'MM/DD'),0)
				date = Date.addDays(date,1)
			}
			this.datacollection.labels = Array.from(this.labelsData.keys())
		}
    },
	computed: {
		getCommits(){
			return this.$store.getters.getCommits
		},
		getRepositoryDate(){
			return this.$store.getters.getRepository
		}
	},
	watch: {
		getCommits(val, oldVal){
			this.selectCommit(val)
		},
		getRepositoryDate(val, oldVal){
			this.setDate(val)
		}
	}
}
</script>
<style>
.graph {
	width: 500px;
	height: 80px;
}
</style>
