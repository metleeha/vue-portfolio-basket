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
        id: {
            type: String,
            default: ''
        },
        ti: {
            type: String,
            default: ''
        },
        body: {
            type: String,
            default: ''
        },
        imgSrc: {
            type: String,
            default: ''
        },
        update: {
            type: Boolean,
            default: false
        }
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
            const authCheck = await FirebaseService.checkAuthMember();
            if (!authCheck) {
                alert("작성 권한이 없습니다.");
                return;
            }

            // component에서 이미지 불러오기
            this.img = document.getElementById('image').src
            if (this.update) {
                FirebaseService.updatePortfolio(this.id, this.title, this.contents, this.img)
                // 페이지 리로딩
                this.$store.state.updatePortfolioDone = true
            } else {
                //파이어베이스 디비에 넣는 작업
                FirebaseService.postPortfolio(this.title, this.contents, this.img)
                // 페이지 리로딩
                this.$store.state.postPortfolioDone = true
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
