<script>
//Importing Bar class from the vue-chartjs wrapper
import {Bar} from 'vue-chartjs'
import firebase from 'firebase'

var menuList = ['home', 'post', 'portfolio', 'portfolioWriter', 'login']
var menuListView = []

let today = new Date()
let formattedToday = (today.getMonth()+1)+'월 '+ today.getDate()+'일'
for (let index = 0; index < menuList.length; index++) {
    firebase.database().ref('/Page/'+ formattedToday + '/'+ menuList[index]).once('value').then(function(snapshot){
        let todayView = snapshot.val()
        if(todayView != null) {
            menuListView.push(todayView.View)
        }
        else {
            menuListView.push(0)
        }
    })
}

//Exporting this so it can be used in other components
export default {
  extends: Bar,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: menuList,
        datasets: [
          {
            label: '조회수',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            //Data to be represented on y-axis
            data: menuListView
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
  }
}
</script>