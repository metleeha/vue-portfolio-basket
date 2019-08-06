<script>
//Importing Line class from the vue-chartjs wrapper
import {Line} from 'vue-chartjs'
import firebase from 'firebase/app'
import 'firebase/database'

function makeDateFormat(month, date) {
    const thirtyOne = [1, 3, 5, 7, 8, 10, 12]
    const thirty = [4, 6, 9, 11]
    
    if(date < 0) {
        month = month-1
        if(month == 0) {
            month = 12
        }

        if(thirtyOne.includes(month)) {
            date = 31 - date
        }
        else if(thirty.includes(month)) {
            date = 30 - date
        }
        else date = 28 - date
    }
    return month+'월 '+date+'일'
}

let curDate = new Date()
let recent7Days = []
let recent7DaysValue = []
for (let index = curDate.getDate()-6; index <= curDate.getDate(); index++) {
    recent7Days.push(makeDateFormat((curDate.getMonth()+1), index))
}

for (let index = 0, todayView=0; index < 7; index++) {
    
    
    firebase.database().ref('/Page/'+ recent7Days[index] + '/home').once('value').then(function(snapshot){
        todayView = snapshot.val()
        if(todayView != null) {
            recent7DaysValue.push(todayView.View)
        }
        else {
            recent7DaysValue.push(0)
        }
    })
}

//Exporting this so it can be used in other components
export default { 
extends: Line,
data () {
    return {
    datacollection: {
        //Data to be represented on x-axis
        labels: recent7Days,
        datasets: [
        {
            label: 'view',
            backgroundColor: 'transparent',
            pointBackgroundColor: 'white',
            borderWidth: 3,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: recent7DaysValue
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
        display: true
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
mounted () {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options)
}
}
</script>
