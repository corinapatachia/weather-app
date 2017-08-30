const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        desribe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;


var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
axios.get(geoCodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    
    var weatherUrl = `https://api.darksky.net/forecast/119e44e5f1f8cebbfed432d67577a0fe/${lat},${lng}?units=si`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var precipitationProbability = response.data.currently.precipProbability;
    console.log(`it's currently ${temperature} but it feels like ${apparentTemperature}. Presipitation proability is ${precipitationProbability}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND'){
        console.log('unable to connect to servers'); 
    } else{
        console.log(e.message);
    }
});
