'use strict';
const express = require('express');
require('dotenv').config();
const axios = require("axios")
const cors = require('cors');

const weatherHandler = require('./modules/weather');
const moviesHandler = require('./modules/Movies');


// const { response } = require('express');

// const weather = require('./data/weather.json');
// const express = require('express');
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY

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


server.get('/movies',moviesHandler)


//localhost:3001/weather?cityName=selecteddCity
server.get('/weather', weatherHandler)

// class Forecast {
//     constructor(alldata) {
//         this.date = alldata.valid_date;
//         this.description = alldata.weather.description;
//     }
// }

// class Movies {
//     constructor(title, poster_path, original_language, vote_average, overview, vote_count, popularity, release_date) {
//         this.title = title;
//         this.poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
//         this.original_language = original_language;
//         this.vote_average = vote_average;
//         this.overview = overview;
//         this.vote_count = vote_count;
//         this.popularity = popularity;
//         this.release_date = release_date;
//     }





    // constructor(alldata) {
    //     this.title = alldata.original_title;
    //     this.overview = alldata.overview;
    //     this.average_votes = alldata.vote_average;
    //     this.popularity = alldata.popularity;
    //     this.release_date = alldata.release_date;
    //     this.image = `http://image.tmdb.org/t/p/w342` +allData.poster_path;
    // }
// }



// server.get('/weather', async (req, res) => {
//     let weather;

//     console.log(req.query);
//     let searchQuery = req.query.searchQuery
//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_BIT_KEY}`;

//     await axios.get(url).then(response => {
//         weather = response.data;
//         // console.log(weather);
//         console.log('type of weather', typeof weather);

//         let weatherAr = weather.data.map((item, index) => {
//             return new Forecast(item)
//         })

//         res.json(weatherAr)
//     })
//         .catch(error => {
//             res.send(error)
//         })
// })
//json to return the value as json file 
// https://api.themoviedb.org/3/movie/550?api_key=29d024c579cd643cbc92faa44e90ad4a

//////////////////////////
// server.get('/movies', async (req, res) => {
//     let movies;
//     console.log('movies', req.query);

//     let searchQuery = req.query.searchQuery;

//     // let urlM = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;


//     let urlM = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${searchQuery}`;
//     // let moviesData=
//     await axios.get(urlM).then(response => {
//         movies = response.data.results;
//         console.log('typof movies', typeof movies);
//         let moviesAr = movies.map(movie => { 
//             return (new Movies(movie.title, movie.poster_path, movie.original_language, movie.vote_average, movie.overview, movie.vote_count, movie.popularity, movie.release_date))
//   });
//         console.log('mmm');

//         res.json(moviesAr)
//     })
//         // .catch(error => {
//         //     res.send(error)
//         // })
// })







// server.get('/movies', async (req, res) => {
//     let weather;

//     console.log(req.query);
//     let searchQuery = req.query.searchQuery
//     let url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;

//     await axios.get(url).then(response => {
//         weather = response.data;
//         // console.log(weather);
//         console.log('type of weather', typeof weather);

//         let weatherAr = weather.data.map((item, index) => {
//             return new Forecast(item)
//         })

//         res.json(weatherAr)
//     })
//         .catch(error => {
//             res.send(error)
//         })
// })










// let selectedCity = weather.find(city => {
//     if (city.city_name == req.query.cityName) {
//         return city
//     }

// }) 

// let cityObj = selectedCity.data.map(item => {

// })
// res.send(cityObj);
// console.log(cityObj)



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