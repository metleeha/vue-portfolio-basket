<template>
<v-container>
    <v-layout>
        <div class="markdown">
            <v-flex xs9>
                <v-text-field label="title" v-model="title"></v-text-field>
                <v-btn icon @click="posting">
                    <v-icon>send</v-icon>
                </v-btn>
                <UploadImg :imgSrc="img" />
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
    props: {
        id: { type: String, default: '' },
        ti: { type: String,  default: '' },
        body: { type: String, default: '' },
        imgSrc: { type: String, default: '' },
        update: { type: Boolean, default: false }
    },
    data() {
        return {
            title: '',
            img: '',
            contents: '',
        }
    },
    created() {
        this.title = this.ti
        this.img = this.imgSrc
        this.contents = this.body
    },
    components: {
        UploadImg
    },
    methods: {
        async posting(event) {
            // component에서 이미지 불러오기
            this.img = document.getElementById('image').src 
            if (this.update) {
                // 해당 ID를 가진 portfolio를 DB에서 가져옴
                const portfoliodata = await FirebaseService.getPortfolio(this.id)
                // 접속한 유저 정보 DB에서 받아옴
                const user = await FirebaseService.getUserDataAuth()
                // 접속 유저정보와 DB 데이터비교 권한 인증
                if(FirebaseService.authUserAndDB(portfoliodata, user)){
                    // 로컬 데이터로 DB에 반영
                    FirebaseService.updatePortfolio(this.id, this.title, this.contents, this.img)
                    // 페이지 리로딩
                    this.$store.state.updatePortfolioDone = true
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
                    FirebaseService.postPortfolio(user.displayName, this.title, this.contents, this.img)
                    // 페이지 리로딩
                    this.$store.state.postPortfolioDone = true
                }else{
                    alert("작성 권한이 없습니다.");
                    return;
                }
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
.markdown-editor {
    text-align: -webkit-auto;
}
</style>
