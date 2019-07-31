<template>
    <v-layout wrap xs12 justify-center>
      <div class="markdown">
        <v-flex xs8 wrap row class="my-1">
          <v-flex xs7 >
            <v-text-field label="title" v-model="title" class="mr-1"></v-text-field>
            <v-btn icon @click="posting"><v-icon>send</v-icon></v-btn>
          </v-flex>
        </v-flex>
        <v-flex xs8 class="mt-4">
          <markdown-editor v-model="contents"></markdown-editor>
        </v-flex>
      </div>
    </v-layout>
</template>


<script>
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'PostWriterPage',
  props:{
    id: {type:String, default: ''},
    ti: {type:String, default: ''},
    body: {type:String, default: ''},
    update: {type:Boolean, default: false}
  },
  data(){
    return {
        title : '',
        contents : '',
      }
  },
  created(){
    this.title = this.ti
    this.contents = this.body
  },
  methods:{
    posting(event){
      if(this.update){
        FirebaseService.updatePost(this.id, this.title, this.contents)
        // 페이지 리로딩
        this.$store.state.updatePostDone = true
      }else{
        //파이어베이스 디비에 넣는 작업
        FirebaseService.postPost(this.title,this.contents)
        // 페이지 리로딩
        this.$store.state.postPostDone = true
      }
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
