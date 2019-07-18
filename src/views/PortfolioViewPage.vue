<template>
  <div>

    <v-container>
      <v-layout class="page-header" row>
        <v-flex xs12>
          <h1 class="page-title">{{ $route.params.title }}</h1>
        </v-flex>
      </v-layout>
      <v-layout class="page-content">
        <v-flex xs12>
          <v-layout row class="page-author">
            <v-flex xs12 justify-content-left>
              <span><v-icon class="mr-1">fa-paperclip</v-icon>{{ stringDate }}</span>
              <span><v-icon class="mr-1">fa-user</v-icon>by admin</span>
              <span><v-icon class="mr-1">fa-comments</v-icon>3 Comments</span>
            </v-flex>
          </v-layout>
          <v-img 
            :src='$route.params.imgSrc'
            max-height="300"
            cover
          ></v-img>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs12 class="page-body">
          <h4>{{$route.params.body}}</h4>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>



<script>
export default {
	name: 'PortfolioViewPage',
	data(){
    return{
      stringDate: ''
    }
  },
  created: function(){
    this.stringDate = this.$route.params.date.substring(0, 16)
  }
  
}
</script>


<style scoped>
@media screen and (max-width:960px) {

}
@media screen and (max-width:600px) {

}
.page-header{
  height: 20vh;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: black;
}
.page-title{
  margin: 0 0 5px;
  padding-top: 10vh;
  font-family: Roboto;
  font-size: 50px;
  text-align: center;
  line-height: 40px;
}
.page-content{
  padding-top: 2vh;
}
</style>
