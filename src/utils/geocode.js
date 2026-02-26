const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiaGFzYW5saTE5OTciLCJhIjoiY21sdHczZGkwMDQ4ODNncXJhOHNtcWdycSJ9.s-k7U7y2sxarpPcSy_aN1A&limit=5'
    
    request({url, json: true}, (error, {body}) => { //... was request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else if (body.features.length === 0) { //...was else if (response.body.features.length === 0)
            callback('Unable to find location! Retry.', undefined)
        } else {
            callback (undefined, {
                latitude: body.features[0].properties.coordinates.latitude, //...was latitude: response.body.fe...
                longitude: body.features[0].properties.coordinates.longitude, //...was longitude: response.body.fe...
                location: body.features[0].properties.full_address //...was location: response.body.fe...
            })
        }
    })
}

module.exports = geocode