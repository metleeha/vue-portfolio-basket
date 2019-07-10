<template>
  <v-app>
    <Header/>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer height="auto" color="indigo" dark>
      <v-layout justify-center row wrap>
        <v-flex color="indigo" dark py-3 text-xs-center white--text xs12>
          <div>&copy;2019 — <strong>Jeong Wooseong</strong></div>
          <div>E-mail — wsjeongssa1@gmail.com</div>
        </v-flex>
        <v-btn icon @click="translate()">
          <v-icon rounded>g_translate</v-icon>
        </v-btn>
      </v-layout>
    </v-footer>
    <v-btn id="scrollupbtn" v-show="fab" v-scroll="onScroll" @click="toTop">
      <v-icon>
        keyboard_arrow_up
      </v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import store from './store'
import Header from '@/components/Header'
import translate from 'translate'

export default {
	name: 'App',
	store,
  data: () => ({
      fab: false,
      translateState: false
    }),
	components: {
		Header
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

  },
  methods:{
    onScroll () {
        if (typeof window === 'undefined') return

        const top = window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
        this.fab = top > 0
      },
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    async translate(){
      if(!this.translateState){
        this.translateState = true;
        var b = document.getElementsByTagName('body');
        var t = b[0].getElementsByTagName('*');
        for (let i  = 0; i < t.length; i++) {
          var chidetext;
          if(t[i].firstChild!=null){
            chidetext = t[i].firstChild.nodeName;
          }else {
            chidetext = "no child";
          }
          var mytext = t[i].textContent;  
          if(chidetext == "#text"){
            t[i].dataset.text = mytext;
            const text = await translate(mytext, { to: 'ko', engine: 'google', key: 'AIzaSyCA_BkTU5SYTmVWT4HRoxiJCjc0htwEx5M' });
            t[i].textContent = text;
          }
        }
      }else{
        this.translateState = false;
        var b = document.getElementsByTagName('body');
        var t = b[0].getElementsByTagName('*');
        for (let i  = 0; i < t.length; i++) {
          if(t[i].dataset.text!=null){
            t[i].textContent = t[i].dataset.text;
          }
        }
      }
    }
  }
}

</script>
<style>
#scrollupbtn {
  position: fixed;
  z-index: 4;
  background-color: rgb(63,81,181);
  border-color:  rgb(63,81,181);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  min-width: 40px;
  margin: 0;
  padding: 0;
  bottom: 40px;
  right: 20px;

  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),
              0px 6px 10px 0px rgba(0,0,0,0.14),
              0px 1px 18px 0px rgba(0,0,0,0.12);

  transition: all 1s ease;

}
</style>
