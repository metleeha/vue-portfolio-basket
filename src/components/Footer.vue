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
					color="#112d4e"
				>
					<v-card-text>
						<v-flex xs12>
							<v-flex xs3>
								<v-btn
									v-for="ii in icons"
									:key="ii.emoji"
									:href='ii.link'
									class="mx-3 white--text footer-icons"
									icon
								>
									<v-icon size="24px">{{ ii.emoji }}</v-icon>
								</v-btn>
								<v-flex xs3>
									<img :src="iconURL" alt="">
								</v-flex>
							</v-flex>
							<v-flex xs6>

							</v-flex>
						</v-flex>
						
						
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
import WeatherApi from '../services/WeatherApi'
import Weather from '../components/Weather'

export default {
	name: 'Footer',
	data() {
		return {
			icons: [
				{ emoji:'fa-facebook', link: 'https://www.facebook.com/hellossafy/'},
				{ emoji:'fa-instagram', link: 'https://www.instagram.com/hellossafy/'},
				{ emoji: 'fa-gitlab', link: 'https://lab.ssafy.com/metleeha/webmobile-sub2' }
			],
			iconURL: '',
		}
	},
	components: {
		Weather
	},
	methods:{

	},
	created() {
		const weatherData = WeatherApi.loadCoords()        
        .then(data => {
			this.iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon+ ".png";
			this.description = data.weather[0].description;
        })
	}


}
</script>
<style scoped>
.footer-icons {
	display: inline-flex;
}

</style>
