import firebase from 'firebase/app'
import 'firebase/database'

export default {
    Increment(path) {
        var curNo = 0
        var date = new Date();
        var curDate = (date.getMonth()+1)+'월 '+ date.getDate()+'일'
        var curTotalNo = 0

        if(path == 'home') {
            firebase.database().ref('/Page/TotalView').once('value').then(function(snapshot){
                curTotalNo = snapshot.val().View + 1
                firebase.database().ref('/Page/TotalView').set({
                    View : curTotalNo 
                })
            })
        }

        firebase.database().ref('/Page/'+ curDate + '/' + path).once('value').then(function(snapshot){
            curNo = snapshot.val()
            if(curNo != null) {
                curNo = curNo.View + 1
                firebase.database().ref('/Page/' + curDate + '/' + path).set({
                View: curNo
                })
            }
            else {
                firebase.database().ref('/Page/' + curDate + '/' + path).set({
                View: 1
                })
            }
        })
      }
}