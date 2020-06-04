const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const errorHandler = require('./middleware/errorHandler');
const { Movies } = require('./models/movie-model');
const { Actors } = require('./models/actor-model');

const app = express();
app.use(jsonParser);

app.patch('/api/add-movie-actor/:movie_ID',  (req, res) => {
    let id = req.body.id;
    let movie_ID = req.params.movie_ID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if(!id){
        app.use(errorHandler(1, req, res));
    }

    if(id !== movie_ID){
        app.use(errorHandler(2, req, res));
    }

    if(!firstName || !lastName){
        app.use(errorHandler(3, req, res));
    }

    const newActor = {firstName, lastName};

    Movies.addActorToMovieList( newActor, movie_ID)
    .then( resultados => {
        if(resultados.nModified > 0){
            return res.status( 201 ).end()
        }
        else{
            app.use(errorHandler(5, req, res));
        }
    })

    // Movies.findActorInMovie( newActor )
    //         .then( results => {
    //             if(results.ok){
    //                 app.use(errorHandler(4, req, res));
    //             }
    //         })


})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});