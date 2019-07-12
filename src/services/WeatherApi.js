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
                    const Data = this.getWeather(parsedCoords.latitude, parsedCoords.longitude)
                    // console.log(weatherData)
                    return Data
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

        async getWeather(lat, lng) {
             return axios.get(
                     `/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
                 )
                 .then(response => {
                    const res = response.data 
                    // console.log(res)
                    return res
  
                 })
                 .catch(error => {
                     console.log(error);
                 })

         },
}