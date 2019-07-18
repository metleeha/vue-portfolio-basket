<template>
  <div class="img-banner">
    <v-img :src="imgUrl"
           aspect-ratio="1.7"
           max-height="100vh">
           <v-dialog v-model="dialog" row justify-center max-width="800px">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" class='moveIcon' dark large><v-icon x-large>refresh</v-icon></v-btn>
            </template>
            <v-card>
                <v-card-title primary-title class="layout justify-center"> 
                    <h1>배너이미지 선택</h1>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                      <v-layout row>
                        <v-container grid-list-sm fluid>
                          <v-layout row wrap>
                            <v-card flat tile class="d-flex">
                                  
                                
                                  <v-btn flat class='randomImgSize' @click="getRandomImgUrl()">
                                    <h1>?</h1>
                                    <template v-slot:placeholder>
                                      <v-layout
                                      fill-height
                                      align-center
                                      justify-center
                                      ma-0
                                      >
                                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                      </v-layout>
                                    </template>
                                  </v-btn>
                              </v-card>
                            
                            <v-flex
                            v-for="(n, i) in this.imgUrlList.length"
                            :key="i"
                            xs4
                            d-flex
                            >
                              <v-card flat tile class="d-flex">
                                  
                                <v-img
                                :src= 'imgUrlList[i].img'
                                aspect-ratio="1.8"
                                class="grey lighten-2"
                                >
                                  <v-btn flat class='imgSize' @click="getImgUrl(imgUrlList[i].img)">
                                    <template v-slot:placeholder>
                                      <v-layout
                                      fill-height
                                      align-center
                                      justify-center
                                      ma-0
                                      >
                                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                      </v-layout>
                                    </template>
                                  </v-btn>
                                </v-img>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-container>
                      </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>	  
      <v-layout align-center justify-center row fill-height>
        <v-flex class=' moveSlot'>
          <span class="banner-title text-shadow">
            <slot name="text"/>
          </span>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
import FirebaseService from '../services/FirebaseService'

export default {
  name: 'ImgBanner',
  components: {
  },
	props: {
		imgSrc: {type: String},
    text: {type: String},
  },
  data() {
    return {
      imgUrlList: [],
      imgUrl: this.imgSrc,
      dialog: false,
      randomUrlList: [
        'https://source.unsplash.com/user/erondu/daily',
        'https://source.unsplash.com/weekly?water',
        'https://source.unsplash.com/1600x900/?nature,water',
        'https://source.unsplash.com/collection/190727/1600x900'
      ],
      index: 0
    }
  },
  mounted() {
    this.getBannerImg()
    if(this.imgSrc == null) {
      this.imgUrl = 'https://source.unsplash.com/collection/190727/1600x900'
    }
    // console.log(this.imgSrc)
  },
	methods: {
    routerclick(page){
      this.$router.push(page);
      window.scrollTo(
        {
          top: 0,
          left: 0,
          behavior: 'smooth'
        }
      )
    },
    getImgUrl(path) {
      this.imgUrl = path
      this.dialog = false
    },
    async getBannerImg() {
      this.imgUrlList = await FirebaseService.getBannerImage()
      // console.log(this.imgUrlList[0].img)
    },
    getRandomImgUrl() {
      this.index++
      if(this.index >= 4) {
        this.index = 0
      }
      this.imgUrl = this.randomUrlList[this.index]
      this.dialog = false
    }
  },
 
}
</script>
<style scoped>
  .img-banner{
    margin-top: -2vh;
  }
  .banner-title{
    padding-top: 400px;
    text-align:end;
    /* line-height:1.2em;  */
    color:#f2f2f2; 
    font-size:8vw; 
    font-family: Oswald;
  }
  .text-shadow {
    text-shadow: 0 0 10px #424242;
  }
  .imgSize {
    width: 220px;
    height: 120px;
    padding: 0%;
    margin: 0%;
}
  .randomImgSize {
    width: 212px;
    height: 120px;
}
.moveIcon {
  margin-top: 20px;
}
.moveSlot {
  margin-top: -10px;
}
</style>
