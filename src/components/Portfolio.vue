<template>
  <v-card v-on:click="gotoPortfolio()">
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

<script>

export default {
	name: 'Portfolio',
	props: {
		date: {type: String},
		title: {type: String},
		body: {type: String},
		imgSrc: {type: String},
	},
	data() {
		return {

		}
	},
  methods:{
    gotoPortfolio(){
      this.$router.push({name: 'portfolioview', params: { title: this.title, body: this.body, date: this.date, imgSrc: this.imgSrc}});
      // this.$router.push({name: 'portfolioview'});
      // eventBus.$emit('senddata',this.title, this.body, this.date, his.imgSrc);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
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
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
