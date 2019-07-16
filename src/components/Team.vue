<template>
    <v-item-group>
        <v-container grid-list-md>
            <v-layout wrap>
                <v-flex
                  v-for="profile in profiles"
                  :key="profile"
                  xs12
                  md4
                  >
                    <v-hover>
                        <v-card 
                          slot-scope="{ hover }"
                          :color="hover ? 'primary' : ''" 
                          class="team-card d-flex align-center"
                          dark
                          height="35vh"
                          :style="{backgroundImage: `url(${profile.imgUrl})`, backgroundSize: 'contain'}"
                          >
                         <v-scroll-y-transition>
                             <div
                                v-if="hover"
                                class="darken-2 display-3 text-xs-center fill-height d-flex align-center justify-center"
                                :style="{backgroundColor: 'rgba(255, 255, 255, 0.5)', color: '#000'}"
                              >
                              Active
                              </div>
                         </v-scroll-y-transition>
                        </v-card>
                    </v-hover>  
                </v-flex>
            </v-layout>
        </v-container>
    </v-item-group>
</template>

<script>
export default {
    data(){
        return {
            profiles: [
                { imgUrl: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png'},
                { imgUrl: 'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png'},
                { imgUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Maggie_Simpson.png'},
                { imgUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ec/Lisa_Simpson.png'},
                { imgUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Marge_Simpson.png'},
            ],
        }
    },

}
</script>

<style scoped>
.team-card {
    background-position: center;
}


</style>
