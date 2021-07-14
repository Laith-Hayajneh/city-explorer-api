'use strict';
const { default: axios } = require('axios');


let inMemorysave = {};

const weatherHandler =  (req, res) => {
    let weather;

    console.log(req.query);
    console.log(inMemorysave,'inMemorysaved')
    let searchQuery = req.query.searchQuery
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_BIT_KEY}`;

    if (inMemorysave[searchQuery] !== undefined) {
        console.log('We already have the data');
        res.status(200).send(inMemorysave[searchQuery]);
    } else {
         axios.get(url).then(response => {
            weather = response.data;
            // console.log(weather);
            console.log('type of weather', typeof weather);

            let weatherAr = weather.data.map((item, index) => {
                return new Forecast(item)
            })
            inMemorysave[searchQuery]=weatherAr

            res.send(inMemorysave[searchQuery])
        })
            .catch(error => {
                res.send(error)
            })

    }
}



class Forecast {
    constructor(alldata) {
        this.date = alldata.valid_date;
        this.description = alldata.weather.description;
    }
}


module.exports = weatherHandler;
