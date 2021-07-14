'use strict';
const { default: axios } = require('axios');


let inMemorySaveM = {};





const moviesHandler = async (req, res) => {
    let movies;
    console.log('movies', req.query);

    let searchQuery = req.query.searchQuery;

    // let urlM = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`;


    let urlM = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${searchQuery}`;
    // let moviesData=


    if (inMemorySaveM[searchQuery] !== undefined) {
        console.log('We already have the data');
        res.status(200).send(inMemorySaveM[searchQuery]);
    } else {


        await axios.get(urlM).then(response => {
            movies = response.data.results;
            console.log('typof movies', typeof movies);
            let moviesAr = movies.map(movie => {
                return (new Movies(movie.title, movie.poster_path, movie.original_language, movie.vote_average, movie.overview, movie.vote_count, movie.popularity, movie.release_date))
            });
            inMemorySaveM[searchQuery] = moviesAr
            console.log('using memory');

            res.send(inMemorySaveM[searchQuery])
        })
        // .catch(error => {
        //     res.send(error)
        // })
    }
}





class Movies {
    constructor(title, poster_path, original_language, vote_average, overview, vote_count, popularity, release_date) {
        this.title = title;
        this.poster_path = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        this.original_language = original_language;
        this.vote_average = vote_average;
        this.overview = overview;
        this.vote_count = vote_count;
        this.popularity = popularity;
        this.release_date = release_date;
    }

}
module.exports = moviesHandler;
