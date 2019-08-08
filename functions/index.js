const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();

function getTopics(){
  const postsCollection = firestore.collection('topic_token')
  return postsCollection
    .orderBy('created_at', 'desc')
    .get()
    .then((docSnapshots) => {
      return docSnapshots.docs.map((doc) => {
        let data = doc.data()
        data.created_at = new Date(data.created_at.toDate())
        return data
    })
  })
}

exports.sendPost = functions.firestore.document('posts/{create_Id}').onCreate((snap, context) => {
  console.log("WOW, NEW POSTS.", snap.data())
  //유저 토큰 가져오기
  var reg_tokens = [];
  getTopics().then(function (data){
    data.forEach(function (elem){
      reg_tokens.push(elem.token);
    })
  }).then(function (chaos){
    var message = {
      data : {
        title :'새로운 POST 가 등록되었습니다!',
        str : snap.data().title
      },
      tokens : reg_tokens
    }
    //메세지 발송
    admin.messaging().sendMulticast(message).then((response) => {
      console.log(response.successCount + "messages were sent successfully")
    });
    return true;
  })
});