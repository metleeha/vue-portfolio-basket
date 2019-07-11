<template>
  <div class="translatebtn">
    <v-layout>
        <v-btn icon @click="translateAll()">
          <v-icon rounded>g_translate</v-icon>
        </v-btn>
    </v-layout>
  </div>
</template>

<script>
import TranslateService from '@/services/TranslateService'

export default {
	name: 'TranslateBtn',
	data: () => ({
    }),
	methods: {	
		translateAll(){
			TranslateService.translate();
		}
	}
}
</script>