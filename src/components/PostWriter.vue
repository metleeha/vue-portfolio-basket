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
    props: {
        id: { type: String, default: '' },
        ti: { type: String, default: '' },
        body: { type: String, default: '' },
        update: { type: Boolean, default: false }
    },
    data() {
        return {
            title: '',
            contents: '',
        }
    },
    created() {
        this.title = this.ti
        this.contents = this.body
    },
    methods: {
        async posting(event) {
            if (this.update) {
                // 해당 ID를 가진 portfolio를 DB에서 가져옴
                const postdata = await FirebaseService.getPost(this.id)
                // 접속한 유저 정보 DB에서 받아옴
                const user = await FirebaseService.getUserDataAuth()
                // 접속 유저정보와 DB 데이터비교 권한 인증
                if(FirebaseService.authUserAndDB(postdata, user)){
                    // 로컬 데이터로 DB에 반영
                    FirebaseService.updatePost(this.id, this.title, this.contents)
                    // 페이지 리로딩
                    this.$store.state.updatePostDone = true
                }else{
                    alert("작성 권한이 없습니다.");
                    return;
                }
            } else {
                // 접속한 유저 정보 DB에서 받아옴
                const user = await FirebaseService.getUserDataAuth()
                // 유저 정보가 새 글 쓰기가 가능한지 인증
                if(await FirebaseService.authUserWriter(user)){
                    //파이어베이스 디비에 넣는 작업
                    FirebaseService.postPost(user.displayName, this.title, this.contents)
                    // 페이지 리로딩
                    this.$store.state.postPostDone = true
                }else{
                    alert("작성 권한이 없습니다.");
                    return;
                }
            }
        }
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
