<template>
<v-layout wrap xs12 justify-center>
    <div class="markdown">
        <v-flex xs8 wrap row class="my-1">
            <v-flex xs7>
                <v-text-field label="title" v-model="title" class="mr-1"></v-text-field>
                <v-btn icon @click="posting">
                    <v-icon>send</v-icon>
                </v-btn>
            </v-flex>
        </v-flex>
        <v-flex xs8 class="mt-4">
            <vue-simplemde v-model="contents" ref="markdownEditor" />
        </v-flex>
    </div>
</v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
    name: 'PostWriterPage',
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
        update: {
            type: Boolean,
            default: false
        }
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

            if (this.isOnline) {
                if (this.update) {
                    // 로컬 데이터로 DB에 반영
                    if (await FirebaseService.updatePost(this.id, this.title, this.contents)) {
                        // 페이지 리로딩
                        this.$store.state.updatePostDone = true
                    } else {
                        alert("수정 권한이 없습니다.");
                        return;
                    }
                } else {
                    // 접속한 유저 정보 DB에서 받아옴
                    const user = await FirebaseService.getUserDataAuth()
                    if (!user) {
                        alert("작성 권한이 없습니다.");
                        return
                    }
                    //파이어베이스 디비에 넣는 작업
                    if (await FirebaseService.postPost(user.displayName, this.title, this.contents)) {
                        // 페이지 리로딩
                        this.$store.state.postPostDone = true
                    } else {
                        alert("작성 권한이 없습니다.");
                        return;
                    }
                }
            } else {
                if (this.update) {
                    // 페이지 리로딩
                    this.$store.state.updatePostDone = true
                    // 로컬 데이터로 DB에 반영
                    FirebaseService.updatePost(this.id, this.title, this.contents)
                } else {
                    // 접속한 유저 정보 DB에서 받아옴
                    const user = await FirebaseService.getUserDataAuth()
                    if (!user) {
                        alert("작성 권한이 없습니다.");
                        return
                    }
                    // 페이지 리로딩
                    this.$store.state.postPostDone = true
                    //파이어베이스 디비에 넣는 작업
                    FirebaseService.postPost(user.displayName, this.title, this.contents)
                    //내 store에 넣는 작업
                    this.$store.state.posts.splice(0, 0, {
                        id: user.displayName+this.$store.state.posts[1].created_at,
                        username: user.displayName,
                        created_at: this.$store.state.posts[1].created_at,
                        title: "[업로드중]"+this.title,
                        body: this.contents,
                        deleted: false
                    });
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
