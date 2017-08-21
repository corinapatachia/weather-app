const request = require('request');


var getWeather = (lat,lng,callback) => {
    request({
    url: `https://api.darksky.net/forecast/119e44e5f1f8cebbfed432d67577a0fe/${lat},${lng}?units=si`,
    json: true
}, (error, response, body) => {
    if(error) {
        callback('unable to connecto to forecast');
    }  else if(!error && response.statusCode === 200){
        callback(undefined, {
            temperature: body.currently.temperature,
            actualTemperature: body.currently.apparentTemperature
        });
    } else {
         callback('unable to get weather');
    }
});

}

module.exports.getWeather = getWeather;
