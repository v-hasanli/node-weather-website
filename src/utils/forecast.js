const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=d1169f7129da42b0481f11a7cfb10466&query=' + latitude + ',' + longitude + '&units=m'
    
    request({url, json:true}, (error, {body}) => { //... was request({url: url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else if (body.error) { //... was else if (response.body.error) { 
            callback('Unable to find location!', undefined)
        } else {
            callback (undefined, body.current.weather_descriptions[0] + '. Current temp: ' + body.current.temperature + ', feels like: ' + body.current.feelslike)
        } //... was callback (undefined, response.body.cur... + response.body.cur... + response.body.cur...
    })
}

module.exports = forecast

//... was 