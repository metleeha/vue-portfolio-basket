import firebase from 'firebase'

export default {
    Increment(path) {
        var curNo = 0
        var date = new Date();
        var curDate = (date.getMonth()+1)+'월 '+ date.getDate()+'일'
        firebase.database().ref('/Page/'+ curDate + '/' + path).once('value').then(function(snapshot){
            curNo = snapshot.val()
            if(curNo != null) {
                curNo = curNo.View + 1
                firebase.database().ref('/Page/' + curDate + '/' + path).set({
                View: curNo
                })
    
                console.log(path+ '\t: '+ (curNo))
            }
            else {
                console.log('the first visit of '+path)
                firebase.database().ref('/Page/' + curDate + '/' + path).set({
                View: 1
                })
    
                console.log(path+ '\t: '+ 1)
            }
        })
      }
}