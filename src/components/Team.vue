<template>
    <v-container grid-list-md xs12 row>
        <v-layout wrap my-5 justify-space-around>
            <v-flex
                v-for="profile in profiles"
                :key="profile.name"
                xs12
                md6
                sm4
                lg2
            >
                <v-hover>
                    <!-- #8bcfcc -->
                    <v-card 
                        slot-scope="{ hover }"
                        :color="hover ? 'primary' : '#FAFAFA'" 
                        class="team__card d-flex align-center my-2"
                        dark
                        height="35vh"
                        :style="{backgroundImage: `url(${profile.imgUrl})`, backgroundSize: 'contain'}"
                        >
                        <v-scroll-y-transition>
                            <div
                            v-if="hover"
                            class="darken-2 text-xs-center fill-height d-flex align-center justify-center"
                            :style="{backgroundColor: 'rgba(255, 255, 255, 0.5)', color: '#252525'}"
                            >
                            <v-layout>
                                <v-flex>
                                    <span class="display-1 text-xs-center profile__name">{{ profile.name }}</span>
                                    <p>{{ profile.role }}</p>
                                    <v-btn
                                    class="mr-1 profile-icons text-xs-center"
                                    icon
                                    color="#e42c64"
                                    @click="openGit(profile.git)"
                                    ><v-icon size="24px">fa-gitlab</v-icon></v-btn>
                                    <v-btn
                                    class="profile-icons text-xs-center pt-1"
                                    icon
                                    color="#e42c64"
                                    :href="'mailto:'+ `${profile.email}`"                                    
                                    ><v-icon size="24px">fa-envelope</v-icon></v-btn>
                                </v-flex>
                            </v-layout>
                            </div>
                        </v-scroll-y-transition>
                    </v-card>
                </v-hover>  
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            profiles: [
                { name: 'Hadong', role: 'Frontend', git: 'https://lab.ssafy.com/metleeha', email: 'nodongth@gmail.com', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png'},
                { name: 'Gilsung', role: 'DevOps', git: 'https://lab.ssafy.com/Gilseong', email: 'gilseong223@gmail.com', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png'},
                { name: 'Jinhwan', role: 'Backend', git: 'https://lab.ssafy.com/jinhwan_nim', email: 'dicmon@naver.com', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Maggie_Simpson.png'},
                { name: 'Wooseong', role: 'Scrum', git: 'https://lab.ssafy.com/wsjeong', email: 'wsjeongssa1@gmail.com', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png'},
                { name: 'Haebin', role: 'Backend', git: 'https://lab.ssafy.com/heabin', email: 'heabin209@gmail.com', imgUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png'},
            ],
        }
    },
    methods: {
        openGit(git){
            window.open(git, '_blank');
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arvo|Lobster&display=swap');

.team__card {
    background-position: center;
    font-family: 'Arvo', serif;
    margin: auto;
    border-radius: 15px;
    
}
.profile__name{
    font-family: 'Lobster', cursive!important;        
}

</style>
