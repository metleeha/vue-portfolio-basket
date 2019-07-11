<template>
  <div class="translatebtn">
    <v-layout>
        <v-btn icon @click="translateAll()">
          <v-icon v-show="!translateState" rounded>g_translate</v-icon>
          <v-icon v-show="translateState" rounded color="black">g_translate</v-icon>
        </v-btn>
    </v-layout>
  </div>
</template>

<script>
import TranslateService from '@/services/TranslateService'

export default {
	name: 'TranslateBtn',
	data: () => ({
      translateState: false
    }),
	methods: {	
		async translateAll(){
      this.translateState = !this.translateState;
			await TranslateService.translate();
		}
	}
}
</script>