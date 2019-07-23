import translate from 'translate'
var token = require('../apikeys.json')

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
				// 이미 번역된 건 제외
				if(tags[i].dataset.tran)
					continue;
				// 자식노드가 텍스트인지 확인
				for (let j = 0; j < tags[i].childNodes.length; j++) {
					if(tags[i].childNodes[j].nodeName == "#text"){
						// 빈 태그 <div></div> 같은거 걸러줌
						if(tags[i].childNodes[j].nodeValue == '')
							continue;
						var mytext = tags[i].childNodes[j].nodeValue;   
						const translateText = await translate(mytext, { from:'en', to: 'ko', engine: 'google', key: token.googleAPIKey });
						
						var tnode = document.createElement('font');          // font 엘리먼트 생성
						var ttext = document.createTextNode(translateText); 	// translateText text 생성
						
						tnode.appendChild(ttext);                                // 엘리먼트에 자식으로 추가
						tnode.dataset.tran = mytext;
						tnode.setAttribute('style','vertical-align: inherit');
						// alert(tnode.textContent+"\n"+tnode.dataset.tran+'\n'+j+'\n'+i+"\n"+tags[i].childNodes[j].nodeName);
						await tags[i].replaceChild(tnode, tags[i].childNodes[j]);
					}
				}
			}	
		}else{
			this.translateState = false;
			var body = document.getElementsByTagName('body');
			var tags = body[0].getElementsByTagName('*');
			for (let i  = 0; i < tags.length; i++) {
				if(tags[i].dataset.tran!=null){
					var text = document.createTextNode(tags[i].dataset.tran); 	// 원본 text 생성
					tags[i].parentNode.replaceChild(text,tags[i]);
				}
			}
		}
	}
}