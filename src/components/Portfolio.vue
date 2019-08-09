<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog_portfolio" width="60%" scrollable transition="dialog-bottom-transition">
      
      <!-- dialog acticator section --> 
      <template v-slot:activator="{ on }">
        <v-card class="portfolio--card" v-on="on">
          <v-img :src="imgSrc" height="200px">
          </v-img>
          <v-card-title primary-title>
            <div class="cardtable">
              <div class="headline">{{ title }}</div>
              <span class="grey--text">{{ plainMarkDown }}</span>
            </div>
          </v-card-title>
        </v-card>
      </template>

      <!-- dialog-portfoilo section --> 
        <v-layout row wrap>
          <v-flex xs12 d-inline-block justify-space-around class="px-0">
            <v-flex xs12 class="px-0">
              <v-card dark white--text color="#1c2938">
                <v-img :src="imgSrc" id="portfolio--image"></v-img>
                <v-card-title primary-title>
                  <div>
                    <h1 class="portfolio--headline mb-0 mx-2">{{ title }}</h1>
                  </div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <div class="portfolio--body">
                    <div>{{ name }}</div>
                    <div class="portfolio--date mb-3">{{ stringDate }}</div>
                    <div v-html="compiledMarkdown"></div>
                  </div>
                  <v-card-actions>
                    <v-btn flat @click="gotoPortfolio()">detail</v-btn>
                </v-card-actions>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-flex>
        </v-layout>
    
    </v-dialog>
  </v-layout>

</template>

<script>

import marked from 'marked';
const removeMd = require('remove-markdown');
export default {
	name: 'Porfolio',
	props: {
    id: {type:String},
    name: {type:String},
		date: {type: String},
		title: {type: String},
		body: {type: String},
    imgSrc: {type: String},
	},
	data() {
		return {
      dialog_portfolio: false, 
      stringDate: ''
		}
	},
  methods:{
    async gotoPortfolio(){
      this.$router.push({name: 'portfolioview', params: { id: this.id }})
      // this.$router.push({name: 'portfolioview'});
      // eventBus.$emit('senddata',this.title, this.body, this.date, this.imgSrc);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
  },
  created: function(){
    this.stringDate = this.date
  },
  computed:{
        plainMarkDown: function () {
            return removeMd(this.body);
        },
        compiledMarkdown: function () {
            return marked(this.body)
        }
  }
}
</script>
<style>
.v-dialog {
  max-height: 600px!important;
}
.cardtable {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.headline {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.grey--text {
  white-space: normal;
  line-height: 1.2;
  height: 4.8em;
  text-align: center;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.portfolio--card{
  border-radius: 15px;
  min-width: 200px;
}
.portfolio--bg{
  background-color: rgba(255,215,0,0.8);
  width: 100vw;
}
#portfolio--image{
  max-height: 400px;
  position: relative;
}
.portfolio--headline{
  padding-left: 2rem;
  line-height: 3rem;
}
.portfolio-date{
  line-height: 2rem;
}
.portfolio--body{
  padding: 1rem 2rem;
  text-align: justify;
}
</style>
