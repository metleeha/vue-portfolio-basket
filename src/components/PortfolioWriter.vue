<template>
    <v-container>
      <v-layout>
        <div class="markdown">
          <v-flex xs9>
            <v-text-field label="title" v-model="title"></v-text-field>
            <v-btn icon @click="posting"><v-icon>send</v-icon></v-btn>
            <UploadImg></UploadImg>
          </v-flex>
          <v-flex xs10>
            <markdown-editor v-model="contents"></markdown-editor>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
</template>


<script>
import UploadImg from '../components/UploadImg'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'PortfolioWriterPage',
  data(){
    title:'';
    contents: '';
    img: '';

    return {
      title:'',
      contents: '',

      }
  },
	components: {
        UploadImg
	},
  methods:{
    posting(event){
      // component에서 이미지 불러오기
      var test = document.getElementById('image')
      console.log("posting is clicked!");
      console.log(test);
      this.img = test.src;
      console.log(this.title)
      console.log(this.contents)
      console.log(this.img)

      //파이어베이스 디비에 넣는 작업
      FirebaseService.postPortfolio(this.title,this.contents,this.img)
      // 등록 완료 후, 포트폴리오 목록 페이지로 이동
      document.location.href="/Portfolio"
    },

    }
  }

</script>
<style>

.markdown {
  width: 100%;
  text-align: -webkit-center;
}
.v-text-field {
  display: inline-block;
  width: 75%
}
.v-btn--icon {
  display: inline-block;
}

</style>
