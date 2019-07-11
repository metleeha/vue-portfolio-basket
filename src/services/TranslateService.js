import translate from 'translate'

var translateState = false;

export default {
	async translate(){
		if(!this.translateState){
			this.translateState = true;
			var body = document.getElementsByTagName('body');
			var tags = body[0].getElementsByTagName('*');
			for (let i  = 0; i < tags.length; i++) {
				// 아이콘 번역 제외
				if(tags[i].getAttribute('class') != null)
					if(tags[i].getAttribute('class').indexOf('v-icon') != -1)
						continue;
				// 자식노드가 텍스트인지 확인
				var childTag;
				if(tags[i].firstChild!=null){
					childTag = tags[i].firstChild.nodeName;
				}else {
					childTag = "no child";
				}
				if(childTag == "#text"){
					var mytext = tags[i].textContent;  
					tags[i].dataset.text = mytext;
					const translateText = await translate(mytext, { to: 'ko', engine: 'google', key: 'AIzaSyCA_BkTU5SYTmVWT4HRoxiJCjc0htwEx5M' });
					tags[i].textContent = translateText;
				}
		}	
		}else{
			this.translateState = false;
			var body = document.getElementsByTagName('body');
			var tags = body[0].getElementsByTagName('*');
			for (let i  = 0; i < tags.length; i++) {
				if(tags[i].dataset.text!=null){
					tags[i].textContent = tags[i].dataset.text;
				}
			}
		}
	}
}