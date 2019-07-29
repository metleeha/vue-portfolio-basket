<template>
  <v-layout py-4 h-100>
    <v-flex row @click="gotoPortfolio()">
      <div class="caption">{{formatedDate}}</div>
      <h2 class="color-333 headline font-weight-light">{{title}}</h2>
      <p class="mb-1 color-666 font-weight-light subheading">{{body}}</p>
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
  .color-666 {
    color: #666;
  }
  .color-333 {
    color: #333;
  }
  .h-100 {
    height: 100%;
  }
  .caption {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .headline {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .subheading {
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
