<template>
    <v-flex xs12>
		<canvas id="cChart" width="300" height="100"></canvas>
    </v-flex>
</template>

<script>
import {Bar} from 'vue-chartjs'

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
			datacollection: {
				//Data to be represented on x-axis
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
				{
					label: '조회수',
					backgroundColor: '#f87979',
					pointBackgroundColor: 'white',
					borderWidth: 1,
					pointBorderColor: '#249EBF',
					//Data to be represented on y-axis
					data: [12, 19, 3, 5, 2, 3]
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
		this.renderChart(this.datacollection, this.options)
		// Chart.generateChart()
		// var ctx = document.getElementById('cChart');
		// var myBarChart = new Chart(ctx, {
    	// 	type: 'bar',
    	// 	data: this.data,
    	// 	options: this.options
		// });
	}
}
</script>
<style>
</style>
