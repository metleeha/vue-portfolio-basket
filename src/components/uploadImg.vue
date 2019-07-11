<template>
  <div class="filebox">
    <img id="image" class="img" src="http://dy.gnch.or.kr/img/no-image.jpg"><br/>
    <label for="file"><v-icon>add_photo_alternate</v-icon></label>
    <input type="file" id="file" @change="onFileChanged">
  </div>
</template>



<script>

export default {
	name: 'uploadImg',
  data(){
    var file = document.getElementById('file');
    var image = document.getElementById('image');
  },
	props: {
		imgSrc: {type: String},
		text: {type: String}
	},
	methods: {
    onFileChanged (event) {
    const file = event.target.files[0]
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
    // console.log(target.files[0]);
    xmlHttpRequest.send(target.files[0]);
    // image.src = "https://nrm.dfg.ca.gov/images/image-loader.gif";

    }
	},
}
</script>
<style>
.img{
  width: 150px;
  height: 150px;
}
.filebox label {
  display: inline-block;
  padding: .5em .75em;
  color: #ffff;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #5cb85c;
  cursor: pointer;
  border: 1px solid #4cae4c;
  border-radius: .25em;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
}

.filebox label:hover {
  background-color: #6ed36e;
}

.filebox label:active {
  background-color: #367c36;
}

.filebox input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

</style>
