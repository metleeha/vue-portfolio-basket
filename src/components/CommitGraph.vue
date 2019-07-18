<script>
import { Bar } from 'vue-chartjs'
import Date from 'date-and-time'

export default {
	name: 'CommitGraph',
  	extends: Bar,
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
            			backgroundColor: '#f87979',
            			data: []
					}
          		]
        	},
			//Chart.js options that controls the appearance of the chart
			options: {
				scales: {
				yAxes: [{
					ticks: {
					beginAtZero: true
					},
					gridLines: {
					display: true
					}
				}],
				xAxes: [ {
					gridLines: {
					display: false
					}
				}]
				},
				legend: {
					display: true
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	mounted() {
		//renderChart function renders the chart with the datacollection and options object.
		this.makeData()
		this.fillData()
		// Chart.generateChart()
		// var ctx = document.getElementById('cChart');
		// var myBarChart = new Chart(ctx, {
    	// 	type: 'bar',
    	// 	data: this.data,
    	// 	options: this.options
		// });
    },
    methods: {
		makeData() {
			// var stdate = Date.parse(this.startdate.substring(0,10),'YYYY-MM-DD')
			// var endate = Date.parse(this.lastdate.substring(0,10),'YYYY-MM-DD')
			// console.log(this.stdate)
		},
      	fillData () {
        	this.datacollection = {
          		labels: [],
          		datasets: [
            		{
            			label: 'Commite By Date',
            			backgroundColor: '#f87979',
            			data: []
					}
          		]
        	}
      	},
		selectCommit(commits){
			for (let i = 0; i < commits.length; i++) {
				if(commits[i].committer_name.toLowerCase() == this.member.name.toLowerCase()){
					var date = Date.parse(commits[i].committed_date.substring(0,10),'YYYY-MM-DD')
					date = Date.format(date,'YY/MM/DD')
					this.myCommits.push(date)
					this.labelsData.set(date,this.labelsData.get(date)+1)
				}
			}
			console.log(this.myCommits)
			
			console.log(Array.from(this.labelsData.values()))
			this.datacollection.datasets[0].data = Array.from(this.labelsData.values())
			this.renderChart(this.datacollection, this.options)
		},
		setDate(repository){
			this.startDate = Date.parse(repository.created_at.substring(0,10),'YYYY-MM-DD')
			this.lastDate = Date.parse(repository.last_activity_at.substring(0,10),'YYYY-MM-DD')
			console.log('startDate: '+this.startDate+'\nlastDate: '+this.lastDate)
			var date = this.startDate
			console.log(date)
			var length = Date.subtract(this.lastDate, this.startDate).toDays();
			console.log(length)
			for (let i = 0; i <= length; i++) {
				this.labelsData.set(Date.format(date,'YY/MM/DD'),0)
				date = Date.addDays(date,1)
			}
			console.log(Array.from(this.labelsData.keys()))
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
</style>
