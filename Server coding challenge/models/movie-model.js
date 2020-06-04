const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    addActorToMovieList : function( newActor, movie_ID ){
        return moviesCollection
                .updateOne({movie_ID : movie_ID}, { $push: {actors : newActor}})
                .then( results =>{
                    return results;
                })
                .catch( err => {
                    return err;
                })
    },
    getMovieById : function( movie_ID ){
        return moviesCollection
                .find({movie_ID : movie_ID})
                .then(results => {
                    return results;
                })
                .catch( err => {
                    return err;
                })
    },
    findActorInMovie : function( firstName, lastName ){
        return moviesCollection
                .find({actors: { firstName : firstName, lastName : lastName}})
                .then( results => {
                    return results;
                })
                .catch( err => {
                    return err;
                })
    }
}

module.exports = {
    Movies
};

