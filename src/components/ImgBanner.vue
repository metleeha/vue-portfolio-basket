<template>
  <div class="img-banner">
    <v-img :src="imgSrc"
           aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="banner-title text-shadow display-3 font-weight-light">
            <slot name="text"/>
          </span>
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
		text: {type: String}
	},
	methods: {
	},
}
</script>
<style scoped>
  .img-banner{
    margin-top: -80px;
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
