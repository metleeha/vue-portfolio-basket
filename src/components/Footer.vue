<template>
    <!-- footer -->
	<v-footer
		dark
		height="auto"
	>
		<v-layout>
			<v-flex xs12>
				<v-card
					flat
					tile
					class="darken-1 white--text text-xs-center"
					width="100vw"
					color="#1e56a0"
				>
					<v-card-text>
						<v-btn
							v-for="ii in icons"
							:key="ii.emoji"
							:href='ii.link'
							class="mx-3 white--text footer-icons"
							icon
						>
							<v-icon size="24px">{{ ii.emoji }}</v-icon>
						</v-btn>
						<span class='weather-api'>날씨정보</span>
					</v-card-text>
					<v-card-text class="white--text pt-0">
						Please contact us if you have any question. 
					</v-card-text>

					<v-divider></v-divider>

					<v-card-text class="white--text">
						&copy;2019 — <strong>TEN</strong>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
		
	</v-footer>
	<!-- end footer -->
</template>

<script>
import Weather from '../components/Weather'

export default {
	name: 'Footer',
	data() {
		return {
			icons: [
				{ emoji:'fa-facebook', link: 'https://www.facebook.com/hellossafy/'},
				// 'fa-twitter',
				// 'fa-google-plus',
				{ emoji:'fa-instagram', link: 'https://www.instagram.com/hellossafy/'},
				{ emoji: 'fa-gitlab', link: 'https://lab.ssafy.com/metleeha/webmobile-sub2' }
			],
		}
	},
	components: {
		Weather
	},
	created() {
		
	}


}
</script>
<style scoped>
.footer-icons {
	display: inline-flex;
}
.weather-api {
	display: inline-flex;
	position: absolute;
	right:10vw;
	top: 5vh;
}
</style>
