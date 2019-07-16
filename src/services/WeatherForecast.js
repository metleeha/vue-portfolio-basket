/*
 * Service that fetch and parse weather forecast from openweathermap.org.
 *
 * @author Hadong Lee <hadongme@gmail.com>
 */

class WeatherForecast {
    // Create WeatherForecase instance.
    constructor() {
        this.cloudiness = 0;
        this.windSpeed = 0;
        this.humidity = 0;

        this.temperatureValue = 0;
        this.temperatureHigh = 0;
        this.temperatureLow = 0;

        this.location = ' ';
        this.description = 'Please connect to internet to fetch latest forecast :)';
        // this.weatherIcon = require('../assets/icons/weather/cloud.svg');

        this.update();
    }

    //Update forecase with fresh data from current location.
    update() {
        if (navigator.onLine) {
            navigator.geolocation.getCurrentPosition(position=>
                this.updateForecast(position));
            }
        }

    // Update forecase from given coordinates data.
    // @param {Object} position - Lat & Lon coordinates object
    
    async updateForecast(position) {
        let data = null;

        try {
            data = await this.getForecast(position.coords);
        } catch (e) {
            data = this.getErrorData();
        }

        this.populate(data);
    }

    //Fetch weather forecast from endpoint(openweathermap.org).
    //* @param {Object} coordinates - Lat & lon coordinates object.
    
    async getForecast(coordinates) {
        let appId = '55f400f6a811d11a4403fb303dde2058';
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${appId}&units=metric`;

        let response = await fetch(endpoint);

        return await response.json();
    }

    // Error data for end-users.
    getErrorData() {
        return {
            clouds: {
                all: 0
            },
            wind: {
                speed: 0
            },
            main: {
                humidity: 0,
                temp: 0,
                temp_max: 0,
                temp_min: 0,
            },
            weather: [{
                id: 0,
                description: `There's a problem at the weather forecast server ¯\\_(ツ)_/¯`
            }],
            name: null,
            sys: {
                country: null
            }
        };
    }
    
    // Set new data 
    populate(data) {
        this.cloudiness = data.clouds.all;
        this.windSpeed = data.wind.speed;
        this.humidity = data.main.humidity;
        this.temperatureValue = Math.round(data.main.temp);
        this.temperatureHigh = Math.round(data.main.temp_max);
        this.temperatureLow = Math.round(data.main.temp_min);
        this.location = this.formatLocation(data.name, data.sys.country);
        this.description = data.weather[0].description;
        // this.weatherIcon = this.getWeatherIcon(data.weather[0].id);
    }

    // Format location 
    formatLocation(city, country) {
        if (city === null && country === null) {
            return '';
        }

        return `${city}, ${country}`;
    }

}

export default WeatherForecast;