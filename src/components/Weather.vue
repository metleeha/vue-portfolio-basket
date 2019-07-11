<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
            <v-card>
                <div>날씨</div>
            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>
import WeatherApi from '../services/WeatherApi'

export default {
    name: 'weather',
    data(){
        return{
            currentTemp: '',
            minTemp: '',
            maxTemp:'',
            sunrise: '',
            sunset: '',
            pressure: '',
            humidity: '',
            wind: '',
            overcast: '',
            icon: ''
        }
    },
    methods: {
        populate(response){
             this.currentTemp = response.data.main.temp;
             this.minTemp = response.data.main.temp_min;
             this.maxTemp = response.data.main.temp_max;
             this.pressure = response.data.main.pressure;
             this.humidity = response.data.main.humidity + '%';
             this.wind = response.data.wind.speed + 'm/s';
             this.overcast = response.data.weather[0].description;
             this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
             this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 4);
             this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 4);
        }
    },
    mounted(){
        const weatherData = WeatherApi.loadCoords();
    }
}
</script>
