<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/collection/190727/1600x900" btnshow='false'>
      <div style="line-height:1.2em;font-size:1.2em;" slot="text">PortfolioWriter</div>
    </ImgBanner>
    <v-container>
      <v-layout>
        <div class="markdown">
          <v-flex xs9>

            <v-text-field label="title"></v-text-field>
            <v-btn icon v-on:click="posting"><v-icon>send</v-icon></v-btn>

            <uploadImg></uploadImg>

          </v-flex>
          <v-flex xs10>
            <markdown-editor></markdown-editor>
          </v-flex>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import ImgBanner from '../components/ImgBanner'
import uploadImg from '../components/uploadImg'

export default {
	name: 'PortfolioWriterPage',
  data() {

  },
	components: {
		ImgBanner,
    uploadImg
	},
  methods:{
    posting(event){
      console.log("posting is clicked!");
      console.log(event);
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
