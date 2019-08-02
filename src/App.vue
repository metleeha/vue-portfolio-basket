<template>
    <v-app id="back">
      <!-- header -->
      <Header/>
      <!-- main body-->
      <v-content>
      <router-view/>
      </v-content>
      <!-- footer -->
      <Footer />
      <!-- Chatbot -->
      <!-- <Chatbot /> -->
    </v-app>
</template>

<script>
import store from './store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
var config = require('../ignore/googleAPI.json')

export default {
	name: 'App',
  store,
  components: {
    Header,
    Footer,
	},
  data() {
    return {
    }
  },
  created: function(){
    var agent = navigator.userAgent.toLowerCase();
    var browser;
    if(agent.indexOf('edge')>-1){
    	browser='익스플로러 엣지';
    }else if(agent.indexOf('whale')>-1){
    	browser='네이버 웨일';
    }else if(agent.indexOf('chrome')>-1){
    	browser='크롬';
    }else if(agent.indexOf('safari')>-1){
    	browser='사파리';
    }else if(agent.indexOf('firefox')>-1){
    	browser='파이어폭스';
    }else if(agent.indexOf('opera')>-1){
    	browser='오페라';
    }else{
    	browser='익스플로러';
    }
    if (browser != '크롬') {
      alert("해당 사이트는 크롬에 최적화 되어있습니다.");
    }
    // 익스플로러 11    : Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko
    // 익스플로러 edge  : Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586
    // 크롬             : Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36
    // 파이어폭스		    : Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0
    // 네이버 웨일	    : Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.49 Whale/0.5.12.4 Safari/537.36
    // Mobile Safari   : Mozilla/5.0 (iPod; U; CPU iPhone OS 3_1_3 like Mac OS X; ko-kr) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16
    // Android Web Browser : Mozilla/5.0 (Linux; U; Android 2.1-update1; ko-kr; Nexus One Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17
    // Opera Mini      : Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.18302/1114; U; en) Presto/2.4.15
    
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', config.googleAnalytics , 'auto');
      ga('send', 'pageview');
    },

}
</script>
<style scoped>
  #back {
    background-color: #f4f6f6;
  }

</style>
