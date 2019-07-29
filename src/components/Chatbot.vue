<template>
    <div id="frogue-container"  data-chatbot=config.dataChatbot data-user="gilseong223@gmail.com" data-init-key="value"></div>
</template>

<script>

import config from "../../ignore/firebaseAPI.json"

export default {
    methods: {
        setChatbot(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
            fjs.parentNode.insertBefore(js, fjs);
            getChatbot(document, 'script', 'frogue-embed');
        },
        
    },
    mounted(){
        this.setChatbot()
    }
}
</script>

<style scoped>

</style>