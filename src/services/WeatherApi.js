import axios from 'axios'
axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = "55f400f6a811d11a4403fb303dde2058";
const COORDS = 'coords';

export default {
        loadCoords() {
            const loadedCoords = localStorage.getItem(COORDS);
                if (loadedCoords === null) {
                    this.askForCoords();
                } else {
                    const parsedCoords = JSON.parse(loadedCoords);
                    this.getWeather(parsedCoords.latitude, parsedCoords.longitude)
                }
        },
        askForCoords() {
            navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError)
        },
        handleGeoSuccess(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coordsObj = {
                latitude,
                longitude
            };
            // Save coords 
            localStorage.setItem(COORDS, JSON.stringify(coordsObj));
            // get weather 
            this.getWeather(latitude, longitude)
        },
        handleGeoError() {
            console.log("Cant access geo location");
        },
        // getWeather(lat, lng) {
        //     fetch(
        //             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        //         ).then(function (response) {
        //             return response.json();
        //         })
        //         .then(function (json) {
        //             const temperature = json.main.temp;
        //             const place = json.name;
        //             weather.innerText = `${temperature} @ ${place}`;
        //         });
        // },
        getWeather(lat, lng) {
             axios.get(
                     `/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
                 )
                 .then(response => {
                     const res = response.data
                     console.log(res)
                     return res
                    //  this.currentTemp = response.data.main.temp;
                    //  this.minTemp = response.data.main.temp_min;
                    //  this.maxTemp = response.data.main.temp_max;
                    //  this.pressure = response.data.main.pressure;
                    //  this.humidity = response.data.main.humidity + '%';
                    //  this.wind = response.data.wind.speed + 'm/s';
                    //  this.overcast = response.data.weather[0].description;
                    //  this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
                    //  this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 4);
                    //  this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 4);
                 })
                 .catch(error => {
                     console.log(error);
                 })

         },
}