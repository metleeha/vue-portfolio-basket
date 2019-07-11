<template>
  <div class="translatebtn">
    <v-layout>
        <v-btn icon @click="translate()">
          <v-icon rounded>g_translate</v-icon>
        </v-btn>
    </v-layout>
  </div>
</template>

<script>
import translate from 'translate'

export default {
	name: 'TranslateBtn',
	data: () => ({
      translateState: false
    }),
	methods: {	
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