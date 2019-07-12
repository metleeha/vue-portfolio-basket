<template>
    <v-card color="rgba(184,193,204,0.5)" class="weather__section" width="230px">
        <v-layout xs-6 class="weather__measure">
            <div class="temperature__value">{{ currentTemp }}</div>
            <div class="temperature__right">
                <div class="temperature__scale">&deg;{{ scaleSymbol }}</div>
                <img :src='iconURL' alt="weather icon" >
            </div>
        </v-layout>
        <v-layout xs-6 class="weather__info">
            <div class="location">{{ location }}</div>
            <div class="weather__description">{{ description }}</div>
        </v-layout>
    </v-card>
</template>


<script>
import WeatherApi from '../services/WeatherApi'

export default {
    name: 'weather',
    data(){
        return{
            scale: 'Celcius',
            currentTemp: '',
            minTemp: '',
            maxTemp:'',
            location:'',
            description:'',
            iconURL:'',
            sunrise: '',
            sunset: '',
            pressure: '',
            humidity: '',
            wind: '',
            overcast: '',
        }
    },
    methods: {
        populate(data){
            this.currentTemp = Math.round(data.main.temp);
            this.minTemp = Math.round(data.main.temp_min);
            this.maxTemp = Math.round(data.main.temp_max);
            this.location = this.formatLocation(data.name, data.sys.country);
            this.description = data.weather[0].description;
            this.pressure = data.main.pressure;
            this.humidity = data.main.humidity + '%';
            this.wind = data.wind.speed + 'm/s';
            this.overcast = data.weather[0].description;
            this.iconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon+ ".png";
            this.sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 4);
            this.sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 4);
        },
        formatLocation(city, country) {
            if (city === null && country === null){
                return '';
            }
            return `${city}, ${country}`;
        }

    },
    computed: {
        scaleSymbol() {
            return this.scale.charAt(0);
        }
    },
    mounted(){
        const weatherData = WeatherApi.loadCoords()        
        .then(data => {
            console.log(data)
            this.populate(data);
        })
    }
}
</script>
<style scoped>

.weather__section {
    font-family: Literata, serif;
}
.weather__measure {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.temperature__value {
    font-size: 7em;
}
.temperature__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.temperature__scale {
    padding-top: 5px;
    font-size: 2em;
    font-weight: bold;
    
}
.weather__info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 15px;
}
.location {
    text-transform: uppercase;
    font-weight: bold;
}
.weather__description {
    text-transform: lowercase;
    /* margin-left: 10%;
    margin-right: 10%; */
    text-align: center;
}
.weather__description:first-letter {
    text-transform: uppercase;
}

</style>
