'use strict';
const express = require('express');
require('dotenv').config();

const cors = require('cors');

const weather = require('./data/weather.json');
// const express = require('express');

const server = express();
server.use(cors())

const PORT = process.env.PORT;

// localhost:3001/
server.get('/', (req, res) => {
    res.status(200).send('home route');

})
// localhost:3001/test
server.get('/test', (request, response) => {

    response.status(200).send("my server is working")
})




//localhost:3001/weather?cityName=selecteddCity

server.get('/weather', (req, res) => {
    console.log(req.query);
    let selectedCity = weather.find(city => {
        if (city.city_name == req.query.cityName) {
            return city
        }

    })

    res.send(selectedCity.data);
    let cityObj = selectedCity.data.map(item => {
        return new City(item.valid_date, item.description)
    })
})


class City {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
// try {

//     server.get('/weather', (req, res) => {
//         let selectedCity = weather.find(city => {
//             if (request.query.city_name === city.city_name) {
//                 return city
//             }
//         })
//         console.log(selectedCity);
//         //response
//         const cityObj = selectedCity.data.map(day => {
//             return new City(day.valid_date, day.weather.description)
//         })
//         res.status(300).send("selectedCity")
//     })
// } catch {
//     res.status(404).send("Error Not Found")
// }
// console.log(selectedCity)
// console.log(PORT)


// when target another page 
server.get('/*', (req, res) => {
    res.status(404).send('NOT FOUND');
})

server.listen(PORT, () => {
    console.log(`listening ${PORT}`)
})