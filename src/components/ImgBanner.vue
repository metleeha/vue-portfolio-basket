<template>
  <div class="img-banner">
    <v-img :src="imgSrc"
           aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="banner-title text-shadow display-3 font-weight-light">
            <slot name="text"/>
          </span>
        <v-btn @click="routerclick(btnlink)" v-show=!btnshow color='#d6e4f0' outline dark large >{{ content }}</v-btn>
        </v-flex>
      </v-layout>
    </v-img>
  </div>
</template>

<script>
export default {
	name: 'ImgBanner',
	props: {
		imgSrc: {type: String},
    text: {type: String},
    btnshow: {type: Boolean, default:false},
    content: {type: String, default:''},
    btnlink: {type: String},
  },
  data() {
    return {

    }
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
    }
	},
}
</script>
<style scoped>
  .img-banner{
    margin-top: -2vh;
  }
  .banner-title{
    padding-top: 200px;
    text-align: center;
    line-height:1.2em; 
    color:#f2f2f2; 
    font-size:6vw; 
    font-family:Roboto Slab;
  }
  .text-shadow {
    text-shadow: 0 0 10px #424242;
  }
</style>
