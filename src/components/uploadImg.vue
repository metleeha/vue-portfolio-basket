<template>
  <div class="filebox">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <!-- <img id="image" class="img" src="http://dy.gnch.or.kr/img/no-image.jpg"><br/> -->
        <img id="image" class="img" height="150" src="../assets/noimg.jpg"><br/>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn raised class="primary" @click="onPickFile"><v-icon>add_photo_alternate</v-icon></v-btn>
        <input type="file"
          style="display:none"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked">
      </v-flex>
    </v-layout>

  </div>
</template>



<script>

import * as firebase from 'firebase'
// import { firestore } from '../services/firebaseService';

export default {
	name: 'UploadImg',
  data(){
    var file = document.getElementById('file');
    var image = document.getElementById('image');
    return{
      image: '',
      imageUrl:''
    }
  },
	props: {
		imgSrc: {type: String},
		text: {type: String}
	},
	methods: {

  onPickFile(){
    this.$refs.fileInput.click();
  },
  onFilePicked(event){
    const files = event.target.files
    let filename = files[0].name;
    if(filename.lastIndexOf('.')<=0){
      return alert('please add a valid file!')
    }
    var target = event.currentTarget;
     var xmlHttpRequest = new XMLHttpRequest();
     xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', true);
     xmlHttpRequest.setRequestHeader("Authorization", "Client-ID 60c79609351acef");
     xmlHttpRequest.onreadystatechange = function () {
       if (xmlHttpRequest.readyState == 4) {

       if (xmlHttpRequest.status == 200) {
         // console.log("1");
         var result = JSON.parse(xmlHttpRequest.responseText);
         // console.log(result.data.link);
         image.src = result.data.link;
         // console.log(result);
         this.imageData = image.src;
       }
       else {
         alert("업로드 실패");
         image.src = "http://dy.gnch.or.kr/img/no-image.jpg";
       }
     }
   };

   xmlHttpRequest.send(target.files[0]);

  }


	}
}
</script>
<style>
/* .img{
  width: 150px;
  height: 150px;
} */

</style>
