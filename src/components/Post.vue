<template>
  <v-layout row justify-center py-4 h-100>
    <v-flex class="post-head" @click="gotoPortfolio()">
      <div class="post-title">{{ title }}</div> 
      <div class="post-date">{{ formatedDate }}</div>
      <div class="post-body subheading">{{ body }}</div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
	name: 'Post',
	props: {
    id: {type:String},
		date: {type: Date},
		title: {type: String},
		body: {type: String}
  },
  data() {
		return {
      dialog_portfolio: false, 
      stringDate: ''
		}
  },
  methods:{
    async gotoPortfolio(){
      this.$router.push({name: 'postview', params: { id: this.id }})
      // this.$router.push({name: 'portfolioview'});
      // eventBus.$emit('senddata',this.title, this.body, this.date, this.imgSrc);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
  },
  computed: {
		formatedDate() {
			return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`
    }
  }
}
</script>
<style>
  .h-100 {
    height: 100%;
  }
  .post-head {
    font-family: 'Literata', 'Noto Serif KR', serif;
  }
  .post-title {
    text-align: left;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 700;
    font-size: 2em;
  }
  .post-date {
    text-align:left;
    margin-top: 5px;
    padding-left: 3px;
  }
  .post-body {
    color: #666;
    font-size: 1.2em;
    font-weight: light;
    word-break: normal;
    margin-bottom: 1em;
    padding-left: 3px;
  }
  .subheading {
    white-space: normal;
    line-height: 1.2;
    height: 3.6em;
    text-align: left;
    margin-top: 5px;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
