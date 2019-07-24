<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog_portfolio" fullscreen hide-overlay transition="dialog-bottom-transition">
      <!-- dialog acticator section --> 
      <template v-slot:activator="{ on }">
        <v-card max-width="260" class="portfolio--card" v-on="on">
          <v-img :src="imgSrc" height="200px">
          </v-img>
          <v-card-title primary-title>
            <div class="cardtable">
              <div class="headline">{{title}}</div>
              <span class="grey--text">{{body}}</span>
            </div>
          </v-card-title>
        </v-card>
      </template>

      <!-- dialog-portfoilo section --> 
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 d-inline-flex justify-space-around class="px-0 py-5">
            <v-flex xs2 >
              <v-btn fab dark color="#1c2938" @click="dialog_portfolio = false"><v-icon>close</v-icon></v-btn>
            </v-flex>
            <v-flex xs10 class="px-0">
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
                    <div class="portfolio--date mb-3">{{ stringDate }}</div>
                    {{ body }}
                  </div>
                  <v-card-actions>
                    <v-btn flat>Share</v-btn>
                    <v-btn flat>Comment</v-btn>
                </v-card-actions>
                </v-card-text>
                <Disqus/>
                <Disqus/>
              </v-card>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    
    </v-dialog>
  </v-layout>

</template>

<script>
import Disqus from './Disqus'

export default {
	name: 'Porfolio',
	props: {
		date: {type: String},
		title: {type: String},
		body: {type: String},
		imgSrc: {type: String},
	},
	components: {
    Disqus
  },
	data() {
		return {
      dialog_portfolio: false, 
      stringDate: ''
		}
	},
  methods:{

  },
  created: function(){
    this.stringDate = this.date.substring(0, 16)
  }
  }

</script>
<style>
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
