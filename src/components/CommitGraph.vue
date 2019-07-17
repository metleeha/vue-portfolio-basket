<script>
import { Bar } from 'vue-chartjs'
import Date from 'date-and-time'

export default {
	name: 'CommitGraph',
  	extends: Bar,
	props: {
		commitByDate: {type: null},
		startdate: {type: String},
		lastdate: {type: String},
	},
	data() {
		return {
			datacollection: null,
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
		this.renderChart(this.datacollection, this.options)
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
			console.log(this.startdate)
			var stdate = Date.parse(this.startdate.substring(0,10),'YYYY-MM-DD')
		},
      	fillData () {
        	this.datacollection = {
          		labels: [this.getRandomInt(), this.getRandomInt()],
          		datasets: [
            		{
            			label: 'Data One',
            			backgroundColor: '#f87979',
            			data: [this.getRandomInt(), this.getRandomInt()]
					}, 
					{
            			label: 'Data One',
            			backgroundColor: '#f87979',
        				data: [this.getRandomInt(), this.getRandomInt()]
            		}
          		]
        	}
      	},
      	getRandomInt () {
        	return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      	}
    }
}
</script>
<style>
</style>
