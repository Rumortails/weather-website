const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=15b573c4d27b01d14d0e1905d14e68ce&query=" + latitude + "," + longitude + "&units=f";

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip + '% chance of rain. the humidity level for the day is ' + response.body.current.humidity + ".")
        }
    })
}

module.exports = forecast