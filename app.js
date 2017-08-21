const yargs = require('yargs');
const geocode = require('./geocode/geocode');
//const fs = require('fs'); 
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(44.4640292, 26.093641, (errorMessafe, weatherResults) => {
        if(errorMessafe) {
            console.log(errorMessafe);
        } else {
//            console.log(JSON.stringify(weatherResults, undefined, 2));      
            console.log(`It's currently ${weatherResults.temperature} degrees celcius. It feels like ${weatherResults.actualTemperature}`);
        }
});
    }
    
});



//
//var fetchForecastDetails = () => {
//    try{
//        var forecastDetails = fs.readFileSync('forecast-data.json');
//        console.log('primul log ' + JSON.parse(forecastDetails));
//        return JSON.parse(forecastDetails);
//    } catch(e){
//        return [];
//    }
//};

//var forecastDetails = fetchForecastDetails();
//console.log(" 2 " + forecastDetails);
//var getWeather = (forecastDetails) => {

//};



